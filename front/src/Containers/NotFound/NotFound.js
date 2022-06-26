import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFound = () => {

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
                    });
                    localStorage.removeItem('token');
                };
                dispatch ({
                    type: 'LOG'
                });
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
        }; 
        
    },[]);

    return (
        <>
        <Helmet>
            <title>404 not found</title>
            <meta name="404 not found" />
        </Helmet>
        <main className='notFound'>
            <h2>404 not found</h2>
            <NavLink to="/">
                <button>Retour à l'accueil</button>
            </NavLink>
        </main>
        </>
    );
};

export default NotFound;