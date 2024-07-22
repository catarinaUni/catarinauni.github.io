import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result } from './Resultado.style';
import axios from "axios";

const CheckAnswersComponent = ({ listaId, alunoId, setMateriaisRecomendados }) => {
  const [resultados, setResultados] = useState([]);
  const [topTags, setTopTags] = useState([]);
  let score = 0;
  
  useEffect(() => {
    axios.get(`http://localhost:8800/aluno/turma/lista/${listaId}`)
      .then(response => {
        console.log("PERGUNTAS:", response);
        const materiais = response.data.map(quest => quest.ref);
        setMateriaisRecomendados(materiais);
      })
      .catch(error => console.log(error));
  }, [listaId, setMateriaisRecomendados]);

  useEffect(() => {
    axios.get(`http://localhost:8800/aluno/turma/${alunoId}/lista/${listaId}/resultado`)
        .then(response => {
            setResultados(response.data.resultados);
            setTopTags(response.data.topTags);
        })
        .catch(error => console.error('Error fetching data:', error));
}, [alunoId, listaId]);

console.log(resultados)

resultados.forEach((resultado) => {
  if (resultado.correta) {
    score++;
  }
});


  return (
    <Result>
      <h2>Resultados</h2>
      <h4>Você acertou {score} questões!</h4>
      <h3>Assuntos recomendados para estudo</h3>
      <ul>
        {topTags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </Result>
  );
};

function Resultado({ lista, aluno, respostas }) {
  const [materiaisRecomendados, setMateriaisRecomendados] = useState([]);

  return (
    <>
      <Main>
        <MainContent>
          <MainItems>
            <ListaNome>Algoritmos e Programação 1</ListaNome>
            <div>
              <CheckAnswersComponent listaId={lista.id} alunoId={aluno.id} setMateriaisRecomendados={setMateriaisRecomendados} />
            </div>
            <h3>Materiais Recomendados</h3>
            <ul>
              {materiaisRecomendados.map((ref, index) => (
                <li key={index}>{ref}</li>
              ))}
            </ul>
          </MainItems>
        </MainContent>
      </Main>
    </>
  );
}

export default Resultado;
