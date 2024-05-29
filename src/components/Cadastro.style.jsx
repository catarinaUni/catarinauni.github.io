import styled from 'styled-components';

export const CadastroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    h1 {
        font-size: 2rem;
        color: #333;
        margin-bottom: 20px;
    }
`;

export const CadastroForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const SubmitButton = styled.button`
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;
