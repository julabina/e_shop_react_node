import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { faShoppingCart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = (props) => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
            scrolled > 110 ? setVisible(true) : setVisible(false);
    }

    window.addEventListener("scroll", toggleVisible);

    return (
        <section className='navbar'>
            <div className="navbar__cont">
                {
                    visible &&
                    <div className="navbar__cont__hiddenStuff">
                        <NavLink to='/'>
                            <h2 className='navbar__cont__homeForDesktop'>React optique shop</h2>
                            <h2 className='navbar__cont__homeForTablet'><FontAwesomeIcon icon={faHouse}/></h2>
                        </NavLink>
                        <NavLink to="/cart">
                            <div className="navbar__cont__hiddenStuff__cartIcon">
                                <div className="navbar__cont__hiddenStuff__cartIcon__cartCount">
                                    <p className='navbar__cont__hiddenStuff__cartIcon__cartCount__count'>{props.artCount}</p>
                                </div>
                                <FontAwesomeIcon className='navbar__cont__hiddenStuff__cartIcon__icon' icon={faShoppingCart} />
                            </div>
                        </NavLink>
                    </div>
                }
                <nav className="navbar__cont__navBar">
                    <NavLink to="/telescope" className={({isActive}) => {
                        return isActive ? 'navbar__cont__navBar__link navbar__cont__navBar__link--active' : 'navbar__cont__navBar__link'
                    }
                }>Télescopes</NavLink>
                    <NavLink to="/oculaire" className={({isActive}) => {
                        return isActive ? 'navbar__cont__navBar__link navbar__cont__navBar__link--active' : 'navbar__cont__navBar__link'
                    }
                }>Oculaires</NavLink>
                    <NavLink to="/monture" className={({isActive}) => {
                        return isActive ? 'navbar__cont__navBar__link navbar__cont__navBar__link--active' : 'navbar__cont__navBar__link'
                    }
                }>Montures</NavLink>
                    <NavLink to="/promotion" className={({isActive}) => {
                        return isActive ? 'navbar__cont__navBar__link navbar__cont__navBar__link--active' : 'navbar__cont__navBar__link'
                    }
                }>Promotions</NavLink>
                </nav>
            </div>
        </section>
    );
};

export default NavBar;