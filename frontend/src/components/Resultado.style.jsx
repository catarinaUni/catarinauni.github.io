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
  margin-left: 30px;

  div {
    background-color: #e3e3e38f;
    padding: 15px;
    margin-top: 15px;
    min-width: 60px;
    max-width: 500px;
    text-align: left;
    hyphens: auto;
    overflow-wrap: break-word;
    word-break: break-word;

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
    width: 130px;
    padding: 5px;
    height: 35px;
    border-radius: 20px;
    border: none;
    font-size: 16px;
    color: white;
    background-color: #50be81;
    &:disabled {
      background-color: #9494945c;
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