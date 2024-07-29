import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo } from "./Resultado.style";
import axios from "axios";

function ResultadosProf({ lista, aluno, respostas }) {
  const listaId = lista.id;

  const [dadosJson, setDadosJson] = useState(null);
  const [error, setError] = useState(null);
  const [grupos, setGrupos] = useState(null)
  
  useEffect(() => {
    axios
      .get(`http://localhost:8800/aluno/turma/resultado/verificar`, {
        params: { listaId },
      })
      .then((response) => {
        console.log("Resposta recebida JSON:", response.data);
        setDadosJson([
          {
            id: 1,
            aluno_id: 101,
            lista_id: 5,
            tags: "matematica,programacao",
            tagCons: "matematica",
            turno: "manha",
          },
          {
            id: 2,
            aluno_id: 102,
            lista_id: 5,
            tags: "programacao,algoritmos",
            tagCons: "algoritmos",
            turno: "tarde",
          },
          {
            id: 3,
            aluno_id: 103,
            lista_id: 5,
            tags: "matematica,estatistica",
            tagCons: "estatistica",
            turno: "manha",
          },
          {
            id: 4,
            aluno_id: 104,
            lista_id: 5,
            tags: "programacao,matematica",
            tagCons: "matematica,programacao",
            turno: "noite",
          },
          {
            id: 5,
            aluno_id: 105,
            lista_id: 5,
            tags: "algoritmos,estatistica",
            tagCons: "algoritmos",
            turno: "tarde",
          },
        ]); // Armazena o objeto, não a string JSON
        setError(null); // Limpa erro, se houver
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setDadosJson(null); // Limpa dados, se houver erro
        setError("Erro ao buscar dados.");
      });
  }, [listaId]);

  // Send data to the Flask API when dadosJson changes
  const gerarGrupos = () => {
    if (dadosJson) {
      axios
        .post("http://127.0.0.1:5000/ga_python", dadosJson)
        .then((response) => {
          console.log("Resposta da API AG:", response.data);
          setGrupos(response.data);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

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
                <button onClick={gerarGrupos}>Gerar Grupos</button>
              </div>
            </ResultContent>
          </Result>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default ResultadosProf;
