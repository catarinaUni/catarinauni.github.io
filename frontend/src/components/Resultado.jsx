import React, { useState, useEffect } from "react";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result } from './Resultado.style';
import axios from "axios";

const CheckAnswersComponent = ({ listaId, alunoId}) => {
  const [resultados, setResultados] = useState([]);
  const [topTags, setTopTags] = useState([]);
  let score = 0;

  

  useEffect(() => {
    axios.get(`http://localhost:8800/aluno/turma/${alunoId}/lista/${listaId}/resultado`)
        .then(response => {
            setResultados(response.data.resultados);
            setTopTags(response.data.topTags);

            // Chama a rota para armazenar os resultados no resultado_listas
            return axios.post(`http://localhost:8800/aluno/turma/${alunoId}/lista/${listaId}/salvarTags`, {
                alunoId,
                listaId,
                tags: response.data.topTags
            });
        })
        .catch(error => console.error('Error fetching data:', error));
  }, [alunoId, listaId]);

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


function RecomendarMateriais({listaId, alunoid, topTags, formato}){
  const [materiais, setMateriais] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8800/aluno/turma/lista/${listaId}`)
      .then(response => {
        console.log("PERGUNTAS:", response);
        const materiaisRes = response.data.map(quest => quest.ref);
        setMateriais(materiaisRes);
      })
      .catch(error => console.log(error));
  }, []);

    let allFormats = []; 
    let oneFormat = []; 
    materiais.forEach(material => {
        const tagsDisc = material.Disciplina.split(',');
        const tagsFormt = material.Formato.split(',');

        const matchDisc = tagsDisc.some(tag => topTags.includes(tag));
        const matchFormt = tagsFormt.includes(formato);

        if (matchDisc) {
            if (matchFormt) {
                oneFormat.push(material);
            } else {
                allFormats.push(material);
            }
        }
    });

    allFormats.sort(() => Math.random() - 0.5);
    const materiaisRelevantes = oneFormat.concat(allFormats).slice(0, 30);
    let materiais1 = []
    materiaisRelevantes.forEach((material) => {
      materiais1.push(material.Formato)
    })
    console.log(alunoid, materiais1)

}

function Resultado({ lista, aluno, respostas }) {

  useEffect(() => {
    axios.get(`http://localhost:8800/aluno/turma/lista/${lista.id}`)
      .then(response => {
        console.log("PERGUNTAS:", response);
        const materiaisRes = response.data.map(quest => quest.ref);
        console.log("MateriaisRes: ", materiaisRes)
      })
      .catch(error => console.log(error));
  }, []);


  return (
    <>
      <Main>
        <MainContent>
          <MainItems>
            <ListaNome>Algoritmos e Programação 1</ListaNome>
            <div>
              <CheckAnswersComponent listaId={lista.id} alunoId={aluno.id} />
            </div>
            <h3>Materiais Recomendados</h3>
            
          </MainItems>
        </MainContent>
      </Main>
    </>
  );
}

export default Resultado;
