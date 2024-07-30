import { db } from "../db.js";

export const salvarGrupos = (req, res) => {
  const { alunoId, turmaId, listaId, grupoId } = req.body;

  const insertQuery = `
    INSERT INTO grupos_AG (aluno_id, turma_id, lista_id, grupo_id)
    VALUES (?, ?, ?, ?)
  `;

  db.query(insertQuery, [alunoId, turmaId, listaId, grupoId], (err, data) => {
    if (err) {
      console.error("Erro ao inserir no resultado_listas:", err);
      return res
        .status(500)
        .json({ message: "Erro ao salvar resultados", error: err });
    }

    return res.status(200).json("Resultados salvos com sucesso.");
  });
};


export const getGrupos = (req, res) => {
  const { turmaId, listaId } = req.query;
  const query = `
    SELECT *
    FROM grupos_AG
    WHERE turma_id = ? AND lista_id = ?;
  `;

  db.query(query, [turmaId, listaId], (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res
        .status(500)
        .json({ message: "Erro ao consultar a base de dados.", error: err });
    }

    return res.status(200).json(results);
  });
};



export const salvarChamada = (req, res) => {
  const { acao_chamada, turmaId, listaId } = req.body;
  console.log("AAAAAAAAAA", acao_chamada);

  const insertQuery = `
    INSERT INTO chamada_API (acao_chamada, turma_id, lista_id)
    VALUES (?, ?, ?)
  `;

  db.query(insertQuery, [acao_chamada, turmaId, listaId], (err, data) => {
    if (err) {
      console.error("Erro ao inserir no resultado_listas:", err);
      return res
        .status(500)
        .json({ message: "Erro ao salvar resultados", error: err });
    }

    return res.status(200).json("Chamada salvos com sucesso.");
  });
};

export const getChamada = (req, res) => {
  const { turmaId, listaId } = req.query;
  
  const query = `
    SELECT c.acao_chamada
    FROM chamada_API c
    WHERE c.turma_id = ? AND c.lista_id = ?;
  `;

  db.query(query, [turmaId, listaId], (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res
        .status(500)
        .json({ message: "Erro ao consultar a base de dados.", error: err });
    }

    if (results.length > 0) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  });
};
