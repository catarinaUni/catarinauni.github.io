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
              <img src={logo} alt="ISA" />
            </LogoSection>
            <HeroText>
              
              Um sistema que identifica possíveis vulnerabilidades e oferece suporte durante a sua jornada acadêmica como professor ou aluno!
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
