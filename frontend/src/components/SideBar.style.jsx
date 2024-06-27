import styled from 'styled-components';

export const Side = styled.div`
    font-size:16px;
    color: white;
    height: 100%; 
    width: 18vw; 
    position: fixed; 
    z-index: 1; 
    top: 0; 
    left: 0;
    background-color: #3F3F3F; 
    overflow-x: hidden; 
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const SideBarItems = styled.div`
    width: 60%;
    height: 75%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const UserItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h4 {
        margin-top: 30px;
    }
    img {
        height: 100px;
    }
`;

export const TurmasItems = styled.div`
    display: flex;
    align-items: right;
    justify-content: center;
    flex-direction: column;
    margin-top:30px;
    width: 100%;
    
    p{
        margin-bottom: 15px;
        width: 80px;
        background-color: white;
        height: 1px;
    }
`;

export const TurmaButton = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;

    &:hover {
        background-color:#8F8787;
        cursor: pointer;
    }
`;

export const TurmasList = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const NewTurmaButton = styled.div`
    text-align: center;
    margin-top:10px;
    padding: 10px;
    width:100%;

    &:hover {
        color:#8F8787;
        cursor: pointer;
    }
`;

export const Modal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 5px;
    width: 40%;
`;

export const CloseButton = styled.span`
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;

    &:hover,
    &:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
`;
