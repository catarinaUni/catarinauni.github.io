import React, { useState } from "react";
import axios from "axios";
import { Form } from "./NewList.style";
import { Main, MainContent, MainItems } from "./Turma.style";

const QuestionFormRef = ({ turmaId }) => {
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({
    turmaId: turmaId,
    ref: "",
    tag: "",
    formato: "",
  });

  const handleAddReference = async () => {
    try {
      setReferences([...references, newReference]);

      const response = await axios.post(
        "http://localhost:8800/professor/adicionarRef",
        newReference // Enviando o objeto newReference diretamente
      );
      console.log("Data saved to database:", response.data);
      setNewReference({
        turmaId: turmaId,
        ref: "",
        tag: "",
        formato: "",
      });
    } catch (error) {
      console.error("Error saving data to database:", error);
    }
  };

  const handleChangeReference = (e, key) => {
    setNewReference({
      ...newReference,
      [key]: e.target.value,
    });
  };

  return (
    <div className="questionForm">
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
    </div>
  );
};

function NewRef({ turmaId }) {
  return (
    <Main>
      <MainContent>
        <MainItems>
          <Form>
            <QuestionFormRef turmaId={turmaId} />
          </Form>
        </MainItems>
      </MainContent>
    </Main>
  );
}

export default NewRef;
