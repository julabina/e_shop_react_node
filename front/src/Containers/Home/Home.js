import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';

const Home = () => {

    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false);
    const [test, setTest] = useState([])

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

        fetch('http://localhost:3000/api/comments/2aba897e-d783-4da0-ab71-59ec280e61c4')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const newObj = [
                    data.data[2],
                    data.data[1],
                    data.data[0],
                    data.data[3]
                ]
                let n1 = newObj.map(el => {
                    el.created = Date.parse(el.created);
                   return el
                })
                console.log(n1);
                let n2 = n1.map(el => {
                    el.updated = Date.parse(el.updated);
                    return el
                })
                console.log(n2);
                setTest(n2);
            })
    },[])

    const testtt = () => {
       
        console.log(test);
        let arr = test
        arr.sort((a,b) => {
            return b.updated - a.updated
        })
        console.log(arr);

    }

    return (
        <main>
            <h1>HOME</h1>
            <button onClick={testtt}>TEST</button>
        </main>
    );
};

export default Home;