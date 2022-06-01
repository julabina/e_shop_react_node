import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';

const Telescope = () => {

    const dispatch = useDispatch();

    const [telescopeData, setTelescopeData] = useState([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/products/telescopes')
        .then(res => res.json())
        .then(data => {
        console.log(data.data);
        let newArr = [];
        for (let i = 0; i < data.data.length; i++) {
            if(data.data[i] !== undefined) {
                let item = {
                    name: data.data[i].name,
                    pictures: data.data[i].pictures,
                    price: data.data[i].price,
                    id: data.data[i].id,
                    promo: data.data[i].promo,
                    promoValue: data.data[i].promoValue,
                    stock: data.data[i].stock
                }
                newArr.push(item);
            }
        }
        setTelescopeData(newArr);
        
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

    }, [])

    const handleSort = (option) => {
        if (option === "ascName") {

        } else if (option === "descName") {

        } else if (option === "ascPrice") {

        } else if (option === "descPrice") {

        }
    }

    return (
        <main className='mainList'>
            <section className='telescopesFilter'>
                <h2>Marque</h2>
                    <div className="">
                        <input type="radio" name="telescopeBrand" id="" />
                        <label htmlFor="">Sky-Watcher</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeBrand" id="" />
                        <label htmlFor="">Takahashi</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeBrand" id="" />
                        <label htmlFor="">Celestron</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeBrand" id="" />
                        <label htmlFor="">Unistellar</label>
                    </div>
                <div className="telescopesFilter__separator"></div>
                <h2>Type</h2>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">achromatique</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">apochromatique</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">Newton</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">Maksutov</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">edge HD</label>
                    </div>
                    <div className="">
                        <input type="radio" name="telescopeType" id="" />
                        <label htmlFor="">Schmidt-Cassegrain</label>
                    </div>
                    <div className="telescopesFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="">
                        <input type="checkbox" id="" />
                        <label htmlFor="">Produits en stock</label>
                    </div>
                <div className="telescopesFilter__separator"></div>
            </section>
            <section className='telescopesList'>
                <div className="telescopesList__top">
                    <div className="telescopesList__top__top">
                        <h2>Télescopes et Lunettes astronomiques</h2>
                        <div className="telescopesList__top__top__pages"></div>
                    </div>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
                    </select>
                </div>
                <div className="telescopesList__main">
                    <ul>
                        {telescopeData.map(el => {
                            return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures[0]} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                </div>
                <div className="telescopesList__bot">

                </div>
            </section>
        </main>
    );
};

export default Telescope;