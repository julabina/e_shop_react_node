import React, { useEffect, useState } from 'react';
import MontureCard from '../MontureCard/MontureCard';
import OculaireCard from '../OculaireCard/OculaireCard';
import TelescopeCard from '../TelescopeCard/TelescopeCard';

const LastSeen = () => {

    const [lastSeenData, setLastSeenData] = useState([]);

    useEffect(() => {
        getLastSeen()
    },[])

    const getLastSeen = () => {
        if (localStorage.getItem('lastSeen') !== null) {
            let lastSeenArr = JSON.parse(localStorage.getItem('lastSeen'));
            setLastSeenData(lastSeenArr);
        }
    }

    return (
        <div className='lastSeen__bot'>
            <h2 className='lastSeen__bot__title'>articles vus récemment</h2>
            <ul className='lastSeen__bot__list'>
                {lastSeenData.map(el => {
                    if(el.category === "telescope") {
                        return <TelescopeCard id={el.id} name={el.name} price={parseInt(el.price)} key={el.id} image={el.image} stock={parseInt(el.stock)} promo={el.promo} promoValue={parseInt(el.promoValue)} />
                    } else if(el.category === "oculaire") {
                        return <OculaireCard id={el.id} name={el.name} price={parseInt(el.price)} key={el.id} image={el.image} stock={parseInt(el.stock)} promo={el.promo} promoValue={parseInt(el.promoValue)} />
                    } else if(el.category === "monture") {
                        return <MontureCard id={el.id} name={el.name} price={parseInt(el.price)} key={el.id} image={el.image} stock={parseInt(el.stock)} promo={el.promo} promoValue={parseInt(el.promoValue)} />
                    } 
                })} 
            </ul>           
        </div>
    );
};

export default LastSeen;