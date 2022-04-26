import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHomeLg, faPen, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import { NavLink } from 'react-router-dom';

const Header = () => {

    const [searchValue, setSearchValue] = useState();

    return (
        <header className='header'>
            <section className='header__section'>
                <NavLink to="/">
                    <h1 className='header__section__title'>REACT OPTIQUE SHOP</h1>
                </NavLink>
                <form className="header__section__search">
                    <input type="search" className='header__section__search__input' placeholder='Rechercher' />
                    <button className='header__section__search__btn'><FontAwesomeIcon className='header__section__search__btn__icon' icon={faSearch} /></button>
                </form>
                <div className="header__section__box">
                    <NavLink to='/'>
                        <div className="header__section__box__menu">
                            <FontAwesomeIcon icon={faHomeLg} />
                            <p className='header__section__box__menu__title'>Accueil</p>
                        </div>
                    </NavLink>
                    <NavLink to='/'>
                        <div className="header__section__box__menu">
                            <FontAwesomeIcon icon={faUser} />
                            <p className='header__section__box__menu__title'>Connexion</p>
                        </div>
                    </NavLink>
                    <NavLink to='/contact'>
                        <div className="header__section__box__menu">
                            <FontAwesomeIcon icon={faPen} />
                            <p className='header__section__box__menu__title'>Contact</p>
                        </div>
                    </NavLink>
                    <NavLink to='/cart'>
                        <div className="header__section__box__menu">
                            <div className="header__section__box__menu__cartCount">
                                <p className='header__section__box__menu__cartCount__count'>0</p>
                            </div>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <p className='header__section__box__menu__title'>0,00€</p>
                        </div>
                    </NavLink>
                </div>
            </section>
            <NavBar />
        </header>
    );
};

export default Header;