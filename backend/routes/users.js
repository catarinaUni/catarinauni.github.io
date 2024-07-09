import express from "express";
import { getUsers, addQuestion } from "../controllers/user.js";
import { checkAnswers, getQuestions, saveAnswers } from '../controllers/questao.js';
import { inserirAluno, inserirProfessor } from '../controllers/cadastro.js';
import { checkLogin } from "../controllers/login.js";
import { participarTurma } from "../controllers/participarTurma.js";
import { criarTurma } from "../controllers/Turma.js";
import { db } from "../db.js";


const router = express.Router();

router.get("/", getUsers);
router.post("/professor/turma/novalista", addQuestion);

//rota para obter todas as perguntas
router.get("/aluno/turma/lista", getQuestions);
// Rota para verificar as respostas do aluno
router.post("/aluno/turma/resultado", saveAnswers);
router.get("/aluno/turma/lista/resultado", checkAnswers);

//rota para verificação de login
router.post("/login", checkLogin);

//rota para cadastro seja aluno, ou professor
router.post('/cadastro', async (req, res) => {
    console.log("vindo da rota:", req.body);
    const { username, password, email, userType } = req.body;
  
    try {
      if (userType === 'aluno') {
        // Insere no banco de dados de alunos
        await inserirAluno({ username, password, email });
      } else if (userType === 'professor') {
        // Insere no banco de dados de professores
        await inserirProfessor({ username, password, email });
      }
  
      res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao realizar cadastro' });
    }
  });

  // aqui é quando o aluno vai entrar em uma turma
  router.post('/participar-turma', participarTurma);

  router.get('/turmas/:userId/:userType', (req, res) => {
    const userId = req.params.userId;
    const userType = req.params.userType;

    let query;
    if (userType === 'aluno') {
        query = 'SELECT t.* FROM turmas t INNER JOIN turma_alunos ta ON t.id = ta.turma_id WHERE ta.aluno_id = ?';
    } else if (userType === 'professor') {
        query = 'SELECT * FROM turmas WHERE professor_id = ?';
    } else {
        return res.status(400).json({ message: 'Tipo de usuário inválido' });
    }

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Erro ao consultar turmas:', err);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }

        res.status(200).json({ turmas: results });
    });
});

// Rota para obter listas de uma turma
router.get('/turma/:turmaId/listas', (req, res) => {
  const turmaId = req.params.turmaId;
  
  const query = 'SELECT * FROM lista as  l join turma_listas as tl on l.id = tl.lista_id WHERE turma_id = ?';
   
  db.query(query, [turmaId], (err, results) => {
      if (err) {
          console.error('Erro ao consultar listas da turma:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      res.status(200).json({ listas: results });
  });
});

// para o professor criar turma
router.post('/criar-turma', criarTurma);

export default router;