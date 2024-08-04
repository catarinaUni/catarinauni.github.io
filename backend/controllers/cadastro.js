import { db } from "../db.js";

const colors = [
  "#a3c2c2", 
  "#b2d8b4", 
  "#f6b1b1", 
  "#e5e0ff",
  "#f7c4a8",
  "#d0d0d0", 
  "#f5f5dc", 
];

function getRandomColor(colors) {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export async function inserirAluno(dados) {
  var bgcolor = getRandomColor(colors);
  try {
    const result = await db.query(
      "INSERT INTO alunos (nome, senha, email, material_formato, turno, bgcolor) VALUES (?, ?, ?, ?, ?, ?)",
      [
        dados.username,
        dados.password,
        dados.email,
        dados.userFormatPref,
        dados.userTurno,
        bgcolor,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

export async function inserirProfessor(dados) {
  try {
    const result = await db.query(
      "INSERT INTO professores (nome, senha, email) VALUES (?, ?, ?)",
      [dados.username, dados.password, dados.email]
    );
    return result;
  } catch (error) {
    throw error;
  }
}
