import React, { useState } from "react";
import { LoginContainer, LoginForm, FormGroup, Label, Input, SubmitButton, LoginItems } from "./Login.style";
import axios from 'axios';

function Login() {

    // Estado para armazenar os valores do formulário
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        userType: 'aluno',
    });

    // Estado para armazenar a mensagem de erro
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/login', formData);
            console.log('Solicitação de login realizada com sucesso:', response.data);
            // Aqui você pode redirecionar o usuário ou limpar o formulário
            setErrorMessage(''); // Limpa a mensagem de erro em caso de sucesso
        } catch (error) {
            console.error('Erro ao solicitar login:', error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message); // Define a mensagem de erro vinda do servidor
            } else {
                setErrorMessage('Erro ao realizar login. Por favor, tente novamente.'); // Define uma mensagem de erro genérica
            }
        }
    };

    return (
        <LoginContainer>
            <LoginItems>
                <h1>Login</h1>
                <LoginForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Tipo:</Label>
                        <select name="userType" onChange={handleChange} value={formData.userType}>
                            <option value="professor">Professor</option>
                            <option value="aluno">Aluno</option>
                        </select>
                    </FormGroup>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibe a mensagem de erro */}
                    <SubmitButton type="submit">Entrar</SubmitButton>
                </LoginForm>
            </LoginItems>
        </LoginContainer>
    );
}

export default Login;
