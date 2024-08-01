import { db } from "../db.js";

const colors = [
  "#a3c2c2", // Azul Pastel
  "#b2d8b4", // Verde Menta
  "#f6b1b1", // Rosa Claro
  "#e5e0ff", // Lavanda
  "#f7c4a8", // Pêssego
  "#d0d0d0", // Cinza Claro
  "#f5f5dc", // Bege Claro
];

// Função para selecionar uma cor aleatoriamente
function getRandomColor(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// Armazenar a cor selecionada na variável BGCOLOR



// Função para gerar um código de turma aleatório
const RandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
};

export const criarTurma = (req, res) => {
    const { professorId, turmaName } = req.body;
    let turmaCode = RandomCode();
    let bgcolor = getRandomColor(colors);

    // Verificar se o código gerado é único
    const checkCode = "SELECT * FROM turmas WHERE codigo = ?";

    db.query(checkCode, [turmaCode], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) {
            // Se o código não for único, gere um novo código
            turmaCode = RandomCode();
        }

        // Inserir a nova turma com o código gerado
        const insert= "INSERT INTO turmas (nome, professor_id, codigo, bgcolor) VALUES (?, ?, ?, ?)";
        db.query(insert, [turmaName, professorId, turmaCode, bgcolor], (err, data) => {
            if (err) return res.status(500).json(err);

            const turmaId = data.insertId;
            const getTurma = "SELECT * FROM turmas WHERE id = ?";
            db.query(getTurma, [turmaId], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(result[0]);
            });
        });
    });
};
