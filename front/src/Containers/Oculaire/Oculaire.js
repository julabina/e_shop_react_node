import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Oculaire = () => {

    const dispatch = useDispatch();

    const [oculaireData, setOculaireData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: [], model: "", onStock : false});
    const [filterBrand, setFilterBrand] = useState([false, false, false, false, false, false, false])
    const [optionChoice, setOptionChoice] = useState(false)
    const [lastSeenData, setLastSeenData] = useState([]);
    const [sortValue, setSortValue] = useState("ascName");

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

        getOculairesList(sortValue)
        getLastSeen();

    },[])

    const getOculairesList = (sort) => {
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

            if(sort === "ascPrice") {
                newArr.sort((a, b) => a.price - b.price)
            } else if(sort === "descPrice") {
                newArr.sort((a, b) => b.price - a.price)
            } else if(sort === "descName") {
                newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
            } else if (sort === "ascName") {
                newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
            }

            setOculaireData(newArr);
        });
    }

    const getLastSeen = () => {
        if (localStorage.getItem('lastSeen') !== null) {
            let lastSeenArr = JSON.parse(localStorage.getItem('lastSeen'));
            setLastSeenData(lastSeenArr);
        }
    }

    const handleSort = (option) => {
        setSortValue(option);
        getOculairesList(option);
    }

    const handleFilter = (action, value) => {
        if (action === "sky") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[0] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[0] = !filterCtrl[0];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }
        } else if (action === "teleVue") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[1] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[1] = !filterCtrl[1];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }   
        } else if (action === "celestron") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[2] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[2] = !filterCtrl[2];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }          
        } else if (action === "orion") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[3] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[3] = !filterCtrl[3];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }
        } else if (action === "pentax") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[4] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[4] = !filterCtrl[4];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }
        } else if (action === "es") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[5] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[5] = !filterCtrl[5];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }
        } else if (action === "baader") {
            if(optionChoice) {
                const newObj = {
                    ...filterOptions,
                    brand : [value]
                }
                setFilterOptions(newObj);
            } else {
                let newArr = filterOptions.brand;
                let filterCtrl = filterBrand;
                if(filterCtrl[6] === true) {
                    let arrFiltered = newArr.filter(el => el !== value)
                    newArr = arrFiltered;
                } else {
                    if(!filterOptions.brand.includes(value)){
                        newArr.push(value);
                    }
                }
                filterCtrl[6] = !filterCtrl[6];
                const newObj = {
                    ...filterOptions,
                    brand : newArr,
                    model: ""
                }
                setFilterOptions(newObj);
                setFilterBrand(filterCtrl);
            }
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

        if(filterOptions.brand.length > 0 || filterOptions.model !== "" || filterOptions.onStock === true) {
            
            let brand = undefined, model = undefined, onStock;
            
            if(filterOptions.brand.length > 0) {
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
                getOculairesList(sortValue)
            }
    }

    const removeFilter = () => {
        const inputsBrand = document.getElementsByName('oculaireBrand');
        const stockInput = document.getElementById('oculaireOnStock');
        
        inputsBrand.forEach(el => {
            el.checked = false
        })
        stockInput.checked = false;

        let filter = {brand: [], model: "", onStock : false}
        setFilterOptions(filter);
        getOculairesList(sortValue)
    }

    const toggleOptionChoice = () => {
        setOptionChoice(!optionChoice);
    }

    return (
        <main className='mainList'>
            <section className="oculaireFilter">
                {
                    optionChoice ?
                    <button className='oculaireFilter__btn' onClick={toggleOptionChoice}>Sélectionner marques</button>
                    :
                    <button className='oculaireFilter__btn' onClick={toggleOptionChoice}>Sélectionner modèle</button>
                    
                }
                <div className="oculaireFilter__separator"></div>
                <h2>Marque</h2>
                {
                    optionChoice ?
                    <>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="radio" name="oculaireBrand" id="radioOculaireBrandSky" />
                        <label htmlFor="radioOculaireBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("teleVue", e.target.value)} value="TeleVue" type="radio" name="oculaireBrand" id="radioOculaireBrandTeleVue" />
                        <label htmlFor="radioOculaireBrandTeleVue">TeleVue</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="radio" name="oculaireBrand" id="radioOculaireBrandCelestron" />
                        <label htmlFor="radioOculaireBrandCelestron">Celestron</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("orion", e.target.value)} value="Orion" type="radio" name="oculaireBrand" id="radioOculaireBrandOrion" />
                        <label htmlFor="radioOculaireBrandOrion">Orion</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("pentax", e.target.value)} value="Pentax" type="radio" name="oculaireBrand" id="radioOculaireBrandPentax" />
                        <label htmlFor="radioOculaireBrandPentax">Pentax</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("es", e.target.value)} value="Explore Scientific" type="radio" name="oculaireBrand" id="radioOculaireBrandES" />
                        <label htmlFor="radioOculaireBrandES">Explore Scientific</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("baader", e.target.value)} value="Baader" type="radio" name="oculaireBrand" id="radioOculaireBrandBaader" />
                        <label htmlFor="radioOculaireBrandBaader">Baader</label>
                    </div>
                <div className="oculaireFilter__separator"></div>
                <h2>Modèle</h2>
                    {
                            filterOptions.brand[0] === "Sky-Watcher" ? 
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="Super Plössl">Super Plössl</option>
                                </select>
                            : filterOptions.brand[0] === "TeleVue" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                <option value="">Tous les modèles</option>
                                <option value="Plössl">Plössl</option>
                                <option value="DeLite">DeLite</option>
                                <option value="Ethos">Ethos</option>
                                <option value="Nagler">Nagler</option>
                                <option value="Delos">Delos</option>
                            </select>
                           : filterOptions.brand[0] === "Celestron" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="X-cel">X-Cel</option>
                                    <option value="Luminos">Luminos</option>
                                </select>
                           : filterOptions.brand[0] === "Orion" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="edge-On">Edge-On</option>
                                    <option value="Lanthanum">Lanthanum</option>
                                </select>
                           : filterOptions.brand[0] === "Pentax" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="XW">XW</option>
                                </select>
                           : filterOptions.brand[0] === "Explore Scientific" ?
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="68°">68°</option>
                                    <option value="82°">82°</option>
                                    <option value="100°">100°</option>
                                </select>
                           : filterOptions.brand[0] === "Baader" ? 
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                    <option value="Hyperion">Hyperion</option>
                                </select>
                           :
                                <select onChange={(e) => handleFilter("model", e.target.value)} id="modelSelect">
                                    <option value="">Tous les modèles</option>
                                </select>
                    }
                    </>
                    :
                    <>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandSky" />
                        <label htmlFor="checkboxOculaireBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("teleVue", e.target.value)} value="TeleVue" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandTeleVue" />
                        <label htmlFor="checkboxOculaireBrandTeleVue">TeleVue</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandCelestron" />
                        <label htmlFor="checkboxOculaireBrandCelestron">Celestron</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("orion", e.target.value)} value="Orion" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandOrion" />
                        <label htmlFor="checkboxOculaireBrandOrion">Orion</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("pentax", e.target.value)} value="Pentax" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandPentax" />
                        <label htmlFor="checkboxOculaireBrandPentax">Pentax</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("es", e.target.value)} value="Explore Scientific" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandES" />
                        <label htmlFor="checkboxOculaireBrandES">Explore Scientific</label>
                    </div>
                    <div className="oculaireFilter__option">
                        <input onChange={(e) => handleFilter("baader", e.target.value)} value="Baader" type="checkbox" name="oculaireBrand" id="checkboxOculaireBrandBaader" />
                        <label htmlFor="checkboxOculaireBrandBaader">Baader</label>
                    </div>
                    </>
                }
                <div className="oculaireFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="oculaireFilter__option">
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
                    {
                     oculaireData.length === 0 ?
                     <h3 className="oculaireList__noResult">Aucun oculaire ne correspond à la recherche</h3>
                     :
                     <ul>
                        {oculaireData.map(el => {
                            return <OculaireCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                    }
                </div>
                <div className="oculaireList__separator"></div>
                <div className="oculaireList__bot">
                    {
                        lastSeenData.length !== 0
                        &&
                        <>
                            <h2 className='oculaireList__bot__title'>articles vus récemment</h2>
                            <ul className='oculaireList__bot__list'>
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
                        </>
                    }
                </div>
            </section>
        </main>
    );
};

export default Oculaire;