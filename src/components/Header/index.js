import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { GiHamburgerMenu } from 'react-icons/gi';

import './styles.css';

export default class Header extends Component {
    state = {
        navClass: 'nav-links'
    }

    render () {
        const { navClass } = this.state;

        return (
            <header id="main-header">
                <nav>
                    <div className="logo">
                        <h1>Projeto em <strong>React</strong></h1>
                    </div>

                    <ul className={navClass}>
                        <li>
                            <NavLink exact to="/" className="pages" activeClassName="currentPage">HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to="/favoritos" className="pages"  activeClassName="currentPage">FAVORITOS</NavLink>
                        </li>
                    </ul>

                    <div className="burguer" 
                        onClick={() => {
                            if(navClass === 'nav-links') {
                                this.setState({navClass: 'nav-links nav-active'});
                            } else {
                                this.setState({navClass: 'nav-links'});
                            }
                        }}
                    >
                        <GiHamburgerMenu size={20} />
                    </div>
                </nav>
            </header>
        );
    }
}
