import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
            <nav className="navBar">
                <NavLink to="/musique" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Instruments de musique</NavLink>
                <NavLink to="/telescope" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Téléscopes</NavLink>
                <NavLink to="/chien" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Chiens</NavLink>
                <NavLink to="/promotion" className={({isActive}) => {
                    return isActive ? 'navBar__link navBar__link--active' : 'navBar__link'
                    }
                }>Promotions</NavLink>
            </nav>
    );
};

export default NavBar;