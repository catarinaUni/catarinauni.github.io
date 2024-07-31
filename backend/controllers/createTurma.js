import { db } from "../db.js";

// Função para gerar um código de turma aleatório
const RandomCode = () => {
    return Math.floor(100000 + Math.random() * 900000); // Gera um número de 6 dígitos
};

export const criarTurma = (req, res) => {
    const { professorId, turmaName } = req.body;
    let turmaCode = RandomCode();

    // Verificar se o código gerado é único
    const checkCode = "SELECT * FROM turmas WHERE codigo = ?";

    db.query(checkCode, [turmaCode], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length > 0) {
            // Se o código não for único, gere um novo código
            turmaCode = RandomCode();
        }

        // Inserir a nova turma com o código gerado
        const insert= "INSERT INTO turmas (nome, professor_id, codigo) VALUES (?, ?, ?)";
        db.query(insert, [turmaName, professorId, turmaCode], (err, data) => {
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
