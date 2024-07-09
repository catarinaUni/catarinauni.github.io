import { db } from "../db.js";

// Função para gerar um código de turma aleatório
const generateRandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
};

export const criarTurma = (req, res) => {
    const { professorId, turmaName } = req.body;
    let turmaCode = generateRandomCode();

    // Verificar se o código gerado é único
    const checkCodeQuery = "SELECT * FROM turmas WHERE codigo = ?";

    db.query(checkCodeQuery, [turmaCode], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) {
            // Se o código não for único, gere um novo código
            turmaCode = generateRandomCode();
        }

        // Inserir a nova turma com o código gerado
        const insertQuery = "INSERT INTO turmas (nome, professor_id, codigo) VALUES (?, ?, ?)";
        db.query(insertQuery, [turmaName, professorId, turmaCode], (err, data) => {
            if (err) return res.status(500).json(err);

            const turmaId = data.insertId;
            const getTurmaQuery = "SELECT * FROM turmas WHERE id = ?";
            db.query(getTurmaQuery, [turmaId], (err, result) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(result[0]);
            });
        });
    });
};
