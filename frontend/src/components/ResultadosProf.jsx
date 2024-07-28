import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo } from "./Resultado.style";
import axios from "axios";

function ResultadosProf({ lista, aluno, respostas }) {

  const listaId = lista.id


  useEffect(() => {
    axios
      .get(`http://localhost:8800/aluno/turma/resultado/verificar`, {
        params: {
          listaId: listaId,
        },
      })
      .then((response) => {
        console.log("Resposta recebida:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [listaId]);



  return (
    <Main>
      <MainContent>
        <MainItems>
          <ListaNome>{lista.nome}</ListaNome>
          <Subtitulo>
            <p className="subtitulo">Veja aqui os resultados</p>
          </Subtitulo>

          <Result>
            <ResultContent>
              <p>Média de acertos: </p>
              <div>
                <p>9/10</p>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Média de acertos: </p>
              <div>
                <p>matematica discreta</p>
                <p>matematica discreta</p>
                <p>matematica discreta</p>
                <p>matematica discreta</p>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Média de acertos: </p>
              <div>
                <p>9/10</p>
                <p>criar grupos</p>
              </div>
            </ResultContent>
          </Result>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default ResultadosProf;
