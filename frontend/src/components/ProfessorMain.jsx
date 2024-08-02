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
import NewRef from "./NewRef.jsx";

function ProfessorMain() {
    const location = useLocation();
    const user = location.state?.user;
    console.log(user)
    const [flagTurma, setFlagTurma] = useState(false);
    const [flagCriarTurma, setFlagCriarTurma] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState([]);
    const [flagNovaLista, setFlagNovaLista] = useState(false);
    const [flagLista, setFlagLista] = useState(false);
    const [selectedLista, setSelectedLista] = useState([]);
    const [flagNewRef, setFlagNewRef] = useState(false)


    const handleSetFlagLista = (flag, lista) => {
        setFlagCriarTurma(false)
        setFlagTurma(false)
        setFlagLista(flag);
        setSelectedLista(lista);
        setFlagNewRef(false)
        setFlagNovaLista(false)
    };

    const handleSetFlagTurma = (flag, turma) => {
        setFlagTurma(flag);
        setFlagCriarTurma(false);
        setSelectedTurma(turma);
        setFlagCriarTurma(false)
        setFlagLista(false)
        setFlagNewRef(false)
    };

    const handleSetFlagCriarTurma = (flag) => {
        setFlagCriarTurma(flag);
        setFlagTurma(false);
        setFlagLista(false)
        setFlagNewRef(false)
        setFlagNovaLista(false)
    };

    const handleSetFlagNovaLista = (flag) => {
        setFlagNovaLista(flag)
        setFlagTurma(false)
        setFlagCriarTurma(false)
        setFlagLista(false)
        setFlagNewRef(false)
        
    }

    const handleSetFlagNovaRef = (flag) => {
        setFlagNewRef(flag);
        setFlagNovaLista(false)
        setFlagTurma(false);
        setFlagLista(false)
        setFlagCriarTurma(false)
    };


    const renderContent = () => {
        if (flagTurma) {
            return <Turma user={user} turma={selectedTurma} handleSetFlagNovaLista={handleSetFlagNovaLista} handleSetFlagLista={handleSetFlagLista} handleSetFlagNovaRef={handleSetFlagNovaRef } />;
        }
        if (flagCriarTurma) {
            return <CriarTurma user={user} />;
        }
        if (flagNovaLista){
            return (
              <NewList
                turma={selectedTurma}
                handleSetFlagTurma={handleSetFlagTurma}
              />
            );
        }
        if (flagLista) {
          return (
              <ResultadosProf lista={selectedLista} handleSetFlagTurma={handleSetFlagTurma} turma={selectedTurma} />
          );
        }
        if (flagNewRef) {
            return <NewRef turma={selectedTurma} handleSetFlagTurma={ handleSetFlagTurma} />;
        }

    };

    return (
        <>
            <Main>
                <SideBar 
                    userName={user.userName} 
                    userType={user.userType} 
                    userId={user.id} 
                    bgcolor={user.bgcolor}
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
