import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHomeLg, faPen, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../NavBar/NavBar';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';


const Header = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }));

    const { logged } = useSelector(state => ({
        ...state.loggedReducer
    }));

    const navigate = useNavigate();

    const [headerCart, setHeaderCart] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {

        let artCount = 0, totalCart = 0;
        for(let i = 0; i < cart.length; i++) {
            let val = parseFloat(cart[i].price) * parseInt(cart[i].count);
            totalCart += val;
            artCount += parseInt(cart[i].count);
        }

        let item = {
            totalCart: totalCart.toFixed(2),
            artCount: artCount
        }

        if(logged) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }

        setHeaderCart(item);

    },[cart, logged])

    const toSearch = (e) => {
        e.preventDefault();
        if (searchValue === ""){
            navigate("/search" ,{ replace: true })
        } else if(!searchValue.match(/^[a-zA-Zé èà0-9]*$/)) { 
            setErrorMsg("La recherche ne doit contenir que des chiffres et des lettres");
        } else if(searchValue !== "") {    
            const query = '/search/query_=' + searchValue;
            navigate(query ,{ replace: true })
        } 
    };

    const handleSearchInput = (value) => {
        if(!value.match(/^[a-zA-Zé èà0-9]*$/)) {
            setErrorMsg("La recherche ne doit contenir que des chiffres et des lettres");
        } else {
            setErrorMsg("");
        }
        setSearchValue(value);
    };

    return (
        <header className='header'>
            <section className='header__section'>
                <NavLink to="/">
                    <h1 className='header__section__title'>REACT OPTIQUE SHOP</h1>
                </NavLink>
                <form className="header__section__search">
                    <div className="header__section__search__inputCont">
                        <input onInput={(e) => handleSearchInput(e.target.value)} value={searchValue} type="search" className='header__section__search__input' placeholder='Rechercher' />
                        <span className='header__section__search__span'>{errorMsg}</span>
                    </div>
                    <button onClick={toSearch} className='header__section__search__btn'><FontAwesomeIcon className='header__section__search__btn__icon' icon={faSearch} /></button>
                </form>
                <div className="header__section__box">
                    <NavLink to='/'>
                        <div className="header__section__box__menu">
                            <FontAwesomeIcon icon={faHomeLg} />
                            <p className='header__section__box__menu__title'>Accueil</p>
                        </div>
                    </NavLink>
                    {
                        isLogged ?
                        <NavLink to='/userAccount'>
                            <div className="header__section__box__menu">
                                <FontAwesomeIcon icon={faUser} />
                                <p className='header__section__box__menu__title'>Profil</p>
                            </div>
                        </NavLink>
                        :
                        <NavLink to='/login'>
                            <div className="header__section__box__menu">
                                <FontAwesomeIcon icon={faUser} />
                                <p className='header__section__box__menu__title'>Connexion</p>
                            </div>
                        </NavLink>
                    }
                    <NavLink to='/contact'>
                        <div className="header__section__box__menu">
                            <FontAwesomeIcon icon={faPen} />
                            <p className='header__section__box__menu__title'>Contact</p>
                        </div>
                    </NavLink>
                    <NavLink to='/cart'>
                        <div className="header__section__box__menu">
                            <div className="header__section__box__menu__cartCount">
                                <p className='header__section__box__menu__cartCount__count'>{headerCart.artCount}</p>
                            </div>
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <p className='header__section__box__menu__title'>{headerCart.totalCart} €</p>
                        </div>
                    </NavLink>
                </div>
            </section>
            <NavBar />
        </header>
    );
};

export default Header;