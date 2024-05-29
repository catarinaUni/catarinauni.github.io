import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";
import {Form, Question} from './NewList.style';
import { useState } from 'react';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    alternatives: ['', '', '', ''],
    correctAlternative: 0,
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      question: '',
      alternatives: ['', '', '', ''],
      correctAlternative: 0,
    });
  };

  const handleSaveToJson = () => {
    // Convert questions to JSON and save to a file (e.g., using FileSaver.js)
    console.log('Questions saved to JSON:', questions);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite a pergunta"
        value={newQuestion.question}
        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
      />
      
      {/* Render input fields for alternatives */}
      {/* Render dropdown/select for correct alternative */}
      <button onClick={handleAddQuestion}>Adicionar Pergunta</button>
      <button onClick={handleSaveToJson}>Salvar em JSON</button>
    </div>
  );
};

function NewList(props){


    

    return(
        <>

            <Main>
                <SideBar/>
                <MainContent>
                    <Header>
                        <Title>Inteligencia Artificial</Title>
                        <p>Codigo: 1234567</p>
                    </Header>

                    <MainItems>
                    <Titulo>
                        <div>
                        <h5>Nova lista</h5>
                            <p></p>
                        </div>

                        </Titulo>
                        <Form>
                            <QuestionForm/>
                            
                        </Form>
                        
                    </MainItems>
                </MainContent>

            </Main>

        
        </>
    )



}

export default NewList;