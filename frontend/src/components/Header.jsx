import React from "react";
import {Main, Title} from './Header.style'


function Header(props){
    console.log(props.turma.codigo==undefined)
    var textCod = ""
    if(props.turma.codigo != undefined){
        textCod="Código: "
    }
    var bgcolor = props.turma.bgcolor
    console.log(props.turma.bgcolor)

    return (
      <Main >
        <Title>{props.turma.nome}</Title>
        <p>
          {textCod}
          {props.turma.codigo}
        </p>
      </Main>
    );
}

export default Header;