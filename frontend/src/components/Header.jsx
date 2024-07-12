import React from "react";
import {Main, Title} from './Header.style'


function Header(props){
    console.log(props.turma)


    return(
        <Main>
                    <Title>{props.turma.nome}</Title>
                    <p>Codigo: {props.turma.codigo}</p>
        </Main>
    )
}

export default Header;