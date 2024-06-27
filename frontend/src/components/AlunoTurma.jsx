import React from "react";
import { useLocation } from 'react-router-dom';
import SideBar from "./SideBar";
import { Main } from "./Turma.style";


function AlunoTurma() {
    const location = useLocation();
    const user = location.state?.user;

    if (!user) {
       <h1>deu merda</h1>
        return null;
    }

    return (
        <Main>
            <SideBar userName={user.name} userType={user.userType} userId={user?.id} />
        </Main>
    );
}

export default AlunoTurma;
