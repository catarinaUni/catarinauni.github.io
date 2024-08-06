import { db } from "../db.js";

const colors = [
  "#3C91E6", //azul
  "#C33C54", //vinho
  "#4A7856", //verde escuro
  "#553D3", //marrom
  "#231651", //roxo escuro
  "#EB8258", //laranja
  "#9067C6", //roxo
  "#CE2D4F", //rosa-vermelho
];

function getRandomColor(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const RandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const criarTurma = (req, res) => {
  const { professorId, turmaName } = req.body;
  let turmaCode = RandomCode();
  let bgcolor = getRandomColor(colors);

  const checkCode = "SELECT * FROM turmas WHERE codigo = ?";

  db.query(checkCode, [turmaCode], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length > 0) {
      turmaCode = RandomCode();
    }
    const insert =
      "INSERT INTO turmas (nome, professor_id, codigo, bgcolor) VALUES (?, ?, ?, ?)";
    db.query(
      insert,
      [turmaName, professorId, turmaCode, bgcolor],
      (err, data) => {
        if (err) return res.status(500).json(err);

        const turmaId = data.insertId;
        const getTurma = "SELECT * FROM turmas WHERE id = ?";
        db.query(getTurma, [turmaId], (err, result) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(result[0]);
        });
      }
    );
  });
};
