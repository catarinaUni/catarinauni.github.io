import React from "react";
import SideBar from "./SideBar";
import {
  Main,
  MainContent,
  Header,
  Title,
  Alunos,
  Titulo,
  Listas,
  Materiais,
  MainItems,
  Image,
  ButtonNew,
} from "./Turma.style";
import { Form, Question } from "./NewList.style";
import { useState } from "react";
import { json } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const QuestionForm = ({ turmaId, handleSetFlagTurma, turma }) => {
  const [list, setList] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [disableButton, setDisableButton] = useState(true)
  const [references, setReferences] = useState([]);
  const [newList, setNewList] = useState({
    nome: "",
  });
  const [newQuestion, setNewQuestion] = useState({
    pergunta: "",
    alternativa: { a: "", b: "", c: "", d: "" },
    resposta: "a",
    tags: ["", "", ""],
  });

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      pergunta: "",
      alternativa: { a: "", b: "", c: "", d: "" },
      resposta: "a",
      tags: ["", "", ""],
    });
    toast.success("Pergunta adicionada com sucesso!");
    setDisableButton(false)
  };

const handleSaveToJson = () => {

  try {
    // Show success toast
    toast.success("Lista finalizada com sucesso! Você será redirecionado");

    // Delay the execution of the following code by 2 seconds
    setTimeout(async () => {
      try {
        const response = axios.post(
          "http://localhost:8800/professor/turma/novalista",
          { newList, questions, turmaId }
        );
        console.log("Data saved to database:", response.data);

        // Reset the form after saving
        setList([]);
        setQuestions([]);
        setNewList({ nome: "" });
        setNewQuestion({
          pergunta: "",
          alternativa: { a: "", b: "", c: "", d: "" },
          resposta: "a",
          tags: ["", "", ""],
        });


        handleSetFlagTurma(true, turma);
      } catch (error) {
        console.error("Error saving data to database:", error);
        toast.error("Erro ao salvar a lista.");
      }
    }, 3000); // Delay in milliseconds
  } catch (error) {
    console.error("Error displaying success toast:", error);
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
    <div className="questionForm">
      <ToastContainer />
      <input
        type="text"
        placeholder="Untitled"
        className="lista_titulo"
        value={newList.nome}
        onChange={(e) => setNewList({ nome: e.target.value })}
      />
      <p className="enunciado">Enunciado</p>
      <input
        type="text"
        placeholder="Digite a pergunta"
        value={newQuestion.pergunta}
        onChange={(e) =>
          setNewQuestion({ ...newQuestion, pergunta: e.target.value })
        }
        className="pergunta"
      />

      <div className="alternativas">
        <div>
          <label>a):</label>
          <input
            type="text"
            value={newQuestion.alternativa.a}
            onChange={(e) => handleChangeAlternative(e, "a")}
          />
        </div>
        <div>
          <label>b):</label>
          <input
            type="text"
            value={newQuestion.alternativa.b}
            onChange={(e) => handleChangeAlternative(e, "b")}
          />
        </div>
        <div>
          <label>c):</label>
          <input
            type="text"
            value={newQuestion.alternativa.c}
            onChange={(e) => handleChangeAlternative(e, "c")}
          />
        </div>
        <div>
          <label>d):</label>
          <input
            type="text"
            value={newQuestion.alternativa.d}
            onChange={(e) => handleChangeAlternative(e, "d")}
          />
        </div>
      </div>
      <div className="resposta">
        <label>Alternativa correta:</label>
        <select
          value={newQuestion.resposta}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, resposta: e.target.value })
          }
        >
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
          <option value="d">d</option>
        </select>
      </div>

      <div className="tags">
        <p>Tags:</p>
        <div>
          <input
            type="text"
            value={newQuestion.tags[0]}
            onChange={(e) => handleChangeTag(e, 0)}
          />
        </div>
        <div>
          <input
            type="text"
            value={newQuestion.tags[1]}
            onChange={(e) => handleChangeTag(e, 1)}
          />
        </div>
        <div>
          <input
            type="text"
            value={newQuestion.tags[2]}
            onChange={(e) => handleChangeTag(e, 2)}
          />
        </div>
      </div>

      <button onClick={handleAddQuestion} className="addPergunta">
        Adicionar Pergunta
      </button>

      
      <button onClick={handleSaveToJson} className="finalizar" disabled={disableButton}>
        Finalizar lista
      </button>
    </div>
  );
};

function NewList({ turma, handleSetFlagTurma }) {
  console.log(turma)

  return (
    <Main>
      <MainContent>
        <MainItems>
          <Form>
            <QuestionForm turmaId={turma.id} handleSetFlagTurma={handleSetFlagTurma} turma={turma } />
          </Form>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default NewList;
