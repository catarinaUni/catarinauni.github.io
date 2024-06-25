import {React, useState, useEffect} from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score } from './Resultado.style';
import axios from "axios";


const CheckAnswersComponent = () => {
    const [resultados, setResultados] = useState([]);
    const [topTags, setTopTags] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/aluno/turma/lista/resultado')
            .then(response => {
                setResultados(response.data.resultados);
                setTopTags(response.data.topTags);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Resultados</h1>
            <ul>
                {resultados.map((resultado, index) => (
                    <li key={index}>
                        <p>Pergunta ID: {resultado.perguntaId}</p>
                        <p>Resposta do Aluno: {resultado.respostaAluno}</p>

                        <p>Correta: {resultado.correta ? 'Sim' : 'Não'}</p>
                        <p>Tags: {resultado.tag1}, {resultado.tag2}, {resultado.tag3}</p>
                    </li>
                ))}
            </ul>

            <h2>Top Tags</h2>
            <ul>
                {topTags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <h2>Grupos de estudo recomendados</h2>
            
        </div>
    );
};
    
    







function Resultado(props) {


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
            <div>
              <CheckAnswersComponent/>
            </div>
          </MainItems>
        </MainContent>
      </Main>
    </>
  );
}

export default Resultado;
