import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import telescopeImg from '../../assets/telescope.webp'
import oculaireImg from '../../assets/oculaire.webp'
import montureImg from '../../assets/monture.webp'
import promoImg from '../../assets/promo.webp'
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';
import { NavLink } from 'react-router-dom';
import HomeCarrousel from '../../Components/homeCarrousel/HomeCarrousel';

const Home = () => {

    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false);
    const [promoProduct, setPromoProduct] = useState([])

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

        getPromo();
    },[])

    const getPromo = () => {
        fetch('http://localhost:3000/api/products/promotion', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST'
        })
            .then(res => res.json())
            .then(products => {
                let newArr = [];

                for(let i = 0; i < 4; i++) {
                    if(products.data[i] !== undefined) {
                        const item = {
                            cat: products.data[i].Category.name,
                            name: products.data[i].name,
                            pictures: products.data[i].pictures,
                            price: products.data[i].price,
                            id: products.data[i].id,
                            promo: products.data[i].promo,
                            promoValue: products.data[i].promoValue,
                            stock: products.data[i].stock
                        }
                        newArr.push(item)
                    }
                }
                setPromoProduct(newArr);
            })
    }

    return (
        <main className='home'>
            <HomeCarrousel />
            <section className="home__categories">
                <h2>Nos catégories</h2>
                <div className="home__categories__cont">
                    <div className="home__categories__cont__row">
                        <NavLink to="/telescope">
                            <div className="home__categories__cont__row__category">
                                <h3>Telescopes</h3>
                                <div className="home__categories__cont__row__category__imgCont">
                                    <img src={telescopeImg} alt="un telescope" />
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to='/oculaire'>
                            <div className="home__categories__cont__row__category">
                                <h3>Oculaires</h3>
                                <div className="home__categories__cont__row__category__imgCont">
                                    <img src={oculaireImg} alt="un oculaire" />
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="home__categories__cont__row">
                        <NavLink to="/monture">
                            <div className="home__categories__cont__row__category">
                                <h3>Montures</h3>
                                <div className="home__categories__cont__row__category__imgCont">
                                    <img src={montureImg} alt="une monture" />
                                </div>
                            </div>
                        </NavLink>
                        <NavLink to="/promotion">
                            <div className="home__categories__cont__row__category">
                                <h3>Promotions</h3>
                                <div className="home__categories__cont__row__category__imgCont">
                                    <img src={promoImg} alt="une promotion" />
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </section>
            <section className="home__promo">
                <h2>Nos promotions</h2>
                <div className="home__promo__promoCont">
                <ul>
                    {promoProduct.map(el => {
                        if(el.cat === "telescope") {
                            return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures[0]} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        } else if(el.cat === "oculaire") {
                            return <OculaireCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        } else if(el.cat === "monture") {
                            return <MontureCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        } 
                    })} 
                </ul>
                </div>
                <p className='home__promo__para'>Et bien d'autre encore !</p>
                <NavLink to="/promotion">
                    <button className='home__promo__btn'>Voir toutes les promotions</button>
                </NavLink>
            </section>
        </main>
    );
};

export default Home;