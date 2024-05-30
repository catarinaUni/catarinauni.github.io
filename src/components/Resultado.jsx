import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score } from './Resultado.style';


const resultados = 
    {
        "score": "8/10",
        "assuntos": [
          "Matematica basica",
          "Algoritmos",
          "Estruturas de Dados",
          "Programação Orientada a Objetos"
        ]
      }
      


function Resultado(props) {
  const { score, assuntos } = resultados;

  return (
    <>
      <Main>
        <SideBar />
        <MainContent>
          <Header>
            <Title>Inteligência Artificial</Title>
            <p>Código: 1234567</p>
          </Header>
          <MainItems>
            <ListaNome>Algoritmos e Programação 1</ListaNome>
            <Score>{score}</Score>
            <div>
              {assuntos.map((assunto, index) => (
                <div key={index}>{assunto}</div>
              ))}
            </div>
          </MainItems>
        </MainContent>
      </Main>
    </>
  );
}

export default Resultado;
