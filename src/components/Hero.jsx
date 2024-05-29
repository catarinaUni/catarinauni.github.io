import React from "react";
import { MainHero, LogoSection, HeroText, HeroItems } from "./Hero.style";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <>
            <MainHero>
                <HeroItems>
                    <LogoSection>
                        LOGO
                    </LogoSection>
                    <HeroText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </HeroText>
                    <Link to="/login">
                        <button>Entrar</button>
                    </Link>
                    <Link to="/cadastro">
                        <button>Cadastro</button>
                    </Link>
                </HeroItems>
            </MainHero>
        </>
    );
}

export default Hero;
