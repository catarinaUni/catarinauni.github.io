import React from "react";
import { CadastroContainer, CadastroForm, FormGroup, Label, Input, SubmitButton, CadastroItems } from "./Cadastro.style";

function Cadastro() {
    return (
        <CadastroContainer>
            <CadastroItems>

            
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
                <FormGroup>
                    <Label>Type:</Label>
                    <select>
                    <option value="professor">Professor</option>
                    <option value="aluno">Aluno</option>
                    </select>
                </FormGroup>
                <SubmitButton type="submit">Cadastrar</SubmitButton>
            </CadastroForm>
            </CadastroItems>
        </CadastroContainer>
    );
}

export default Cadastro;
