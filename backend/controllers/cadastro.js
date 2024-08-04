import { db } from "../db.js";

const colors = [
  "#a3c2c2", // Azul Pastel
  "#b2d8b4", // Verde Menta
  "#f6b1b1", // Rosa Claro
  "#e5e0ff", // Lavanda
  "#f7c4a8", // Pêssego
  "#d0d0d0", // Cinza Claro
  "#f5f5dc", // Bege Claro
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
