import React from "react";
import {NavBarContainer, NavItem, NavLink, NavList, NavItens, NavLogo} from './NavBar.style'
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo2.png';
import { Navigate } from "react-router-dom";

function NavBar(props) {

  const navigate = useNavigate()
  return (
    <>
    <NavBarContainer>
      <NavList>
        <NavLogo onClick={() => navigate("/")}>
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
