import React from "react";
import { MainHero, LogoSection, HeroText, HeroItems, Buttons } from "./Hero.style";
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';

function Hero() {
    return (
        <>
            <MainHero>
                <HeroItems>
                    <LogoSection>
                        <img src={logo} alt="" />
                    </LogoSection>
                    <HeroText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </HeroText>
                    <Buttons>
                        <Link to="/login">
                            <button className="botao">Entrar</button>
                        </Link>
                        <Link to="/cadastro">
                            <button className="botao">Cadastro</button>
                        </Link>

                    </Buttons>
                    
                </HeroItems>
            </MainHero>
        </>
    );
}

export default Hero;
