import styled from "styled-components";

export const Main= styled.div`
    display:flex;
    color: white;
    min-height: 100vh;
    background-color: #EEEEEE;
    
    
`;

export const MainContent = styled.div`
  width: 70vw;
  background-color: #eeeeee;
  color: #222831;
  margin-left: 5vw;
  margin-top: 50px;

  h5 {
    color: #afafaf;
    font-size: 14px;
  }

  .seta {
    display: inline-block;
    font-size: 36px;
    line-height: 1;
    text-align: center;
    color: #616161;
    cursor: pointer;
  }

  .dataCaros {
    display: flex;
    flex-direction: column;
    width: 80px;
  }
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

export const StyledImage = styled.div`
  width: 80px;
  height: 80px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  border-radius: 15px;
`;

export const MainItems = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    padding-left: 30px;

    .formAluno{
        width: 100%;
        display:flex;
        flex-direction:column;
        align-items: center;
    }

    .botao{
        width: 170px;
				height: 35px;
				background-color: #D9D9D9;
				border: none;
				border-radius: 30px;
                margin-bottom: 60px;
                margin-top: 40px;
}

    
`;



export const Alunos = styled.div`
    margin-bottom: 50px;
`;

export const Titulo = styled.div`
  color: #5c5c5cc3;
  font-size: 16px;
  p {
    width: 60px;
    margin-right: 30px;
  }
  margin-bottom: 20px;
  display: flex;
  .new {
    border: 1px solid #5c5c5cc3;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
  }
`;



export const Image = styled.img`

    width: 80px;

`;


export const Listas = styled.div`
margin-bottom: 50px;


`;

export const Materiais = styled.div` 
    width: 85%;
`;

export const ButtonNew = styled.div`
    margin-left:30px;

`;