import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Monture = () => {

    const dispatch = useDispatch();

    const [montureData, setMontureData] = useState([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);

        fetch('http://localhost:3000/api/montures')
        .then(res => res.json())
        .then(data => {
            let newArr = [];
            for (let i = 0; i < data.data.length; i++) {
                if (data.data[i] !== undefined) {
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
            setMontureData(newArr);
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
            <section className="montureFilter">
                <h2>Marque</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="montureFilter__separator"></div>
                <h2>Type</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="montureFilter__separator"></div>
                <h2>Capacité de charge</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="montureFilter__separator"></div>
                <h2>Goto</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="montureFilter__separator"></div>
                <h2>En stock</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="montureFilter__separator"></div>
            </section>
            <section className='montureList'>
                <div className="montureList__top">
                    <div className="montureList__top__top">
                        <h2>Montures</h2>
                        <div className="montureList__top__top__pages"></div>
                    </div>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
                    </select>
                </div>
                <div className="montureList__main">
                    <ul>
                        {montureData.map(el => {
                            return <MontureCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                </div>
                <div className="montureList__bot">

                </div>
            </section>
        </main>
    );
};

export default Monture;