import React from "react";
import { LoginContainer, LoginForm, FormGroup, Label, Input, SubmitButton, LoginItems } from "./Login.style";

function Login() {
    return (
        <LoginContainer>
            <LoginItems>
                
            
            <h1>Login</h1>
            <LoginForm>
                <FormGroup>
                    <Label>Username:</Label>
                    <Input type="text" name="username" />
                </FormGroup>
                <FormGroup>
                    <Label>Password:</Label>
                    <Input type="password" name="password" />
                </FormGroup>
                <SubmitButton type="submit">Entrar</SubmitButton>
            </LoginForm>
            </LoginItems>
        </LoginContainer>
    );
}

export default Login;
