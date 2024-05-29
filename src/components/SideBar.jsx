import React from "react";
import {Side, NewTurmaButton,SideBarItems,TurmaButton,TurmasItems,TurmasList,UserItems} from './SideBar.style';
import imgt from "../assets/imgt.png"


function SideBar(props){


    return(
        <>
        <Side>
            <SideBarItems>
                <UserItems>
                    <img src={imgt} alt="" />
                    <h4>Nome Sobrenome</h4>
                    <p>Professor</p>
                </UserItems>
                <TurmasItems>
                    <h5>Turmas</h5>
                    <p></p>
                    <TurmasList>
                        <TurmaButton>Inteligencia Artificial</TurmaButton>
                        <TurmaButton>Inteligencia Artificial</TurmaButton>
                        <TurmaButton>Inteligencia Artificial</TurmaButton>
                        <TurmaButton>Inteligencia Artificial</TurmaButton>
                        <TurmaButton>Inteligencia Artificial</TurmaButton>
                    </TurmasList>
                    <NewTurmaButton>
                        criar turma
                    </NewTurmaButton>
                </TurmasItems>
            </SideBarItems>

        </Side>
        </>
    );
}

export default SideBar;