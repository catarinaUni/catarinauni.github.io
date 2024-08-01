import styled from 'styled-components';

export const Score = styled.div`

`;



export const Subtitulo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #494949c8;
`;

export const Result = styled.div` 
    display:flex;
    justify-content: space-around;
    margin-top: 100px;

`


export const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    background-color: #e3e3e38f;
    padding: 15px;
    margin-top: 15px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 50px;
    color: #494949;
    border-radius: 20px;

    ul {
      list-style: none;
      li {
        margin-bottom: 10px;
      }
    }
  }

  button {
    margin-top: 30px;
    width: 100px;
    padding: 5px;
    border-radius: 15px;
    border: none;
    color: #494949;
    background-color: #61b9ff;
    &:disabled {
      background-color: #61b8ff5c;
      color: #49494955;
    }
  }

  .title {
    font-size: 18px;
    color: #494949;
  }
`;

export const Grupos = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 120px;
  color: #494949;
  padding-left: 30px;

  ul {
    list-style: none;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    margin-bottom: 10px;
    background-color: #e3e3e38f;
    padding: 5px;
    width: 100%;
    text-align: center;
  }
`;