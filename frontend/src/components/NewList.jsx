import React from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew } from "./Turma.style";
import { Form, Question } from './NewList.style';
import { useState } from 'react';
import { json } from "react-router-dom";
import axios from 'axios';

const QuestionForm = ({turmaId}) => {
    const [questions, setQuestions] = useState([]);
    const [references, setReferences] = useState([]);
    const [newQuestion, setNewQuestion] = useState({
        pergunta: '',
        alternativa: { a: '', b: '', c: '', d: '' },
        resposta: 'a',
        tags: ['', '', ''],
        ref: ''
    });
    const [newReference, setNewReference] = useState({
        tag: '',
        formato: ''
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

    const handleAddReference = () => {
        setReferences([...references, newReference]);
        setNewReference({
            tag: '',
            formato: ''
        });
    };

    const handleSaveToJson = async () => {
        //const turmaId = 1; // Assumindo que estamos usando um ID de turma fixo para este exemplo
        console.log("TURMAID: ", turmaId);
        try {
            const response = await axios.post('http://localhost:8800/professor/turma/novalista', { questions, references, turmaId });
            console.log('Data saved to database:', response.data);
        } catch (error) {
            console.error('Error saving data to database:', error);
        }
    };


    // Funções de manipulação para perguntas e referências
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

    const handleChangeReference = (e, key) => {
        setNewReference({
            ...newReference,
            [key]: e.target.value
        });
    };

    return (
        <div className="questionForm">
            <input type="text" placeholder="Untitled" className="lista_titulo" />
            <p className="enunciado">Enunciado</p>
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
                    <input type="text" value={newQuestion.alternativa.a} onChange={(e) => handleChangeAlternative(e, 'a')} />
                </div>
                <div>
                    <label>b):</label>
                    <input type="text" value={newQuestion.alternativa.b} onChange={(e) => handleChangeAlternative(e, 'b')} />
                </div>
                <div>
                    <label>c):</label>
                    <input type="text" value={newQuestion.alternativa.c} onChange={(e) => handleChangeAlternative(e, 'c')} />
                </div>
                <div>
                    <label>d):</label>
                    <input type="text" value={newQuestion.alternativa.d} onChange={(e) => handleChangeAlternative(e, 'd')} />
                </div>
            </div>
            <div className="resposta">
                <label>Alternativa correta:</label>
                <select value={newQuestion.resposta} onChange={(e) => setNewQuestion({ ...newQuestion, resposta: e.target.value })}>
                    <option value="a">a</option>
                    <option value="b">b</option>
                    <option value="c">c</option>
                    <option value="d">d</option>
                </select>
            </div>

            <div className="tags">
                <p>Tags:</p>
                <div>
                    <input type="text" value={newQuestion.tags[0]} onChange={(e) => handleChangeTag(e, 0)} />
                </div>
                <div>
                    <input type="text" value={newQuestion.tags[1]} onChange={(e) => handleChangeTag(e, 1)} />
                </div>
                <div>
                    <input type="text" value={newQuestion.tags[2]} onChange={(e) => handleChangeTag(e, 2)} />
                </div>
            </div>

            <button onClick={handleAddQuestion} className="addPergunta">Adicionar Pergunta</button>

            <div className="resref">
                <div className="ref">
                    <label>Referência: </label>
                    <input type="text" value={newReference.tag} onChange={(e) => handleChangeReference(e, 'tag')} />
                </div>
                <div className="tags">
                    <label>Tag:</label>
                    <div>
                        <input type="text" value={newReference.formato} onChange={(e) => handleChangeReference(e, 'formato')} />
                    </div>
                </div>
                <button onClick={handleAddReference} className="addPergunta addRef">Adicionar Referência</button>
            </div>

            <button onClick={handleSaveToJson} className="finalizar">Finalizar</button>
        </div>
    );
};

function NewList({ turmaId }) {
    return (
        <Main>
            <MainContent>
                <MainItems>
                    <Form>
                        <QuestionForm turmaId={turmaId} />
                    </Form>
                </MainItems>
            </MainContent>
        </Main>
    );
}


export default NewList;