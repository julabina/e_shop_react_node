import React, { useEffect, useState } from 'react';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';

const Oculaire = () => {

    const [oculaireData, setOculaireData] = useState([]);
    const [sort, setSort] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/oculaires')
        .then(res => res.json())
        .then(data => {
            console.log(data);
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
            setOculaireData(newArr);
        })
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
            <section className="oculaireFilter">
                <h2>Marque</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>Modèle</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>Longueur focale</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>Champs apparent</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>Distance de l'oeil</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>Coulant</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
                <h2>En stock</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="oculaireFilter__separator"></div>
            </section>
            <section className='oculaireList'>
                <div className="oculaireList__top">
                    <div className="oculaireList__top__top">
                        <h2>Oculaires</h2>
                        <div className="oculaireList__top__top__pages"></div>
                    </div>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
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