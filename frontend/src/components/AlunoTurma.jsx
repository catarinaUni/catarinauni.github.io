import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"; // Make sure axios is imported
import SideBar from "./SideBar";
import Resultado from "./Resultado";
import Header from "./Header";
import Turma from "./Turma";
import Lista from "./Lista";
import AlunoTurmaInscrito from "./AlunoTurmaInscrito";
import { Contents } from "./AlunoTurma.style";
import { Main } from "./Turma.style";

function AlunoTurma() {
  const location = useLocation();
  const user = location.state?.user;
  const [flagTurma, setFlagTurma] = useState(false);
  const [flagLista, setFlagLista] = useState(false);
  const [flagResposta, setFlagResposta] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState([]);
  const [selectedLista, setSelectedLista] = useState([]);
  const [selectedResposta, setSelectecResposta] = useState([]);

  const handleSetFlagTurma = (flag, turma) => {
    setFlagTurma(flag);
    setSelectedTurma(turma);
  };

  const handleSetFlagLista = async (flag, lista, aluno) => {
    setSelectedLista(lista);
    setFlagTurma(false);
    

    try {
      const response = await axios.get(
        `http://localhost:8800/aluno/turma/resultado/verificarAluno`,
        {
          params: {
            listaId: lista.id,
            alunoId: aluno.id,
          },
        }
      );

      console.log("Resposta recebida:", response.data);
      if (response.data.length !== 0) {
        return handleSetFlagResposta(true)
      } 
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
      
      setFlagLista(flag);
  };

  const handleSetFlagResposta = (flag, resposta) => {
    setFlagResposta(flag);
    setFlagLista(false);
    setSelectecResposta(resposta);
  };

  const renderContent = () => {
    if (flagTurma) {
      console.log("TELA DA TURMA", selectedTurma);
      return (
        <AlunoTurmaInscrito
          user={user}
          turma={selectedTurma}
          handleSetFlagLista={handleSetFlagLista}
          handleSetFlagResposta={handleSetFlagResposta}
        />
      );
    }
    if (flagLista) {
      return (
        <Lista
          lista={selectedLista}
          aluno={user}
          turma={selectedTurma}
          handleSetFlagResposta={handleSetFlagResposta}
        />
      );
    }
    if (flagResposta) {
      return (
        <Resultado lista={selectedLista} aluno={user} turma={selectedTurma} />
      );
    }
  };

  return (
    <>
      <Main>
        <SideBar
          userName={user.name}
          userType={user.userType}
          userId={user?.id}
          handleSetFlagTurma={handleSetFlagTurma}
        />
        <Contents>
          <Header turma={selectedTurma} />
          {renderContent()}
        </Contents>
      </Main>
    </>
  );
}

export default AlunoTurma;
