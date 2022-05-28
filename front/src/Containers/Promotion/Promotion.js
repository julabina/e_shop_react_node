import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Promotion = () => {

    const dispatch = useDispatch();

    const [promoData, setPromoData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/products/promotion')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let newArr = [];
            for (let i = 0; i < data.data.length; i++) {
                if(data.data[i] !== undefined) {
                    const item = {
                        cat: data.data[i].Category.name,
                        name: data.data[i].name,
                        pictures: data.data[i].pictures,
                        price: data.data[i].price,
                        id: data.data[i].id,
                        promo: data.data[i].promo,
                        promoValue: data.data[i].promoValue,
                        stock: data.data[i].stock
                    }
                    newArr.push(item)
                }
            }
            console.log(newArr);
            setPromoData(newArr);
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

    const handleSort = (option) => {
        if (option === "ascName") {

        } else if (option === "descName") {

        } else if (option === "ascPrice") {

        } else if (option === "descPrice") {

        }
    }

    return (
        <main className='mainList'>
            <section className="promotionFilter">
                <h2>Marque</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>Modèle</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>Longueur focale</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>Champs apparent</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>Distance de l'oeil</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>Coulant</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
                <h2>En stock</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="promotionFilter__separator"></div>
            </section>
            <section className='promotionList'>
                <div className="promotionList__top">
                    <div className="promotionList__top__top">
                        <h2>Promotions</h2>
                        <div className="promotionList__top__top__pages"></div>
                    </div>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
                    </select>
                </div>
                <div className="promotionList__main">
                    <ul>
                        {promoData.map(el => {
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
                <div className="promotionList__bot">

                </div>
            </section>
        </main>
    );
};

export default Promotion;