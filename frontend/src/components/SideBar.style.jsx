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