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
        ref: ''
    });

    const handleAddQuestion = () => {
        setQuestions([...questions, newQuestion]);
        setNewQuestion({
            pergunta: '',
            alternativa: { a: '', b: '', c: '', d: '' },
            resposta: 'a',
            tags: ['', '', ''],
            ref: ''
        });
    };

    const handleSaveToJson = async () => {
        try {
            const response = await axios.post('http://localhost:8800/professor/turma/novalista', { questions });
            console.log('Data saved to database:', response.data);
            console.log(questions)
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

    const handleChangeRef = (e) => {
        setNewQuestion({
            ...newQuestion,
            ref: e.target.value,
        });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Digite a pergunta"
                value={newQuestion.pergunta}
                onChange={(e) => setNewQuestion({ ...newQuestion, pergunta: e.target.value })}
                className="pergunta"
            />

            <div className="alternativas">
                <div>
                    <label>a):</label>
                    <input
                        type="text"
                        value={newQuestion.alternativa.a}
                        onChange={(e) => handleChangeAlternative(e, 'a')}
                    />
                </div>
                <div>
                    <label>b):</label>
                    <input
                        type="text"
                        value={newQuestion.alternativa.b}
                        onChange={(e) => handleChangeAlternative(e, 'b')}
                    />
                </div>
                <div>
                    <label>c):</label>
                    <input
                        type="text"
                        value={newQuestion.alternativa.c}
                        onChange={(e) => handleChangeAlternative(e, 'c')}
                    />
                </div>
                <div>
                    <label>d):</label>
                    <input
                        type="text"
                        value={newQuestion.alternativa.d}
                        onChange={(e) => handleChangeAlternative(e, 'd')}
                    />
                </div>
            </div>

            <div className="resposta">
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

            <div>
                <label>Adicionar referência:</label>
                <input
                    type="text"
                    value={newQuestion.ref}
                    onChange={handleChangeRef}
                />
            </div>

            <div className="paiAddP">
                <button onClick={handleAddQuestion} className="addPergunta">Adicionar Pergunta</button>
                <button onClick={handleSaveToJson} className="finalizar">Finalizar</button>
            </div>

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