import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import Header from './Header';
import Turma from './Turma';
import CriarTurma from './CriarTurma.jsx'; // Componente que será usado para criar turma
import { Contents } from "./AlunoTurma.style";
import { Main } from "./Turma.style";

function ProfessorMain() {
    const location = useLocation();
    const user = location.state?.user;
    const [flagTurma, setFlagTurma] = useState(false);
    const [flagCriarTurma, setFlagCriarTurma] = useState(false);
    const [selectedTurma, setSelectedTurma] = useState([]);

    if (!user) {
        return <h1>deu merda</h1>;
    }

    const handleSetFlagTurma = (flag, turma) => {
        setFlagTurma(flag);
        setFlagCriarTurma(false);
        setSelectedTurma(turma);
    };

    const handleSetFlagCriarTurma = (flag) => {
        setFlagCriarTurma(flag);
        setFlagTurma(false);
    };

    const renderContent = () => {
        if (flagTurma) {
            return <Turma user={user} turma={selectedTurma} />;
        }
        if (flagCriarTurma) {
            return <CriarTurma user={user} />;
        }

        return (
            <div>
                {/* Conteúdo adicional pode ser adicionado aqui */}
            </div>
        );
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
