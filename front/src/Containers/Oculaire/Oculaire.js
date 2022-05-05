import React, { useEffect, useState } from 'react';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';

const Oculaire = () => {

    const [oculaireData, setOculaireData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/oculaires')
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
            setOculaireData(newArr);
        })
    },[])

    return (
        <main>
            <section className='oculaireList'>
                <div className="oculaireList__top">
                    <div className="oculaireList__top__top">
                        <h2>Oculaires</h2>
                        <div className="oculaireList__top__top__pages"></div>
                    </div>
                    <select name="" id="">
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                </div>
                <div className="oculaireList__main">
                    <ul>
                        {oculaireData.map(el => {
                            return <OculaireCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                </div>
                <div className="oculaireList__bot">

                </div>
            </section>
        </main>
    );
};

export default Oculaire;