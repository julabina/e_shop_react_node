import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';

const Oculaire = () => {

    const dispatch = useDispatch();

    const [oculaireData, setOculaireData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: "", model: "", onStock : false});
    const [sort, setSort] = useState("");

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

        getOculairesList()

    },[])

    const getOculairesList = () => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/products/oculaires')
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
        });
    }

    const handleSort = (option) => {
        if (option === "ascName") {

        } else if (option === "descName") {

        } else if (option === "ascPrice") {

        } else if (option === "descPrice") {

        }
    }

    const handleFilter = (action, value) => {
        if (action === "sky") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "teleVue") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);    
        } else if (action === "celestron") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);           
        } else if (action === "orion") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "pentax") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "es") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "baader") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "model") {
            const newObj = {
                ...filterOptions,
                model : value
            }
            setFilterOptions(newObj);
        } else if (action === "onStock") {
            const newObj = {
                ...filterOptions,
                onStock : !filterOptions.onStock
            }
            setFilterOptions(newObj);
        } 
    }

    const getFilteredList = () => {
        window.scrollTo(0, 0);

        if(filterOptions.brand !== "" || filterOptions.model !== "" || filterOptions.onStock === true) {

            
            let brand = undefined, model = undefined, onStock;
            
            if(filterOptions.brand !== "") {
                brand = filterOptions.brand;
            }
            if(filterOptions.model !== "") {
                model = filterOptions.model
            }
            if(filterOptions.onStock) {
                onStock = true
            }
            
            fetch('http://localhost:3000/api/products/oculaires', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', 
                body: JSON.stringify({
                    brand: brand,
                    model: model,
                    onStock: onStock
                })
            })
            .then(res => res.json())
            .then(data => {
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
            } else {
                getOculairesList()
            }
    }

    const removeFilter = () => {
        const inputsBrand = document.getElementsByName('oculaireBrand');
        const stockInput = document.getElementById('oculaireOnStock');
        
        inputsBrand.forEach(el => {
            el.checked = false
        })
        stockInput.checked = false;

        let filter = {brand: "", model: "", onStock : false}
        setFilterOptions(filter);
        getOculairesList()
    }

    return (
        <main className='mainList'>
            <section className="oculaireFilter">
                <h2>Marque</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="radio" name="oculaireBrand" id="radioOculaireBrandSky" />
                        <label htmlFor="radioOculaireBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("teleVue", e.target.value)} value="TeleVue" type="radio" name="oculaireBrand" id="radioOculaireBrandTeleVue" />
                        <label htmlFor="radioOculaireBrandTeleVue">TeleVue</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="radio" name="oculaireBrand" id="radioOculaireBrandCelestron" />
                        <label htmlFor="radioOculaireBrandCelestron">Celestron</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("orion", e.target.value)} value="Orion" type="radio" name="oculaireBrand" id="radioOculaireBrandOrion" />
                        <label htmlFor="radioOculaireBrandOrion">Orion</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("pentax", e.target.value)} value="Pentax" type="radio" name="oculaireBrand" id="radioOculaireBrandPentax" />
                        <label htmlFor="radioOculaireBrandPentax">Pentax</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("es", e.target.value)} value="Explore Scientific" type="radio" name="oculaireBrand" id="radioOculaireBrandES" />
                        <label htmlFor="radioOculaireBrandES">Explore Scientific</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("baader", e.target.value)} value="Baader" type="radio" name="oculaireBrand" id="radioOculaireBrandBaader" />
                        <label htmlFor="radioOculaireBrandBaader">Baader</label>
                    </div>
                <div className="oculaireFilter__separator"></div>
                <h2>Modèle</h2>
                    {
                            filterOptions.brand === "Sky-Watcher" ? 
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="Super Plössl">Super Plössl</option>
                                </select>
                            : filterOptions.brand === "TeleVue" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                <option value="">Tous les modèles</option>
                                <option value="Plössl">Plössl</option>
                                <option value="DeLite">DeLite</option>
                                <option value="Ethos">Ethos</option>
                                <option value="Nagler">Nagler</option>
                                <option value="Delos">Delos</option>
                            </select>
                           : filterOptions.brand === "Celestron" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="X-cel">X-Cel</option>
                                    <option value="Luminos">Luminos</option>
                                </select>
                           : filterOptions.brand === "Orion" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="edge-On">Edge-On</option>
                                    <option value="Lanthanum">Lanthanum</option>
                                </select>
                           : filterOptions.brand === "Pentax" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="XW">XW</option>
                                </select>
                           : filterOptions.brand === "Explore Scientific" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="68°">68°</option>
                                    <option value="82°">82°</option>
                                    <option value="100°">100°</option>
                                </select>
                           : filterOptions.brand === "Baader" ? 
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="Hyperion">Hyperion</option>
                                </select>
                           :
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                </select>
                    }
                <div className="oculaireFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="">
                        <input onChange={() => handleFilter("onStock")} type="checkbox" id="oculaireOnStock" />
                        <label htmlFor="">Produits en stock</label>
                    </div>
                <div className="oculaireFilter__separator"></div>
                    <button onClick={getFilteredList} className='telescopesFilter__btn'>filtrer</button>
                    <button onClick={removeFilter} className='telescopesFilter__btn'>Reinitialiser filtres</button>
                <div className="telescopesFilter__separator"></div>
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