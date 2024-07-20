import styled from 'styled-components';

export const CadastroContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-color: #EEEEEE;
color: #222831;
`;

export const CadastroItems = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    h1 {
        padding-bottom: 50px;
    }


`;

export const CadastroForm = styled.form`
display: flex;
flex-direction: column;
width: 270px;
`;

export const FormGroup = styled.div`
margin-bottom: 15px;
display: flex;
flex-direction: column;

    select{
        color: #3F3F3F;
        height: 30px;
        background-color: #E3E3E3;
        color: #222831;
        font-size: 14px;
        border-radius: 14px;
        padding: 5px;

    }
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: bold;

`;

export const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #E3E3E3;
`;


export const SubmitButton = styled.button`
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    
    &:hover {
        background-color: #0056b3;
    }
`;
