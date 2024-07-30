import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo } from "./Resultado.style";
import axios from "axios";

function ResultadosProf({ lista, aluno, respostas }) {
  const listaId = lista.id;
  const turmaId = lista.turma_id

  const [dadosJson, setDadosJson] = useState(null);
  const [error, setError] = useState(null);
  const [grupos, setGrupos] = useState(null)
  const [chamada, setChamada] = useState(false)

  const [scoreGeral, setScoreGeral] = useState(0);
  const [qntPer, setQntPer] = useState(0);
  const [qntAluno, setQntAluno] = useState(0)
  const [topTags, setTopTags] = useState([])


  useEffect(() => {
    console.log(turmaId, listaId);
    axios
      .get(`http://localhost:8800/grupos/chamada`, {
        params: {
          turmaId,
          listaId,
        },
      })
      .then((response) => {
        console.log("CHAMADA: ", response.data.exists);
        setChamada(response.data.exists);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    console.log(turmaId, listaId);
    axios
      .get(`http://localhost:8800/grupos/chamada`, {
        params: {
          turmaId,
          listaId,
        },
      })
      .then((response) => {
        console.log("CHAMADA: ", response.data.exists);
        setChamada(response.data.exists);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [turmaId, listaId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8800/aluno/turma/resultado/verificar`, {
        params: { listaId },
      })
      .then((response) => {
        console.log("Resposta recebida JSON:", response);

        const results = response.data.results;
        let totalScore = 0;
        let totalAlunos = 0;
        const tagFrequency = {};
        setQntPer(response.data.total_perguntas)

        results.forEach((data) => {
          totalScore += data["score"];
          totalAlunos += 1;

          const tags = data["tags"] ? data["tags"].split(",") : [];
          tags.forEach((tag) => {
            const trimmedTag = tag.trim();
            if (trimmedTag) {
              tagFrequency[trimmedTag] = (tagFrequency[trimmedTag] || 0) + 1;
            }
          });

        });

        // Calcular a média do score
        setQntAluno(totalAlunos)
        setScoreGeral(totalScore / totalAlunos);

        // Ordenar as tags pela frequência e pegar as 5 mais frequentes
        const sortedTags = Object.entries(tagFrequency)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

        setTopTags(sortedTags.map(([tag, frequency]) => ({ tag, frequency })));

        setError(null);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setDadosJson(null);
        setError("Erro ao buscar dados.");
      });
  }, [listaId]);

  console.log("Média do score: ", scoreGeral);
  console.log(topTags)



  const gerarGrupos = () => {
    setChamada(true)
    if (dadosJson) {
      axios
        .post("http://127.0.0.1:5000/ga_python", dadosJson)
        .then((response) => {
          console.log("Resposta da API AG:", response.data);
          setGrupos(response.data);


          Object.entries(response.data).forEach(([key, alunos]) => {
            console.log(`Grupo ${key}:`);

             const grupoId = parseInt(key, 10);

            alunos.forEach((aluno) => {
              var alunoId = aluno.aluno_id
              console.log(`  aluno_id: ${aluno.aluno_id}`);
              axios
                .post(`http://localhost:8800/professor/salvarGrupos`, {
                  alunoId,
                  turmaId,
                  listaId,
                  grupoId
                })
                .then((response) => {
                  const call = true;
                  console.log(response);
                  console.log(call, turmaId, listaId)
                  axios
                    .post(`http://localhost:8800/professor/salvarGrupos/api`, {
                      acao_chamada:call,
                      turmaId,
                      listaId,
                    })
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });

          
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
                <p>
                  {scoreGeral} / {qntPer}
                </p>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Tags</p>
              <div>
                <ul>
                  {topTags.map((tagItem, index) => (
                    <li key={index}>
                      {tagItem.tag} ({tagItem.frequency})
                    </li>
                  ))}
                </ul>
              </div>
            </ResultContent>
            <ResultContent>
              <p>Média de acertos: </p>
              <div>
                <p>{qntAluno}</p>
                {chamada ? (
                  <button disabled>Gerar Grupos</button>
                ) : (
                  <button onClick={gerarGrupos}>Gerar Grupos</button>
                )}
              </div>
            </ResultContent>
          </Result>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default ResultadosProf;
