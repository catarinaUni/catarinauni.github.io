import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result, ResultContent, Subtitulo, Grupos } from "./Resultado.style";
import axios from "axios";
import arrow from "../assets/arrow.png";

function ResultadosProf({ lista, aluno, respostas, turma, handleSetFlagTurma }) {
  const listaId = lista.id;
  const turmaId = lista.turma_id

  const [dadosJson, setDadosJson] = useState(null);
  const [error, setError] = useState(null);
  const [grupos, setGrupos] = useState([])
  const [chamada, setChamada] = useState(false)

  const [scoreGeral, setScoreGeral] = useState(0);
  const [qntPer, setQntPer] = useState(0);
  const [qntAluno, setQntAluno] = useState(0)
  const [topTags, setTopTags] = useState([])
  const [alunosMap, setAlunosMap] = useState({});



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
    const fetchAlunos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/turma/${turmaId}/ListarAlunos`
        );
        const alunosData = response.data["alunos"];
        console.log(alunosData["alunos"])
        const alunosMapping = alunosData.reduce((acc, aluno) => {
          acc[aluno.id] = aluno.nome;
          console.log(aluno.nome)
          return acc;
        }, {});
        setAlunosMap(alunosMapping);
        
      } catch (error) {
        console.error("Erro ao buscar dados dos alunos:", error);
      }
    };

    fetchAlunos();
  }, []);

  useEffect(() => {

    if (chamada) {
      
      axios
        .get("http://localhost:8800/grupos/getGrupos", {
          params: {
            turmaId,
            listaId,
          },
        })
        .then((response) => {
          console.log("grupos:", response.data);
          const data = response.data
          const groupedData = data.reduce((acc, item) => {
            const { grupo_id, aluno_id } = item;
            if (!acc[grupo_id]) {
              acc[grupo_id] = [];
            }
            acc[grupo_id].push(aluno_id);
            return acc;
          }, {});

          const gruposArray = Object.keys(groupedData).map((grupo_id) => ({
            grupo_id,
            alunos: groupedData[grupo_id],
          }));

          setGrupos(gruposArray);
        })
        .catch((error) => {
          console.error(error);
        });
    }

  }, [chamada])



  useEffect(() => {
    axios
      .get(`http://localhost:8800/aluno/turma/resultado/verificar`, {
        params: { listaId },
      })
      .then((response) => {
        console.log("Resposta recebida JSON:", response);
        setDadosJson(response.data.results)

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

        setQntAluno(totalAlunos)
        if (totalScore == 0) {
          setScoreGeral(0)
        } else {
          
          setScoreGeral(totalScore / totalAlunos);
        }
        
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


    
    setChamada(true);

    if (dadosJson) {
      axios
        .post("http://127.0.0.1:5000/ga_python", dadosJson)
        .then((response) => {
          const gruposData = Object.entries(response.data).map(
            ([id, items]) => ({
              id,
              items,
            })
          );

          const salvarGruposPromises = [];
          Object.entries(response.data).forEach(([key, alunos]) => {
            const grupoId = parseInt(key, 10);

            alunos.forEach((aluno) => {
              salvarGruposPromises.push(
                axios.post(`http://localhost:8800/professor/salvarGrupos`, {
                  alunoId: aluno.aluno_id,
                  turmaId,
                  listaId,
                  grupoId,
                })
              );
            });
          });

          Promise.all(salvarGruposPromises)
            .then(() => {
              return axios.post(
                `http://localhost:8800/professor/salvarGrupos/api`,
                {
                  acao_chamada: true,
                  turmaId,
                  listaId,
                }
              );
            })
            .then(() => {
              console.log("Grupos salvos com sucesso.");
            })
            .catch((error) => {
              console.error("Erro ao salvar grupos:", error);
            })

        })
        .catch((error) => {
          console.error("Erro:", error);
          
        });
    } else {
      console.log("Dados JSON não disponíveis.");
     
    }
  };



  return (
    <Main>
      <MainContent>
        <img
          src={arrow}
          alt="voltar"
          onClick={() => handleSetFlagTurma(true, turma)}
          className="seta"
        />
        <MainItems>
          <ListaNome>{lista.nome}</ListaNome>
          <Subtitulo>
            <p className="subtitulo">Veja aqui os resultados</p>
          </Subtitulo>

          <Result>
            <ResultContent>
              <p className="title">Média de acertos: </p>
              <div>
                <p>
                  {scoreGeral.toFixed(2)} / {qntPer}
                </p>
              </div>
            </ResultContent>
            <ResultContent>
              <p className="title">Assuntos (frequência)</p>
              <div>
                <ul>
                  {topTags.map((tagItem, index) => (
                    <li key={index}>
                      {index + 1} &nbsp;&nbsp;{tagItem.tag} ({tagItem.frequency}
                      )
                    </li>
                  ))}
                </ul>
              </div>
            </ResultContent>
            <ResultContent>
              <p className="title">Respostas recebidas: </p>
              <div>
                <p>
                  {qntAluno}{" "}
                  {qntAluno > 1 ? "Alunos responderam" : "Aluno respondeu"}{" "}
                </p>
                {chamada ? (
                  <button disabled>Gerar Grupos</button>
                ) : (
                  <button onClick={gerarGrupos}>Gerar Grupos</button>
                )}
              </div>
            </ResultContent>
          </Result>
          <Grupos>
            {chamada ? (
              grupos.length > 0 ? (
                grupos.map((grupo) => (
                  <div key={grupo.grupo_id}>
                    <h4>Grupo {grupo.grupo_id}</h4>
                    <ul>
                      {grupo.alunos.length > 0 ? (
                        grupo.alunos.map((aluno_id, index) => (
                          <li key={index}>
                            {alunosMap[aluno_id] || `Aluno ID: ${aluno_id}`}
                          </li>
                        ))
                      ) : (
                        <li>Nenhum aluno disponível.</li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <div>Não há grupos para mostrar.</div>
              )
            ) : (
              <div>Não há grupos para mostrar.</div>
            )}
          </Grupos>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default ResultadosProf;
