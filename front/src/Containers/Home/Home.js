import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';

const Home = () => {

    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false);

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

        
    },[])


    return (
        <main>
            <section className="home__carrousel">

            </section>
            <section className="home__categories">
                <h2>Nos catégories</h2>
                <div className="home__categories__cont">
                    <div className="home__categories__cont__row">
                        <div className="home__categories__cont__row__category">
                            <h3>Telescopes</h3>
                            <div className="home__categories__cont__row__category__imgCont">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="home__categories__cont__row__category">
                            <h3>Oculaires</h3>
                            <div className="home__categories__cont__row__category__imgCont">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="home__categories__cont__row">
                        <div className="home__categories__cont__row__category">
                            <h3>Montures</h3>
                            <div className="home__categories__cont__row__category__imgCont">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="home__categories__cont__row__category">
                            <h3>Promotions</h3>
                            <div className="home__categories__cont__row__category__imgCont">
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home__promo">
                <h2>Nos promotions</h2>
                <div className="home__promo__promoCont"></div>
                <p>Et bien d'autre encore !</p>
                <button>Voir toutes les promotions</button>
            </section>
        </main>
    );
};

export default Home;