import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
            <nav className="navBar">
                <NavLink to="/telescope" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Télescopes</NavLink>
                <NavLink to="/musique" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Autres</NavLink>
                <NavLink to="/chien" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Autres</NavLink>
                <NavLink to="/promotion" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Promotions</NavLink>
            </nav>
    );
};

export default NavBar;