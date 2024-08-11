import { db } from "../db.js";

export const getTags = (req, res) => {
  const turmaId = req.params.turmaId;

  const getCodigo = `
      SELECT tag FROM referencias
      WHERE turma_id = ?
    `;
  db.query(getCodigo, [turmaId], (err, data) => {
    if (err) {
      console.error("Erro:", err);
      return res.status(500).json(err);
    }
    const tags = data.map((item) => item.tag);
    const uniqueTags = [...new Set(tags)];

    return res.status(200).json(uniqueTags);
  });
};
