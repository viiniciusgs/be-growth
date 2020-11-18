import React from 'react';

import { NavLink } from 'react-router-dom';

import './styles.css';

const Header = () => (
    <header id="main-header">
        <h1><strong>BE</strong>GROWTH</h1>
        <nav>
            <NavLink exact to="/" className="pages" activeClassName="currentPage">HOME</NavLink>
            <NavLink to="/favoritos" className="pages" activeClassName="currentPage">FAVORITOS</NavLink>
        </nav>
    </header>
);

export default Header;
