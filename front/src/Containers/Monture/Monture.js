import React, { useEffect, useState } from 'react';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Monture = () => {
    const [montureData, setMontureData] = useState([]);

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
        })
    },[])

    return (
        <main>
            <section className='montureList'>
                <div className="montureList__top">
                    <div className="montureList__top__top">
                        <h2>Montures</h2>
                        <div className="montureList__top__top__pages"></div>
                    </div>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
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