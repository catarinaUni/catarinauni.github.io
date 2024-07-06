import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import Resultado from "./Resultado";
import Header from './Header'
import Turma from './Turma'
import AlunoTurmaInscrito from "./AlunoTurmaInscrito";
import { Contents } from "./AlunoTurma.style";
import { Main, MainContent, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";

// TELA PRINCIPAL DO ALUNO

function AlunoTurma() {
    const location = useLocation();
    const user = location.state?.user;
    const [flagTurma, setFlagTurma] = useState(false)
    const [flagLista, setFlagLista] = useState(false)
    const [flagResposta, setFlagResposta] = useState(false)
    const [selectedTurma, setSelectedTurma] = useState([])
    const [selectedLista, setSelectedLista] = useState([])
    const [selectedResposta, setSelectecResposta] = useState([])

    if (!user) {
       <h1>deu merda</h1>
        return null;
    }

    const handleSetFlagTurma = (flag, turma) => {
        setFlagTurma(flag);
        setSelectedTurma(turma);
    };

    const handleSetFlagLista = (flag, lista) => {
        setFlagTurma(false);
        setFlagLista(flag);
        setSelectedLista(lista);
    };

    const handleSetFlagResposta = (flag, resposta) => {
        setFlagResposta(true)
        setSelectecResposta(resposta)
    }
    const renderContent = () => {
        if (flagTurma) {
            console.log("TELA DA TURMA", selectedTurma)
            return <AlunoTurmaInscrito user={user} turma={selectedTurma} handleSetFlagLista={handleSetFlagLista} handleSetFlagResposta={handleSetFlagResposta}/> 
        }
        if(flagLista){
            return console.log("TELA DA LISTA", selectedLista);
        }
        if(flagResposta){
            return console.log("TELA DE RESPOSTAS ", selectedResposta)
        }

        return (
            <div>
                
            </div>
        );
    };

    return (
        <>
        
        <Main>
            
            <SideBar userName={user.name} userType={user.userType} userId={user?.id} handleSetFlagTurma={handleSetFlagTurma} />
            <Contents>
            <Header turma={selectedTurma}/>
                {renderContent()}         
            </Contents>
            
        </Main>
        </>
    );
}

export default AlunoTurma;
