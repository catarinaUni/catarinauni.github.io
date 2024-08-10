import styled from "styled-components";

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;

  .questionForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .lista_titulo {
    margin-bottom: 60px;
    background: none;
    border: none;
    font-size: 20px;
    text-align: center;
    color: black;

    &:focus {
      outline: none;
    }
  }

  .enunciado {
    width: 100%;
    color: black;
    padding-left: 10px;
    padding-bottom: 5px;
  }

  .addRef {
    margin-top: 50px;
  }

  .resref {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 30vh;
    align-items: center;
    justify-content: space-around;
    & > .tags {
      margin: 0;

      padding: 0;
      width: auto;
      & > label {
        margin-right: 10px;
      }
    }
    & > .resposta {
      margin: 0;

      & > select {
        width: 80px;
        font-size: 14px;
      }
    }

  }

  .refItem {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;
    & > label {
      margin-bottom: 10px;
    }
  }

  .refTag {
    & > div {
      & > input {
        background-color: white;
        border-radius: 30px;
        outline: none;
        width: 300px;
        border: 1px solid #cccccc;
        height: 30px;
        padding: 8px;
        font-size: 16px;
      }
    }
  }

  .textTitle {
    font-size: 16px;
    font-weight: 400;
    padding-bottom: 30px;
    color: #494949c8;
  }

  .pergunta {
    padding: 20px;
    resize: vertical;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 30px;
    border: 1px solid #cccccc;
    outline: none;
    width: 100%;
    height: 150px;
    text-align: left;
    overflow: auto;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    line-height: 1.5;

    &::placeholder {
      color: #999;
    }
  }

  .alternativas {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 100%;

    & > div {
      margin-bottom: 10px;

      & > label {
        color: #494949;
        padding-right: 10px;
      }

      & > input {
        width: 40%;
        padding: 8px;
        resize: vertical;
        box-sizing: border-box;
        background-color: white;
        border: 1px solid #cccccc;
        border-radius: 30px;
        outline: none;

        &::placeholder {
          color: #999;
        }
      }
    }
  }

  .resposta {
    margin-bottom: 50px;

    & > label {
      color: #494949;
    }

    & > select {
      margin-left: 10px;

      border-radius: 30px;
      outline: none;
      font-size: 16px;
      width: 50px;
      height: 25px;
      padding-left: 8px;
      border: 1px solid #cccccc;
      background-color: white;
      color: black;
    }
  }

  .tags {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    padding-right: 50px;
    padding-left: 50px;
    margin-bottom: 60px;

    & > p {
      color: black;
    }

    & > div {
      & > input {
        background-color: white;
        border-radius: 10px;
        outline: none;
        width: 150px;
        border: 1px solid #cccccc;
        height: 30px;
        padding: 8px;
      }
    }
  }

  .ref {
    & > input {
      border-radius: 30px;
      outline: none;
      width: 300px;
      height: 30px;
      padding: 8px;
      border: 1px solid #cccccc;
      background-color: white;
    }
  }

  .paiAddP {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .addPergunta {
    width: 170px;
    height: 35px;
    background-color: #50c878;
    border: none;
    border-radius: 30px;
    margin-bottom: 80px;
    font-size: 16px;
    color: white;
    cursor: pointer;
  }

  .addRef {
    width: 300px;
  }

  .nQ {
    margin-bottom: 10px;
    color: #999999;
  }

  .finalizar {
    width: 300px;
    height: 35px;
    margin-bottom: 50px;
    background-color: #35b8ab;
    border: none;
    border-radius: 30px;
    font-size: 16px;

    color: white;
    cursor: pointer;

    &:disabled {
      background-color: #a1a1a121;
      color: #2e2c2f40;
    }
  }
`;

export const Question = styled.div``;
