import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logoB from '../img/logoB.png';
import logoLetters from '../img/logoLetters.png';
import "./Navbar.css";
import { GrMenu, GrClose } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() { 
  const { user, isLoggedIn, isLoading } = useAuth();
  const [isMenuActive, setIsMenuActive] = useState(false);


  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

    return (
    
      <ul className="navbar">
        <div className="nav-items">
          <li>
            <NavLink to= "/"> 
              {isMenuActive ? <img className="logoBtn" src={logoLetters} alt="logo-oscuro"/> : <img className="logoBtn" src={logoB} alt="logo"/> }
            </NavLink>
          </li>
        </div>
        <div className="nav-items">
          <li className={`profile-btn ${isMenuActive? 'active' : ''}`}>
            <NavLink to={`/profile`} onClick={() => setIsMenuActive(false)}>
              <CgProfile color="#3d3d3d"/>
            </NavLink>
          </li>
        </div>
        <div className="nav-items">
          <button className={`rounded-btn ${isMenuActive? 'active' : ''}`} onClick ={toggleMenu}>
            {isMenuActive ? <GrClose color="#FBA6A6"/> : <GrMenu/>}
          </button>
        </div>
          <ul className={`menu ${isMenuActive ? 'active' : ''}`}>
            <li className="menu-item-1"><Link to="/adverts" style={{ textDecoration: 'none', color:"#3d3d3d"}} onClick={() => setIsMenuActive(false)}>Adverts</Link></li>
            <li className="menu-item"><Link to="/mates" style={{ textDecoration: 'none', color:"#3d3d3d"}} onClick={() => setIsMenuActive(false)}>Mates</Link></li>
            <li className="menu-item"><Link to="/bands" style={{ textDecoration: 'none', color:"#3d3d3d"}} onClick={() => setIsMenuActive(false)}>Bands</Link></li>
            <li className="menu-item"><Link to="/places" style={{ textDecoration: 'none', color:"#3d3d3d"}} onClick={() => setIsMenuActive(false)}>Places</Link></li>
          </ul>
      </ul>
    
    )
}
