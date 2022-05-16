import React, { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UserAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logged } = useSelector(state => ({
        ...state.loggedReducer
    }));

    useEffect(() => {

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
                    return navigate('/login', { replace: true });
                };
                dispatch ({
                    type: 'LOG'
                })
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            })
            return navigate('/login', { replace: true });
        }; 
               
    },[]);
    
    const logOut = () => {
        dispatch ({
            type: 'DISCONNECT'
        })
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <main>
           <button onClick={logOut}>Se deconnecter</button>
        </main>
    );
};

export default UserAccount;