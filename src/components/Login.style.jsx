import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #3F3F3F;
    color: white;
`;

export const LoginItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #8F8787;
    border-radius: 4px;
    padding: 30px;

    h1 {
        margin-bottom: 50px;
    }

`


export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

export const FormGroup = styled.div`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
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
    margin-top: 30px;
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
