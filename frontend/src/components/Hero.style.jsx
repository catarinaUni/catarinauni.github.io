import styled from 'styled-components';

export const MainHero = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #3F3F3F;
`;

export const HeroItems = styled.div`
    width: 50%;
    display:flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    height: 70%;
    margin-top: 10%;

`;

export const LogoSection = styled.div` 

`;

export const HeroText = styled.div`
    
`;

export const Buttons = styled.div` 

    display:flex;
    width: 50%;
    justify-content: space-around;

    .botao{
        width: 100px;
        height: 30px;
        border-radius: 4px;
        border: none;
    }
`;