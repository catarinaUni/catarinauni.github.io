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
      
      const json = JSON.stringify(questions, null, 2);
      console.log('Questions saved to JSON:', json);

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
      <>
        <input 
          className="pergunta"
          type="text"
          placeholder="Digite a pergunta"
          value={newQuestion.question}
          onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
        />
        <div className="alternativas">
        <div>
        <label>a):</label>
        <input
          type="text"
          value={newQuestion.alternatives.a}
          onChange={(e) => handleChangeAlternative(e, 'a')}
        />
        </div>
        <div>
        <label>b):</label>
        <input
          type="text"
          value={newQuestion.alternatives.b}
          onChange={(e) => handleChangeAlternative(e, 'b')}
        />
        </div>
        <div>
        <label>c):</label>
        <input
          type="text"
          value={newQuestion.alternatives.c}
          onChange={(e) => handleChangeAlternative(e, 'c')}
        />
        </div>
        <div>
        <label>d):</label>
        <input
          type="text"
          value={newQuestion.alternatives.d}
          onChange={(e) => handleChangeAlternative(e, 'd')}
        />
        </div>
        </div>
        <div className="resposta">
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
        </div>
        <div className="tags">
        <div>
        <label>Tag 1:</label>
        <input
          type="text"
          value={newQuestion.tags[0]}
          onChange={(e) => handleChangeTag(e, 0)}
        />
        </div>
        <div>
        <label>Tag 2:</label>
        <input
          type="text"
          value={newQuestion.tags[1]}
          onChange={(e) => handleChangeTag(e, 1)}
        />
        </div>
        <div>
        <label>Tag 3:</label>
        <input
          type="text"
          value={newQuestion.tags[2]}
          onChange={(e) => handleChangeTag(e, 2)}
        />
        </div>
        </div>
        <div className="paiAddP">
          <button onClick={handleAddQuestion} className="addPergunta">Adicionar Pergunta</button>
          <button onClick={handleSaveToJson} className="finalizar">Finalizar lista</button>
        </div>
        
        
      </>
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