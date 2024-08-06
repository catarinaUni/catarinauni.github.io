import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  color: white;
  min-height: 100vh;
  background-color: white;
`;

export const MainContent = styled.div`
  width: 70vw;
  background-color: white;
  color: #333333;
  margin-left: 5vw;
  margin-top: 50px;

  h5 {
    color: #afafaf;
    font-size: 14px;
  }

  .seta {
    display: inline-block;
    width: 40px;
    color: black;
    cursor: pointer;
  }

  .dataCaros {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    p {
      overflow-wrap: break-word;
    }
  }
`;

export const Header = styled.div`
  background-color: #00a4cc;
  width: 100%;
  height: 30vh;
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;

  p {
    padding-top: 50px;
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
  flex-direction: column;
  font-size: 40px;
  font-weight: bold;
  color: #533ad4;
  margin-bottom: 5px;
  border-radius: 15px;

  .profFoto {
    width: 100px;
    height: 100px;
  }

  img {
    width: 60px;
    height: 60px;
  }

  .listLogo {
    border: 1px solid #50be80;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
  }

  .refLogo {
    border: 1px solid #ffad1f;
  }
`;

export const MainItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 30px;

  .formAluno {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .botao {
    width: 170px;
    height: 35px;
    color: #333333;
    background-color: #d9d9d9;
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
  height: auto;
  p {
    width: 60px;
    margin-right: 30px;
  }
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .new {
    border: 1px solid #bdbdbd;
    padding: 5px 10px;
    border-radius: 10px;

    &:hover {
      background-color: #e3e3e3;
      cursor: pointer;
    }
  }
`;

export const Image = styled.img`
  width: 80px;
`;

export const Listas = styled.div`
  margin-bottom: 50px;
`;

export const Materiais = styled.div``;

export const ButtonNew = styled.div`
  margin-left: 30px;
  color: #333333;
`;
