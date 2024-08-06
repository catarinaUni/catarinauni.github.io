import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  color: #222831;
`;

export const LoginItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 30px;

  h1 {
    margin-bottom: 50px;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 270px;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  select {
    color: #3f3f3f;
    height: 30px;
    background-color: #f5f5f5;
    color: #222831;
    font-size: 14px;
    border-radius: 14px;
    padding: 5px;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #f5f5f5;
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
