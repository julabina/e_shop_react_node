import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='footer'>
            <section className='footer__section'>
                <h2>REACT OPTIQUE SHOP</h2>
                <div className="footer__section__cont">
                    <div className="footer__section__cont__box">
                        <h3>Informations</h3>
                        <p>À propos</p>
                        <p>AUTRES</p>
                        <p>AUTRES</p>
                        <a href='https://www.telescopes-et-accessoires.fr/' target="_blank" >
                            <p>Optique Unterlinden</p>
                        </a>
                    </div>
                    <div className="footer__section__cont__box">
                        <h3>Nos produits</h3>
                        <NavLink to="/telescope">
                            <p>Télescopes</p>
                        </NavLink>
                        <p>Autres</p>
                        <p>Autres</p>
                        <NavLink to="/promotion">
                            <p>Promotions</p>
                        </NavLink>
                    </div>
                    <div className="footer__section__cont__box">
                        <h3>Mentions légales</h3>
                        <p>Mentions légales</p>
                        <p>Condition Générales de Vente</p>
                        <p>Gérer les cookies</p>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;