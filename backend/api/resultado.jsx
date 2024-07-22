import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome } from "./Lista.style";
import { Result } from './Resultado.style';
import axios from "axios";

const materiais = []

const estudantes = []



const CheckAnswersComponent = () => {
  const [resultados, setResultados] = useState([]);
  const [grupoNovoAluno, setGrupoNovoAluno] = useState([]);
  const [score, setScore] = useState(0);
  const [materiaisRecomendados, setMateriaisRecomendados] = useState([]);


  useEffect(() => {
      let newScore = 0;
      resultados.forEach((resultado) => {
          if (resultado.correta) {
              newScore++;
          }
      });
      setScore(newScore);
  }, [resultados]);

  const funcao = () => {
    estudantes.forEach((aluno) => {
        let topTags = []
        aluno.conhecimento_para_aperfeicoar.forEach((item) => {
          topTags.push(item)
        })
        recomendarMateriais(aluno.id_aluno, topTags, aluno.preferencia_material_estudo);
    });
};

const recomendarMateriais = (alunoid, topTags, formato) => {
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

};


useEffect(() => {
    setMateriaisRecomendados(materiais);
}, []);



  
  

    const adicionarAluno = () => {
        const novoAluno = {
            id_aluno: 'a361',
            conhecimento_consolidado: ['matrizes'],
            conhecimento_para_aperfeicoar: ['exponencial', 'trigonometria'],
            turno_disponivel: 'tarde'
        };

        axios.post('http://localhost:5000/adicionar_aluno', novoAluno)
            .then(response => {
                console.log('Resposta da API:', response.data);
                setGrupoNovoAluno(response.data.grupo_novo_aluno);
            })
            .catch(error => console.error('Erro ao adicionar novo aluno:', error));
    };

    return (
        <Result>
            <h2>Resultados</h2>
            <h4>Você acertou {score} questões!</h4>
            <h3>Assuntos recomendados para estudo</h3>
            <ul>
                
            </ul>
            <button onClick={adicionarAluno}>Adicionar Aluno</button>
            <button onClick={funcao}>Recomendar Materiais</button>
            <div>
                <h3>Materiais Recomendados:</h3>
                <ul>
                    {materiaisRecomendados.map((material, index) => (
                        <li key={index}>{material.ID} - Relevância: {material['Formato']}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Grupo do novo aluno:</h3>
                <ul>
                    {grupoNovoAluno.map((aluno, index) => (
                        <li key={index}>{aluno}</li>
                    ))}
                </ul>
            </div>
        </Result>
    );
};

const Resultado = () => {
    return (
        <Main>
            <SideBar />
            <MainContent>
                <Header>
                    <Title>Inteligência Artificial</Title>
                    <p>Código: 1234567</p>
                </Header>
                <MainItems>
                    <ListaNome>Algoritmos e Programação 1</ListaNome>
                    <CheckAnswersComponent />
                </MainItems>
            </MainContent>
        </Main>
    );
};

export default Resultado;
