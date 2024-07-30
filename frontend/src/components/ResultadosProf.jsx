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
  }, [turmaId, listaId]);

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
          setGrupos(gruposData);

          // Salvar grupos no backend
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

          // Esperar todas as requisições serem concluídas
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
              <p>Respostas recebidas: </p>
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
          <h2>Grupos:</h2>
          {grupos ? (
            grupos.map((grupo) => (
              <div key={grupo.id}>
                <h3>Grupo ID: {grupo.id}</h3>
                <ul>
                  {grupo.items.map((item, index) => (
                    <li key={index}>{JSON.stringify(item)}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <div>Não há grupos para mostrar.</div>
          )}
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default ResultadosProf;
