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

const QuestionForm = ({ turmaId }) => {
  const [list, setList] = useState([])
  const [questions, setQuestions] = useState([]);
  const [references, setReferences] = useState([]);
  const [newList, setNewList] = useState({
    nome: ""
  });
  const [newQuestion, setNewQuestion] = useState({

    pergunta: "",
    alternativa: { a: "", b: "", c: "", d: "" },
    resposta: "a",
    tags: ["", "", ""],
  });
  const [newReference, setNewReference] = useState({
    ref: "",
    tag: "",
    formato: "",
  });

 
  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({
      pergunta: "",
      alternativa: { a: "", b: "", c: "", d: "" },
      resposta: "a",
      tags: ["", "", ""],
    });
  };

  const handleAddReference = () => {
    setReferences([...references, newReference]);
    setNewReference({
      ref: "",
      tag: "",
      formato: "",
    });
    console.log(newReference)
  };

  const handleSaveToJson = async () => {

    console.log(newList)
    if (newList.nome.trim() === "") {
      alert("O nome da lista não pode estar vazio.");
      return;
    }



    try {
      const response = await axios.post(
        "http://localhost:8800/professor/turma/novalista",
        { newList, questions, references, turmaId }
      );
      console.log("Data saved to database:", response.data);
      // Reset the form after saving
      setList([]);
      setQuestions([]);
      setReferences([]);
      setNewList({ nome: "" });
      setNewQuestion({
        pergunta: "",
        alternativa: { a: "", b: "", c: "", d: "" },
        resposta: "a",
        tags: ["", "", ""],
      });
      setNewReference({
        ref: "",
        tag: "",
        formato: "",
      });
    } catch (error) {
      console.error("Error saving data to database:", error);
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

  const handleChangeReference = (e, key) => {
    setNewReference({
      ...newReference,
      [key]: e.target.value,
    });
    console.log(e.target.value, key)
  };

  return (
    <div className="questionForm">
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

      <div className="resref">
        <div className="ref">
          <label>Referência: </label>
          <input
            type="text"
            value={newReference.ref}
            onChange={(e) => handleChangeReference(e, "ref")}
          />
        </div>
        <div className="tags">
          <label>Tag:</label>
          <div>
            <input
              type="text"
              value={newReference.tag}
              onChange={(e) => handleChangeReference(e, "tag")}
            />
          </div>
        </div>
        <div className="resposta">
          <label>Formato:</label>
          <select
            value={newReference.formato}
            onChange={(e) => handleChangeReference(e, "formato")}
          >
            <option value="Vídeo">Vídeo</option>
            <option value="Livro">Livro</option>
            <option value="Artigo">Artigo</option>
            <option value="Podcast">Podcast</option>
          </select>
        </div>
      </div>
      <button onClick={handleAddReference} className="addPergunta addRef">
        Adicionar Referência
      </button>

      <button onClick={handleSaveToJson} className="finalizar">
        Finalizar
      </button>
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
