import React, { useState } from "react";
import { CadastroContainer, CadastroForm, FormGroup, Label, Input, SubmitButton, CadastroItems } from "./Cadastro.style";
import axios from 'axios';

function Cadastro() {

    // Estado para armazenar os valores do formulário
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        userType: 'aluno', // valor padrão
    });

    // Atualiza o estado do formData quando os inputs mudam
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Envia os dados do formulário para o backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8800/cadastro', formData);
            console.log('Cadastro realizado com sucesso:', response.data);
            // Aqui você pode redirecionar o usuário ou limpar o formulário
        } catch (error) {
            console.error('Erro ao realizar cadastro:', error);
        }
    };
    return (
        <CadastroContainer>
            <CadastroItems>
                <h1>Cadastro</h1>
                <CadastroForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Username:</Label>
                        <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password:</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email:</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Type:</Label>
                        <select name="userType" onChange={handleChange} value={formData.userType}>
                            <option value="professor">Professor</option>
                            <option value="aluno">Aluno</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Preferência de formato para conteúdos:</Label>
                        <select name="userFormatPref" onChange={handleChange} value={formData.userFormatPref}>
                            <option value="Video">Video</option>
                            <option value="Livro">Livro</option>
                            <option value="Artigo">Artigo</option>
                            <option value="Quiz">Quiz</option>
                            <option value="Podcast">Podcast</option>
                        </select>
                    </FormGroup>
                    <SubmitButton type="submit">Cadastrar</SubmitButton>
                </CadastroForm>
            </CadastroItems>
        </CadastroContainer>
    );
}

export default Cadastro;
