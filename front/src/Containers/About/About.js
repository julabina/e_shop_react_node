import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { NavLink } from 'react-router-dom';

const About = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    })
                    localStorage.removeItem('token');
                };
                dispatch ({
                    type: 'LOG'
                })
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                })
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            })
        }; 

    },[])

    return (
        <main>
            <section className="about">
                <h2>À propos</h2>
                <p>React-optique-shop.dev est un site de démonstration, réalisé avec React, Redux et Sass pour la partie front-end ainsi que de Nodejs, Express, Sequelize et MariaDB pour le back-end.</p>
                <p className='about__marginTop'>Le code est disponible sur mon compte github via ce <a className='about__link' href="https://github.com/julabina/e_shop_react_node">dépot</a>.</p>
                <p className='about__marginTop'>Vous pouvez me contacter grace au formulaire de <NavLink className='about__link' to="/contact">contact</NavLink>.</p>
            </section>
        </main>
    );
};

export default About;