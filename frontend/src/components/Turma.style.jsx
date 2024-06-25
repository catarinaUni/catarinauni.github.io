import styled from "styled-components";

export const Main= styled.div`
    display:flex;
    color: white;
    
    
`;

export const MainContent = styled.div`
    width: 82vw;
    background-color: #3F3F3F;
    min-height:92vh;
    margin-top: 8vh;
    margin-left: 18vw;
    padding-bottom: 100px;
    

    
`;

export const Header = styled.div`

    background-color:#00A4CC;
    width:100%;
    height: 30vh;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;

    p{
        padding-top:50px;
    }

`;

export const Title = styled.div`
    font-size: 45px;
    padding-top: 50px;
    padding-right: 100px;

`;

export const MainItems = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    padding-left: 50px;
    padding-top:20px;
    height: auto;
    align-items: center;

    .formAluno{
        width: 100%;
        display:flex;
        flex-direction:column;
        align-items: center;
    }

    .botao{
        border: none;
				width: 100px;
				margin-top: 70px;
				height: 30px;
				background-color: #00DCBA;
    }

`;

export const FormAluno = styled.div`
margin-top: 20px;
width: 60vw;
display: flex;
align-items: left; 

.enunciado{
    margin-bottom: 30px;
    margin-top: 50px;
}

.alternativa{
    margin-left: 20px;
    margin-bottom: 10px;
    
}

`

export const Alunos = styled.div`
    margin-bottom: 70px;
`;

export const Titulo = styled.div`

    p {
        width: 60px;
        height: 1px;
        background-color:white;
    }
margin-bottom: 20px;
display: flex;

`;

export const Image = styled.img`

    width: 80px;

`;


export const Listas = styled.div`
margin-bottom: 70px;



`;

export const Materiais = styled.div` 

`;

export const ButtonNew = styled.div`
    margin-left:30px;

`;