import { db } from "../db.js";

export const checkLogin = (req, res) => {
    const { username, password, userType } = req.body;

    let query = '';
    if (userType === 'aluno') {
        query = 'SELECT * FROM alunos WHERE nome = ? AND senha = ?';
    } else if (userType === 'professor') {
        query = 'SELECT * FROM professores WHERE nome = ? AND senha = ?';
    } else {
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            // Login bem-sucedido
            res.status(200).json({ message: 'Login realizado com sucesso!' });
        } else {
            // Credenciais inválidas
            res.status(401).json({ message: 'Senha ou login invalido' });
        }
    });
};
