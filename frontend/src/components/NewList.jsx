import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";
import {Form, Question} from './NewList.style';
import { useState } from 'react';
import { json } from "react-router-dom";
import axios from 'axios';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
      pergunta: '',
      alternativa: { a: '', b: '', c: '', d: '' },
      resposta: 'a',
      tags: ['', '', ''],
  });

  const handleAddQuestion = () => {
      setQuestions([...questions, newQuestion]);
      setNewQuestion({
          pergunta: '',
          alternativa: { a: '', b: '', c: '', d: '' },
          resposta: 'a',
          tags: ['', '', ''],
      });
  };

  const handleSaveToJson = async () => {
      try {
          const response = await axios.post('http://localhost:8800/professor/turma/novalista', { questions });
          console.log('Data saved to database:', response.data);
      } catch (error) {
          console.error('Error saving data to database:', error);
      }
  };

  const handleChangeAlternative = (e, key) => {
      setNewQuestion({
          ...newQuestion,
          alternativa: { ...newQuestion.alternativa, [key]: e.target.value },
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
              value={newQuestion.pergunta}
              onChange={(e) => setNewQuestion({ ...newQuestion, pergunta: e.target.value })}
          />

          <label>a):</label>
          <input
              type="text"
              value={newQuestion.alternativa.a}
              onChange={(e) => handleChangeAlternative(e, 'a')}
          />
          <label>b):</label>
          <input
              type="text"
              value={newQuestion.alternativa.b}
              onChange={(e) => handleChangeAlternative(e, 'b')}
          />
          <label>c):</label>
          <input
              type="text"
              value={newQuestion.alternativa.c}
              onChange={(e) => handleChangeAlternative(e, 'c')}
          />
          <label>d):</label>
          <input
              type="text"
              value={newQuestion.alternativa.d}
              onChange={(e) => handleChangeAlternative(e, 'd')}
          />

          <label>Resposta:</label>
          <select
              value={newQuestion.resposta}
              onChange={(e) => setNewQuestion({ ...newQuestion, resposta: e.target.value })}
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

          <h3>Perguntas adicionadas:</h3>
          <ul>
              {questions.map((q, index) => (
                  <li key={index}>
                      {q.pergunta} - Resposta correta: {q.resposta}
                  </li>
              ))}
          </ul>
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