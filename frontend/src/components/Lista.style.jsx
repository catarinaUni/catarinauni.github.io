import styled from "styled-components";


export const ListaNome = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
font-size: 20px;
font-weight: bold;
`;

export const Question = styled.div`


`;

export const FormAluno = styled.div`
margin-top: 20px;
width: 60vw;
display: flex;
align-items: left; 

.enunciado{
    margin-bottom: 30px;
    margin-top: 50px;
    font-size: 18px;
}

.alternativa{
    margin-left: 20px;
    margin-bottom: 10px;
    font-size: 18px;
    display: flex;
    align-items: center;

    
}
input[type='radio'] {
  box-sizing: border-box;
  appearance: none;
  background: #393E46;
  outline: 1px solid #393E46;
  border: 3px solid #393E46;
  width: 18px;
  height: 14px;
  border-radius: 5px;
  margin-right: 10px;
}

input[type='radio']:checked {
  background: #00DCBA;
}


`