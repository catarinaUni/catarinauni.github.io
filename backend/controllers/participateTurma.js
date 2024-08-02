import { db } from "../db.js";

export const participarTurma = (req, res) => {
    const { userId, turmaCode } = req.body;

    if (!userId || !turmaCode) {
        return res.status(400).json({ message: 'Parâmetros ausentes: userId e turmaCode são necessários' });
    }

    const query = 'SELECT * FROM turmas WHERE codigo = ?';
    db.query(query, [turmaCode], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            const turma = results[0];
            const insertQuery = 'INSERT INTO turma_alunos (turma_id, aluno_id) VALUES (?, ?)';
            db.query(insertQuery, [turma.id, userId], (err, insertResults) => {
                if (err) {
                    console.error('Erro ao adicionar aluno à turma:', err);
                    return res.status(500).json({ message: 'Erro interno do servidor' });
                }

                // Após a inserção bem-sucedida, consultar a lista atualizada de turmas do aluno
                const updatedQuery = 'SELECT t.* FROM turmas t INNER JOIN turma_alunos ta ON t.id = ta.turma_id WHERE ta.aluno_id = ?';
                db.query(updatedQuery, [userId], (err, updatedResults) => {
                    if (err) {
                        console.error('Erro ao consultar turmas atualizadas:', err);
                        return res.status(500).json({ message: 'Erro interno do servidor' });
                    }

                    res.status(200).json({ message: 'Aluno adicionado à turma com sucesso!', turmas: updatedResults });
                });
            });
        } else {
            res.status(400).json({ message: 'Código da turma inválido' });
        }
    });
};

