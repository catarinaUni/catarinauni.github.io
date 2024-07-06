import React from "react";
import SideBar from "./SideBar";
import { useLocation } from 'react-router-dom';
import Header from "./Header";
import { Contents } from "./AlunoTurma.style";
import { Main, MainContent, Title, Alunos, Titulo, Listas, Materiais, MainItems, Image, ButtonNew} from "./Turma.style";


function ProfessorMain(){

    const location = useLocation();
    const user = location.state?.user;



    return(
        <>
        
        <Main>
            
            <SideBar userName={user.name} userType={user.userType} userId={user?.id} />
            <Contents>
            <Header />
                        
            </Contents>
            
        </Main>
        </>
    )
}

export default ProfessorMain;