import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo } from "./Resultado.style";
import axios from "axios";

function ResultadosProf({ lista, aluno, respostas }) {
  const listaId = lista.id;

  const [dadosJson, setDadosJson] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios
      .get(`http://localhost:8800/aluno/turma/resultado/verificar`, {
        params: { listaId },
      })
      .then((response) => {
        console.log("Resposta recebida JSON:", response.data);
        setDadosJson(response.data); // Armazena o objeto, não a string JSON
        setError(null); // Limpa erro, se houver
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setDadosJson(null); // Limpa dados, se houver erro
        setError("Erro ao buscar dados.");
      });
  }, [listaId]);

  // Send data to the Flask API when dadosJson changes
  useEffect(() => {
    if (dadosJson) {
      axios
        .post("http://127.0.0.1:5000/ga_python", dadosJson)
        .then((response) => {
          console.log("Resposta da API AG:", response.data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  }, [dadosJson]);

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
