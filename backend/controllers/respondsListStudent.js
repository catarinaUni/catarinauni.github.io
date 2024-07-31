import { db } from "../db.js";

// pega a as questao da qual lista foi selecionado
export const getQuestions = (req, res) => {
  const listaId = req.params.listaId; // Obtendo o lista_id dos parâmetros da rota
  console.log("listId no back: ", listaId);
  const q = `
        SELECT p.id, p.pergunta, p.alternativa_a, p.alternativa_b, p.alternativa_c, p.alternativa_d 
        FROM perguntas as p
        JOIN lista_perguntas as lp on p.id = lp.pergunta_id
        JOIN listas as l on l.id = lp.lista_id
        WHERE lista_id = ?
    `;

  db.query(q, [listaId], (err, data) => {
    if (err) return res.status(500).json(err);

    const questions = data.map((row) => ({
      id: row.id,
      question: row.pergunta,
      alternatives: {
        a: row.alternativa_a,
        b: row.alternativa_b,
        c: row.alternativa_c,
        d: row.alternativa_d,
      },
    }));

    return res.status(200).json(questions);
  });
};

// pega as referencias da turma e retorna para o aluno
export const getReferences = (req, res) => {
  const turmaId = req.params.turmaId;

  const q = `
        SELECT id, ref, tag, formato 
        FROM referencias 
        WHERE turma_id = ?
    `;

  db.query(q, [turmaId], (err, data) => {
    if (err) return res.status(500).json(err);

    const references = data.map((row) => ({
      id: row.id,
      ref: row.ref,
      tag: row.tag,
      formato: row.formato,
    }));

    console.log(res);

    return res.status(200).json(references);
  });
};


// salva as respostas do aluno
export const saveAnswers = (req, res) => {
  const { alunoId, listaId, respostas } = req.body;

  console.log("Recebendo respostas:", req.body);

  const query =
    "INSERT INTO respostas (pergunta_id, resposta, aluno_id, lista_id) VALUES ?";

  const values = respostas.map((resposta) => [
    resposta.perguntaId,
    resposta.respostaAluno,
    alunoId,
    listaId,
  ]);

  console.log("Valores para inserção:", values);

  db.query(query, [values], (err, data) => {
    if (err) {
      console.error("Erro ao salvar respostas:", err);
      return res.status(500).json(err);
    }

    return res.status(200).json("Respostas salvas com sucesso.");
  });
};

// verifica as resposta do aluno, e  retorna seu score
export const checkAnswers = (req, res) => {
  const { listaId } = req.params;
  const { alunoId } = req.params;
  var score = 0;

  const query = `
        SELECT r.pergunta_id, r.resposta, p.tag_1, p.tag_2, p.tag_3, p.resposta_correta AS resposta_correta
        FROM respostas r
        JOIN perguntas p ON r.pergunta_id = p.id
        WHERE r.lista_id = ? AND r.aluno_id = ?;
    `;

  db.query(query, [listaId, alunoId], (err, data) => {
    if (err) return res.json(err);

    const resultados = data.map((item) => ({
      perguntaId: item.pergunta_id,
      respostaAluno: item.resposta,
      respostaCorreta: item.resposta_correta,
      correta: item.resposta === item.resposta_correta,
      tag1: item.tag_1,
      tag2: item.tag_2,
      tag3: item.tag_3,
    }));

    const totalTagCounts = {};
    const wrongTagCounts = {};
    const correctTagCounts = {};

    // Calcular o total de questões por tag
    resultados.forEach((item) => {
      const tags = [item.tag1, item.tag2, item.tag3].filter(Boolean);
      tags.forEach((tag) => {
        totalTagCounts[tag] = (totalTagCounts[tag] || 0) + 1;
      });
    });

    // Calcular o total de questões erradas e corretas por tag
    resultados.forEach((item) => {
      const tags = [item.tag1, item.tag2, item.tag3].filter(Boolean);
      tags.forEach((tag) => {
        if (!item.correta) {
          wrongTagCounts[tag] = (wrongTagCounts[tag] || 0) + 1;
        } else {
          correctTagCounts[tag] = (correctTagCounts[tag] || 0) + 1;
          score++
        }
      });
    });

    // Calcular a taxa de erro ponderada por tag
    const tagErrorRates = Object.keys(wrongTagCounts).reduce((acc, tag) => {
      acc[tag] = wrongTagCounts[tag] / totalTagCounts[tag];
      return acc;
    }, {});

    // Ordenar as tags pela taxa de erro ponderada e pegar as top 4
    const sortedWrongTags = Object.entries(tagErrorRates)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map((entry) => entry[0]);

    // Ordenar as tags pelo número de acertos e pegar as top 4
    const sortedCorrectTags = Object.entries(correctTagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map((entry) => entry[0]);

    console.log("Tags erradas:", sortedWrongTags);
    console.log("Tags corretas:", sortedCorrectTags);

    return res.status(200).json({
      resultados,
      topWrongTags: sortedWrongTags,
      topCorrectTags: sortedCorrectTags,
      score: score,
    });
  });
};

//  função para armazenar os resultados no resultado_listas
export const saveResultTags = (req, res) => {
  const { alunoId, listaId, tags, tagsCons, turno, score, formato } = req.body;

  const insertQuery = `
    INSERT INTO resultado_listas (aluno_id, lista_id, tags, tagCons, turno, score, formato)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Converter arrays para strings separadas por vírgulas
  const tagsString = tags.join(",");
  const tagsConsString = tagsCons.join(",");

  db.query(
    insertQuery,
    [alunoId, listaId, tagsString, tagsConsString, turno, score, formato],
    (err, data) => {
      if (err) {
        console.error("Erro ao inserir no resultado_listas:", err);
        return res
          .status(500)
          .json({ message: "Erro ao salvar resultados", error: err });
      }

      return res.status(200).json("Resultados salvos com sucesso.");
    }
  );
};


export const checkIfExists = (req, res) => {
  const listaId = req.query.listaId;
  console.log("IDDDDDDD", listaId);

  const query = "SELECT * FROM resultado_listas WHERE lista_id = ?;";
  const queryCount =
    "SELECT COUNT(*) AS total_perguntas FROM lista_perguntas WHERE lista_id = ?;";

  // Executa a primeira consulta
  db.query(query, [listaId], (err, results) => {
    if (err) {
      console.error("Erro ao verificar existência:", err);
      return res.status(500).json(err);
    }

    // Executa a segunda consulta para contar o número de perguntas
    db.query(queryCount, [listaId], (errCount, countResults) => {
      if (errCount) {
        console.error("Erro ao contar perguntas:", errCount);
        return res.status(500).json(errCount);
      }

      // Retorna os resultados combinados
      return res.status(200).json({
        results,
        total_perguntas: countResults[0].total_perguntas,
      });
    });
  });
};

// verifica se o aluno = (respondeu a lista) ? exibi a lista : exibe a tela de resultado;
export const checkIfExistsAluno = (req, res) => {
  const listaId = req.query.listaId;
  const alunoId = req.query.alunoId;

  const query = "SELECT * FROM resultado_listas WHERE lista_id = ? AND aluno_id = ?;";

  db.query(query, [listaId, alunoId], (err, results) => {
    if (err) {
      console.error("Erro ao verificar existência:", err);
      return res.status(500).json(err);
    }

    return res.status(200).json(results);
  });
};
