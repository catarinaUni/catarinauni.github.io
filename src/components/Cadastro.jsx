import React from "react";
import { CadastroContainer, CadastroForm, FormGroup, Label, Input, SubmitButton } from "./Cadastro.style";

function Cadastro() {
    return (
        <CadastroContainer>
            <h1>Cadastro</h1>
            <CadastroForm>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input type="text" name="username" />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type="password" name="password" />
                </FormGroup>
                <FormGroup>
                    <Label>Email:</Label>
                    <Input type="email" name="email" />
                </FormGroup>
                <SubmitButton type="submit">Cadastrar</SubmitButton>
            </CadastroForm>
        </CadastroContainer>
    );
}

export default Cadastro;
