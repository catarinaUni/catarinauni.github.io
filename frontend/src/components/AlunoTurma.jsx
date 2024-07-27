import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import Resultado from "./Resultado";
import Header from './Header'
import Turma from './Turma'
import Lista from "./Lista";
import AlunoTurmaInscrito from "./AlunoTurmaInscrito";
import { Contents } from "./AlunoTurma.style";
import { Main} from "./Turma.style";

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
        setFlagResposta(flag)
        setFlagLista(false)
        setSelectecResposta(resposta)
    }
    const renderContent = () => {
        if (flagTurma) {
            console.log("TELA DA TURMA", selectedTurma)
            
            return <AlunoTurmaInscrito user={user} turma={selectedTurma} handleSetFlagLista={handleSetFlagLista} handleSetFlagResposta={handleSetFlagResposta}/> 
        }
        if(flagLista){
            return <Lista lista={selectedLista} aluno={user} turma={selectedTurma} handleSetFlagResposta={handleSetFlagResposta} />
        }
        if(flagResposta){
            return <Resultado  lista={selectedLista} aluno={user} turma={selectedTurma} respostas={selectedResposta}/>
        }
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
