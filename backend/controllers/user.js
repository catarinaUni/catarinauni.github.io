import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM perguntas";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addQuestion = (req, res) => {
    const { questions, turmaId } = req.body;

    if (!Array.isArray(questions)) {
        return res.status(400).json({ error: "Data should be an array of questions" });
    }

    if (!turmaId) {
        return res.status(400).json({ error: "Turma ID is required" });
    }

    // Nome fixo para todas as listas
    const listName = "Lista";

    // Inserir a nova lista na tabela listas
    const insertListQuery = "INSERT INTO listas (nome) VALUES (?)";

    db.query(insertListQuery, [listName], (err, result) => {
        if (err) {
            return res.json(err);
        }

        // Obter o id da nova lista inserida
        const listId = result.insertId;

        // Inserir as perguntas na tabela perguntas
        const insertQuestionsQuery = `
            INSERT INTO perguntas 
            (pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d, resposta_correta, tag_1, tag_2, tag_3) 
            VALUES ?
        `;

        const questionValues = questions.map((question) => [
            question.pergunta,
            question.alternativa.a,
            question.alternativa.b,
            question.alternativa.c,
            question.alternativa.d,
            question.resposta,
            question.tags[0],
            question.tags[1],
            question.tags[2]
        ]);

        db.query(insertQuestionsQuery, [questionValues], (err, result) => {
            if (err) {
                return res.json(err);
            }

            // Obter os ids das perguntas inseridas
            const insertedQuestionIds = [];
            for (let i = result.insertId; i < result.insertId + result.affectedRows; i++) {
                insertedQuestionIds.push(i);
            }

            // Inserir as associações na tabela lista_perguntas
            const insertAssociationsQuery = "INSERT INTO lista_perguntas (lista_id, pergunta_id) VALUES ?";
            const associationValues = insertedQuestionIds.map((questionId) => [listId, questionId]);

            db.query(insertAssociationsQuery, [associationValues], (err, result) => {
                if (err) {
                    return res.json(err);
                }

                // Associar a lista com a turma na tabela turma_listas
                const insertTurmaListaQuery = "INSERT INTO turma_listas (turma_id, lista_id) VALUES (?, ?)";
                db.query(insertTurmaListaQuery, [turmaId, listId], (err, result) => {
                    if (err) {
                        return res.json(err);
                    }

                    return res.status(200).json("Lista e perguntas adicionadas e associadas à turma com sucesso.");
                });
            });
        });
    });
};

