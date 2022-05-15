import React, { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';

const UserAccount = () => {

    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    localStorage.removeItem('token');
                    return navigate('/login', { replace: true });
                };
            };
        } else {
            return navigate('/login', { replace: true });
        }; 

    },[]);

    return (
        <main>
           
        </main>
    );
};

export default UserAccount;