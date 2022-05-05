import React, { useEffect, useState } from 'react';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';

const Telescope = () => {

    const [telescopeData, setTelescopeData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/telescopes')
        .then(res => res.json())
        .then(data => {
        console.log(data.data);
        let newArr = [];
        for (let i = 0; i < data.data.length; i++) {
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
        setTelescopeData(newArr);
        
    })
    }, [])

    return (
        <main>
            <section className='telescopesList'>
                <div className="telescopesList__top">
                    <div className="telescopesList__top__top">
                        <h2>Télescopes et Lunettes astronomiques</h2>
                        <div className="telescopesList__top__top__pages"></div>
                    </div>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
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