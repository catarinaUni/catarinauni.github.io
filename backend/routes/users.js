import express from "express";
import { getUsers, addQuestion } from "../controllers/user.js";
import { checkAnswers, getQuestions, saveAnswers } from '../controllers/questao.js';
import { inserirAluno, inserirProfessor } from '../controllers/cadastro.js';
import { checkLogin } from "../controllers/login.js";


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

export default router;