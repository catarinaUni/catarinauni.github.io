import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent } from "./Resultado.style";
import axios from "axios";

function ResultadosProf({ lista, aluno, respostas }) {
    return (
      <Main>
        <MainContent>
          <MainItems>
            <ListaNome>{lista.nome}</ListaNome>
            <p className="subtitulo">Veja aqui os resultados</p>
            <Result>
              <ResultContent>
                <p>Média de acertos: </p>
                <div></div>
              </ResultContent>
              <ResultContent>
                <p>Média de acertos: </p>
                <div></div>
              </ResultContent>
              <ResultContent>
                <p>Média de acertos: </p>
                <div></div>
              </ResultContent>
            </Result>
          </MainItems>
        </MainContent>
      </Main>
    );
}

export default ResultadosProf;
