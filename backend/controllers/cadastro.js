import { db } from "../db.js";

// Função para inserir um aluno no banco de dados
export async function inserirAluno(dados) {
  try {
   
    console.log("recebendo:", dados.username, dados.password, dados.email, dados.userFormatPref, dados.userTurno);
    const result = await db.query('INSERT INTO alunos (nome, senha, email, material_formato, turno) VALUES (?, ?, ?, ?, ?)', [dados.username, dados.password, dados.email, dados.userFormatPref, dados.userTurno]);
    return result;
  } catch (error) {
    throw error;
  }
}

// Função para inserir um professor no banco de dados
export async function inserirProfessor(dados) {
  try {
    
    const result = await db.query('INSERT INTO professores (nome, senha, email) VALUES (?, ?, ?)', [dados.username, dados.password, dados.email]);
    return result;
  } catch (error) {
    throw error;
  }
}
