import { db } from "../db.js";

export const salvarGrupos = (req, res) => {
    const { alunoId, turmaId, listaId, grupoId } = req.body;

    const insertQuery = `
    INSERT INTO grupos_AG (aluno_id, turma_id, lista_id, grupo_id)
    VALUES (?, ?, ?, ?)
  `;

    db.query(
      insertQuery,
      [alunoId,turmaId ,listaId, grupoId],
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
}