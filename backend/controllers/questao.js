import { db } from "../db.js";

export const getQuestions = (req, res) => {
    const q = "SELECT id, pergunta, alternativa_a, alternativa_b, alternativa_c, alternativa_d FROM perguntas";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        const questions = data.map(row => ({
            id: row.id,
            question: row.pergunta,
            alternatives: {
                a: row.alternativa_a,
                b: row.alternativa_b,
                c: row.alternativa_c,
                d: row.alternativa_d
            }
        }));

        return res.status(200).json(questions);
    });
};

export const saveAnswers = (req, res) => {
    const { alunoId, respostas } = req.body;

    console.log("Recebendo respostas:", req.body);

    const query = "INSERT INTO respostas (pergunta_id, resposta) VALUES ?";

    const values = respostas.map(resposta => [resposta.perguntaId, resposta.respostaAluno]);

    console.log("Valores para inserção:", values);

    db.query(query, [values], (err, data) => {
        if (err) {
            console.error("Erro ao salvar respostas:", err);
            return res.status(500).json(err);
        }

        return res.status(200).json("Respostas salvas com sucesso.");
    });
};


/*
export const checkAnswers = (req, res) => {
    const { alunoId } = req.body;

    const query = `
        SELECT r.pergunta_id, r.resposta_aluno, p.resposta AS resposta_correta
        FROM respostas r
        JOIN perguntas p ON r.pergunta_id = p.id
        WHERE r.aluno_id = ?
    `;

    db.query(query, [alunoId], (err, data) => {
        if (err) return res.json(err);

        const resultados = data.map(item => ({
            perguntaId: item.pergunta_id,
            respostaAluno: item.resposta_aluno,
            respostaCorreta: item.resposta_correta,
            correta: item.resposta_aluno === item.resposta_correta
        }));

        return res.status(200).json(resultados);
    });
    
};*/