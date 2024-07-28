import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import Header from './Header';
import Turma from './Turma';
import CriarTurma from './CriarTurma.jsx'; // Componente que será usado para criar turma
import { Contents } from "./AlunoTurma.style";
import { Main } from "./Turma.style";
import NewList from "./NewList.jsx";
import ResultadosProf from "./ResultadosProf.jsx";

function ProfessorMain() {
    const location = useLocation();
    const user = location.state?.user;
    const [flagTurma, setFlagTurma] = useState(false);
    const [flagCriarTurma, setFlagCriarTurma] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState([]);
    const [flagNovaLista, setFlagNovaLista] = useState(false);
    const [flagLista, setFlagLista] = useState(false);
    const [selectedLista, setSelectedLista] = useState([]);


    const handleSetFlagLista = (flag, lista) => {
        setFlagCriarTurma(false)
        setFlagTurma(false)
        setFlagLista(flag);
        setSelectedLista(lista);
    };

    const handleSetFlagTurma = (flag, turma) => {
        setFlagTurma(flag);
        setFlagCriarTurma(false);
        setSelectedTurma(turma);
    };

    const handleSetFlagCriarTurma = (flag) => {
        setFlagCriarTurma(flag);
        setFlagTurma(false);
    };

    const handleSetFlagNovaLista = (flag) => {
        setFlagNovaLista(flag)
        setFlagTurma(false)
    }

    const renderContent = () => {
        if (flagTurma) {
            return <Turma user={user} turma={selectedTurma} handleSetFlagNovaLista={handleSetFlagNovaLista} handleSetFlagLista={ handleSetFlagLista} />;
        }
        if (flagCriarTurma) {
            return <CriarTurma user={user} />;
        }
        if (flagNovaLista){
            return <NewList turmaId={selectedTurma?.id}  />
        }
        if (flagLista) {
          return (
              <ResultadosProf lista={selectedLista} />
          );
        }

    };

    return (
        <>
            <Main>
                <SideBar 
                    userName={user.name} 
                    userType={user.userType} 
                    userId={user.id} 
                    handleSetFlagTurma={handleSetFlagTurma} 
                    handleSetFlagCriarTurma={handleSetFlagCriarTurma}
                />
                <Contents>
                    <Header turma={selectedTurma} />
                    {renderContent()}
                </Contents>
            </Main>
        </>
    );
}

export default ProfessorMain;
