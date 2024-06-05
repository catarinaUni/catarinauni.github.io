import {React, useState, useEffect} from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { Score, Result } from './Resultado.style';
import axios from "axios";


const CheckAnswersComponent = () => {
    const [resultados, setResultados] = useState([]);
    const [topTags, setTopTags] = useState([]);
    var score = 0;

    useEffect(() => {
        axios.get('http://localhost:8800/aluno/turma/lista/resultado')
            .then(response => {
                setResultados(response.data.resultados);
                setTopTags(response.data.topTags);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    resultados.forEach((resultado, index) => {
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
