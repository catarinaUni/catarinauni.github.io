import express from "express";
import { getUsers, addQuestion } from "../controllers/user.js";
import { getQuestions, saveAnswers } from '../controllers/questao.js';

const router = express.Router();

router.get("/", getUsers);
router.post("/professor/turma/novalista", addQuestion);

//rota para obter todas as perguntas
router.get("/aluno/turma/lista", getQuestions);
// Rota para verificar as respostas do aluno
router.post("/aluno/turma/resultado", saveAnswers);

export default router;