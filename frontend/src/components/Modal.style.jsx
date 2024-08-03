import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.274);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #494949;
  z-index: 1000000;
  hyphens: auto;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  hyphens: auto;

  h2 {
    margin-top: 18px;
    margin-bottom: 20px;
    hyphens: auto;
    overflow-wrap: break-word; 
    word-break: break-word; 
    width: 100%;
    text-align: center;
  }

  .criarTurma {
    padding: 10px;
    border-radius: 15px;
    border: 1px solid #cccccc;
    font-size: 14px;

    &:focus {
      border-color: white;
    }
  }

  .modelButton {
    margin-top: 30px;
    width: 100px;
    padding: 5px;
    background-color: #71e375;
    border: none;
    border-radius: 30px;
    font-size: 14px;
    color: #494949;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .modalError {
    font-size: 12px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff0000c0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;
