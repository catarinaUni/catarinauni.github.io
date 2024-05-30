import React, { useState } from "react";
import SideBar from "./SideBar";
import { Main, MainContent, Header, Title, MainItems } from "./Turma.style";
import { ListaNome, Question } from "./Lista.style";
import { useNavigate } from "react-router-dom";

function QuestionForm({ questions, responses, setResponses }) {
  const handleRadioChange = (questionId, selectedAlternative) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: selectedAlternative,
    }));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.question}>
          <h3>{question.question}</h3>
          {Object.keys(question.alternatives).map((altKey) => (
            <div key={altKey}>
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

const questionsData = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    alternatives: {
      a: "Rio de Janeiro",
      b: "São Paulo",
      c: "Brasília",
      d: "Belo Horizonte",
    },
  },
  {
    id: 2,
    question: "Qual é capital do Brasil?",
    alternatives: {
      a: "Rio de Janeiro",
      b: "São Paulo",
      c: "Brasília",
      d: "Belo Horizonte",
    },
  },
  {
    id: 3,
    question: "Qualpital do Brasil?",
    alternatives: {
      a: "Rio de Janeiro",
      b: "São Paulo",
      c: "Brasília",
      d: "Belo Horizonte",
    },
  }

];

function Lista(props) {
    const navigate = useNavigate();
    const [responses, setResponses] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const jsonString = JSON.stringify(responses);
    console.log("Respostas em JSON:", jsonString);
    return navigate(-1);
  
  };

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
            <form onSubmit={handleFormSubmit}>
              <QuestionForm
                questions={questionsData}
                responses={responses}
                setResponses={setResponses}
              />
              
              <button type="submit">
                    Enviar
                </button>
                
            </form>
          </MainItems>
        </MainContent>
      </Main>
    </>
  );
}

export default Lista;
