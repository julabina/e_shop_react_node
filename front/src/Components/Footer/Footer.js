import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {

    const [modalQuit, setModalQuit] = useState(false);
    const [toLink, setToLink] = useState("");

    const toggleModalQuit = (link) => {
        if(link) {
            setToLink(link)
        }
        setModalQuit(!modalQuit);
    }

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
                        <p onClick={() => toggleModalQuit('https://github.com/julabina/e_shop_react_node')}>Dépot distant du projet</p>
                        <p onClick={() => toggleModalQuit('https://www.telescopes-et-accessoires.fr/')}>Optique Unterlinden</p>
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
                        <NavLink to="/cgu" >
                            <p>Condition Générales d'utilisation</p>
                        </NavLink>
                        <p>Gérer les cookies</p>
                    </div>
                </div>
            </section>
            {
                modalQuit &&
                <section className="footer__modalQuit">
                    <div className="footer__modalQuit__modal">
                        <h2>Vous etes sur le point d'ouvrir un lien exterieur</h2>
                        <div className="footer__modalQuit__modal__btnCont">
                            <button onClick={toggleModalQuit}>Annuler</button>
                            <a href={toLink} target='_blank'>
                                <button onClick={toggleModalQuit}>Ok</button>
                            </a>
                        </div>
                    </div>
                </section>
            }
        </footer>
    );
};

export default Footer;