import styled from "styled-components";

export const MainHero = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white;
  color: #2e2e2e;
`;

export const HeroItems = styled.div`
  width: 50%;
  display: flex;

  align-items: center;
  flex-direction: column;
  height: 50%;
`;

export const LogoSection = styled.div`
  img {
    width: 400px;
  }
`;

export const HeroText = styled.div`
  margin-top: 100px;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
  width: 70%;
  justify-content: space-around;
  margin-top: 15%;
  margin-bottom: 100px;

  .botao {
    width: 150px;
    height: 35px;
    border-radius: 10px;
    border: none;
    background-color: #3497da;
    color: white;
    font-size: 18px;


    &:hover {
      background-color: #42aaf0;
      cursor: pointer;
    }
  }
`;
