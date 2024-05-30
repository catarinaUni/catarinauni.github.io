import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";
import {Form, Question} from './NewList.style';
import { useState } from 'react';

const QuestionForm = () => {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
      question: '',
      alternatives: { a: '', b: '', c: '', d: '' },
      correctAlternative: 'a',
      tags: ['', '', ''],
    });
  
    const handleAddQuestion = () => {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({
        question: '',
        alternatives: { a: '', b: '', c: '', d: '' },
        correctAlternative: 'a',
        tags: ['', '', ''],
      });
    };
  
    const handleSaveToJson = () => {
      // Convert questions to JSON and log to console (or save to file)
      const json = JSON.stringify(questions, null, 2);
      console.log('Questions saved to JSON:', json);
      // Save the JSON to a file if needed
    };
  
    const handleChangeAlternative = (e, key) => {
      setNewQuestion({
        ...newQuestion,
        alternatives: { ...newQuestion.alternatives, [key]: e.target.value },
      });
    };
  
    const handleChangeTag = (e, index) => {
      const newTags = [...newQuestion.tags];
      newTags[index] = e.target.value;
      setNewQuestion({
        ...newQuestion,
        tags: newTags,
      });
    };
  
    return (
      <div>
        <input
          type="text"
          placeholder="Digite a pergunta"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
  
        <label>a):</label>
        <input
          type="text"
          value={newQuestion.alternatives.a}
          onChange={(e) => handleChangeAlternative(e, 'a')}
        />
        <label>b):</label>
        <input
          type="text"
          value={newQuestion.alternatives.b}
          onChange={(e) => handleChangeAlternative(e, 'b')}
        />
        <label>c):</label>
        <input
          type="text"
          value={newQuestion.alternatives.c}
          onChange={(e) => handleChangeAlternative(e, 'c')}
        />
        <label>d):</label>
        <input
          type="text"
          value={newQuestion.alternatives.d}
          onChange={(e) => handleChangeAlternative(e, 'd')}
        />
  
        <label>Resposta:</label>
        <select
          value={newQuestion.correctAlternative}
          onChange={(e) => setNewQuestion({ ...newQuestion, correctAlternative: e.target.value })}
        >
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>
  
        <label>Tag 1:</label>
        <input
          type="text"
          value={newQuestion.tags[0]}
          onChange={(e) => handleChangeTag(e, 0)}
        />
        <label>Tag 2:</label>
        <input
          type="text"
          value={newQuestion.tags[1]}
          onChange={(e) => handleChangeTag(e, 1)}
        />
        <label>Tag 3:</label>
        <input
          type="text"
          value={newQuestion.tags[2]}
          onChange={(e) => handleChangeTag(e, 2)}
        />
  
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