import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems, FormAluno } from "./Turma.style";
import { ListaNome } from "./Lista.style";
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
                            />
                            {question.alternatives[altKey]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

function Lista() {
    const navigate = useNavigate();
    const [responses, setResponses] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/aluno/turma/lista')
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error("Houve um erro ao buscar as perguntas!", error);
            });
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const alunoId = 1; // Substitua pelo ID do aluno real
        const respostas = Object.keys(responses).map(perguntaId => ({
            perguntaId: Number(perguntaId),
            respostaAluno: responses[perguntaId]
        }));

        console.log("Enviando respostas:", { alunoId, respostas });

        // Enviar as respostas do aluno para o backend
        axios.post('http://localhost:8800/aluno/turma/resultado', { alunoId, respostas })
            .then(response => {
                console.log("Respostas salvas com sucesso:", response.data);
                // Remova a navegação temporariamente para depuração
                // return navigate(-1);
            })
            .catch(error => {
                console.error("Houve um erro ao salvar as respostas do aluno:", error);
            });

        navigate("/aluno/turma/lista/resultado")
    };

    return (
        <Main>
            <SideBar />
            <MainContent>
                <Header>
                    <Title>Inteligência Artificial</Title>
                    <p>Código: 1234567</p>
                </Header>
                <MainItems>
                    <ListaNome>LISTA</ListaNome>
                    <form onSubmit={handleFormSubmit} className="formAluno">
                        <FormAluno >
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