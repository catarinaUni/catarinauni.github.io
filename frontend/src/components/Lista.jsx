import React, { useState, useEffect } from "react";
import { Main, MainContent, MainItems } from "./Turma.style";
import { ListaNome, FormAluno } from "./Lista.style";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function QuestionForm({ questions, responses, setResponses }) {
    const handleRadioChange = (questionId, selectedAlternative) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: selectedAlternative
        }));
    };

    return (
        <div>
            {questions.map(question => (
                <div key={question.id}>
                    <h4 className="enunciado">{question.question}</h4>
                    {Object.keys(question.alternatives).map(altKey => (
                        <div key={altKey} className="alternativa">
                            <input
                                type="radio"
                                name={`question_${question.id}`}
                                value={altKey}
                                checked={responses[question.id] === altKey}
                                onChange={() => handleRadioChange(question.id, altKey)}
                                className="alterButton"
                            />
                            {question.alternatives[altKey]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function Lista(props) {
    const navigate = useNavigate();
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);

    //ACESSAR INFO DA LISTA, ALUNO E TURMA:
    console.log("LISTAi:", props.lista);
    console.log(props.aluno);
    console.log(props.turma);

    useEffect(() => {
        const listaId = props.lista.id; 
        //console.log("LISTA A QUAL ELE CLICOU: ", listaId);
        axios.get(`http://localhost:8800/aluno/turma/lista/${listaId}`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as perguntas!", error);
            });
    }, [props.lista.id]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    
        const alunoId = props.aluno.id; 
        const listaId = props.lista.id;
        const respostas = Object.keys(responses).map(perguntaId => ({
            perguntaId: Number(perguntaId),
            respostaAluno: responses[perguntaId]
        }));
    
        console.log("Enviando respostas:", { alunoId, listaId, respostas });
    
        axios.post('http://localhost:8800/aluno/turma/resultado', { alunoId, listaId, respostas })
            .then(response => {
                console.log("Respostas salvas com sucesso:", response.data);
                return props.handleSetFlagResposta(true, respostas);
            })
            .catch(error => {
                console.error("Houve um erro ao salvar as respostas do aluno:", error);
            });
    };
    

    return (
        <Main>
            <MainContent>
                <MainItems>
                    <ListaNome>{props.lista.nome}</ListaNome>
                    <form onSubmit={handleFormSubmit} className="formAluno">
                        <FormAluno>
                            <QuestionForm
                                questions={questions}
                                responses={responses}
                                setResponses={setResponses}
                            />
                        </FormAluno>
                        <button type="submit" className="botao">
                            Enviar
                        </button>
                    </form>
                </MainItems>
            </MainContent>
        </Main>
    );
}

export default Lista;
