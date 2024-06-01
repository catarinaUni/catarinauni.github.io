import React from "react";
import {NavBarContainer, NavItem, NavLink, NavList, NavItens, NavLogo} from './NavBar.style'
import { Link } from "react-router-dom";


function NavBar(props) {
  return (
    <>
    <NavBarContainer>
      <NavList>
        <NavLogo>
            <NavLink href="#">LOGO</NavLink>
        </NavLogo>
        <NavItens>
           
        </NavItens>
        
      </NavList>
    </NavBarContainer>
    </>
  );
}

export default NavBar;
