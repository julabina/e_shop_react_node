import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';

const Promotion = () => {

    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/telescopes?promo=true')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });

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
                    return setIsLogged(false);
                };
                dispatch ({
                    type: 'LOG'
                })
                setIsLogged(true);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                })
                setIsLogged(false);
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            })
            setIsLogged(false);
        }; 

    },[])

    return (
        <main>
            
        </main>
    );
};

export default Promotion;