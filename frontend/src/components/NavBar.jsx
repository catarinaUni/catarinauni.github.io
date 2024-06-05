import React from "react";
import {NavBarContainer, NavItem, NavLink, NavList, NavItens, NavLogo} from './NavBar.style'
import { Link } from "react-router-dom";
import logo from '../assets/logo2.png';


function NavBar(props) {
  return (
    <>
    <NavBarContainer>
      <NavList>
        <NavLogo>
            <img src={logo} alt="" />
        </NavLogo>
        <NavItens>
           
        </NavItens>
        
      </NavList>
    </NavBarContainer>
    </>
  );
}

export default NavBar;
