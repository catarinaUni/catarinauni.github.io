import express from "express";
import { getUsers, addQuestion } from "../controllers/user.js";
import { checkAnswers, getQuestions, saveAnswers,  saveResultTags, getReferences, checkIfExists, checkIfExistsAluno } from '../controllers/questao.js';
import { inserirAluno, inserirProfessor } from '../controllers/cadastro.js';
import { checkLogin } from "../controllers/login.js";
import { participarTurma } from "../controllers/participarTurma.js";
import { criarTurma } from "../controllers/Turma.js";
import { db } from "../db.js";
import { salvarChamada, salvarGrupos } from "../controllers/grupos.js";


const router = express.Router();

router.get("/", getUsers);
router.post("/professor/turma/novalista", addQuestion);
router.post("/professor/salvarGrupos", salvarGrupos);
router.post("/professor/salvarGrupos/api", salvarChamada)

//rota para obter todas as perguntas
router.get("/aluno/turma/lista/:listaId", getQuestions);
router.get("/aluno/turma/listaRef/:listaId", getReferences);
// Rota para verificar as respostas do aluno
router.post("/aluno/turma/resultado", saveAnswers);
router.get("/aluno/turma/resultado/verificar", checkIfExists);
router.get("/aluno/turma/resultado/verificarAluno", checkIfExistsAluno);
router.get("/aluno/turma/:alunoId/lista/:listaId/resultado", checkAnswers);
router.post('/aluno/turma/:alunoId/lista/:listaId/salvarTags', saveResultTags);


//rota para verificação de login
router.post("/login", checkLogin);

//rota para cadastro seja aluno, ou professor
router.post('/cadastro', async (req, res) => {
    console.log("vindo da rota:", req.body);
    const { username, password, email, userType, userFormatPref, userTurno } = req.body;
  
    try {
      if (userType === 'aluno') {
        // Insere no banco de dados de alunos
        await inserirAluno({ username, password, email, userFormatPref, userTurno});
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

  // aqui é pra mostrar as turma na sidebar em professor/aluno
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
  console.log("cteste: ", turmaId);
  const query = 'SELECT * FROM listas as  l join turma_listas as tl on l.id = tl.lista_id WHERE turma_id = ?';
   
  db.query(query, [turmaId], (err, results) => {
      if (err) {
          console.error('Erro ao consultar listaaas da turma:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      res.status(200).json({ listas: results });
  });
});

// Rota para buscar os alunos da turma
router.get('/turma/:turmaId/ListarAlunos', (req, res) => {
  const turmaId = req.params.turmaId;
  console.log("Recebido ID da turma:", turmaId);
  
  if (!turmaId) {
    console.error('ID da turma não fornecido');
    return res.status(400).json({ message: 'ID da turma é obrigatório' });
  }
  
  const query = `
      SELECT a.* FROM alunos a
      INNER JOIN turma_alunos ta ON a.id = ta.aluno_id
      WHERE ta.turma_id = ?
  `;
  
  db.query(query, [turmaId], (err, results) => {
      if (err) {
          console.error('Erro ao consultar alunos da turma:', err);
          return res.status(500).json({ message: 'Erro interno do servidor' });
      }

      console.log('Alunos encontrados:', results);
      res.status(200).json({ alunos: results });
  });
});

// para o professor criar turma
router.post('/turmas/criar-turma', criarTurma);



export default router;