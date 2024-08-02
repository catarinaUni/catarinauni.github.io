import { db } from "../db.js";


export const addQuestion = (req, res) => {
  const { newList, questions, turmaId } = req.body;

  if (!Array.isArray(questions)) {
    return res
      .status(400)
      .json({ error: "Os dados devem ser uma série de perguntas" });
  }

  if (!turmaId) {
    return res.status(400).json({ error: "Turma id não esta definido" });
  }
  const listName = newList.nome;
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
      question.tags[2],
    ]);

    db.query(insertQuestionsQuery, [questionValues], (err, result) => {
      if (err) {
        return res.json(err);
      }

      // Obter os ids das perguntas inseridas
      const insertedQuestionIds = [];
      for (
        let i = result.insertId;
        i < result.insertId + result.affectedRows;
        i++
      ) {
        insertedQuestionIds.push(i);
      }

      // Inserir as associações na tabela lista_perguntas
      const insertAssociationsQuery =
        "INSERT INTO lista_perguntas (lista_id, pergunta_id) VALUES ?";
      const associationValues = insertedQuestionIds.map((questionId) => [
        listId,
        questionId,
      ]);

      db.query(insertAssociationsQuery, [associationValues], (err, result) => {
        if (err) {
          return res.json(err);
        }

        // Associar a lista com a turma na tabela turma_listas
        const insertTurmaListaQuery =
          "INSERT INTO turma_listas (turma_id, lista_id) VALUES (?, ?)";
        db.query(insertTurmaListaQuery, [turmaId, listId], (err, result) => {
          if (err) {
            return res.json(err);
          }
        });
      });
    });
  });
};

export const saveRef = (req, res) => {
  const { turmaId, ref, tag, formato } = req.body;

  // Verifique se turmaId está presente
  if (!turmaId || !ref || !tag || !formato) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  const insertQuery = `
    INSERT INTO referencias (turma_id, ref, tag, formato)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [turmaId, ref, tag, formato], (err, data) => {
    if (err) {
      console.error("Erro ao inserir no banco de dados:", err);
      return res
        .status(500)
        .json({ message: "Erro ao salvar referência", error: err });
    }

    return res
      .status(200)
      .json({ message: "Referência salva com sucesso.", data: data });
  });
};
