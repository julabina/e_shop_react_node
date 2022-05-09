import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer'>
            <section className='footer__section'>
                <NavLink to="/">
                    <h2>REACT OPTIQUE SHOP</h2>
                </NavLink>
                <div className="footer__section__cont">
                    <div className="footer__section__cont__box">
                        <h3>Informations</h3>
                        <NavLink to='/about'>
                            <p>À propos</p>
                        </NavLink>
                        <a href='https://github.com/julabina/e_shop_react_node'>
                            <p>Dépot distant du projet</p>
                        </a>
                        <a href='https://www.telescopes-et-accessoires.fr/' target="_blank" >
                            <p>Optique Unterlinden</p>
                        </a>
                        <NavLink to="/contact">
                            <p>Contact</p>
                        </NavLink>
                    </div>
                    <div className="footer__section__cont__box">
                        <h3>Nos produits</h3>
                        <NavLink to="/telescope">
                            <p>Télescopes</p>
                        </NavLink>
                        <NavLink to="/oculaire">
                            <p>Oculaires</p>
                        </NavLink>
                        <NavLink to="/monture">
                            <p>Montures</p>
                        </NavLink>
                        <NavLink to="/promotion">
                            <p>Promotions</p>
                        </NavLink>
                    </div>
                    <div className="footer__section__cont__box">
                        <h3>Mentions légales</h3>
                        <NavLink to="/legals" >
                            <p>Mentions légales</p>
                        </NavLink>
                        <p>Condition Générales de Vente</p>
                        <p>Gérer les cookies</p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;