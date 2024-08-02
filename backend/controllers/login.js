import { db } from "../db.js";

export const checkLogin = (req, res) => {
  const { email, password } = req.body;

  const query = `
        SELECT id, nome AS name, email, senha AS password, material_formato, turno, 'aluno' AS userType
        FROM alunos
        WHERE email = ? AND senha = ?
        UNION ALL
        SELECT id, nome AS name, email, senha AS password, NULL AS material_formato, NULL AS turno, 'professor' AS userType
        FROM professores
        WHERE email = ? AND senha = ?
    `;

  db.query(query, [email, password, email, password], (err, results) => {
    if (err) {
      console.error("Erro ao consultar o banco de dados:", err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    if (results.length > 0) {
      const user = results[0]; 
      res.status(200).json({
        message: "Login realizado com sucesso!",
        user: {
          id: user.id,
          email: user.email,
          userType: results[0].userType, 
          userName: results[0].name,
          formato: results[0].material_formato,
          turno: results[0].turno,
        }, 
      });
    } else {
      res.status(401).json({ message: "Senha ou email inválido" });
    }
  });
};
