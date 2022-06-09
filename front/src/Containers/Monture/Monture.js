import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Monture = () => {

    const dispatch = useDispatch();

    const [montureData, setMontureData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: [], type: [], goTo: undefined, onStock : false});
    const [lastSeenData, setLastSeenData] = useState([]);
    const [filterBrand, setFilterBrand] = useState([false, false, false, false])
    const [filterType, setFilterType] = useState([false, false])
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

        getMonturesList(sortValue)
        getLastSeen();

    },[])

    const getMonturesList = (sort) => {
        window.scrollTo(0, 0);

        fetch('http://localhost:3000/api/products/montures')
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

            if(sort === "ascPrice") {
                newArr.sort((a, b) => a.price - b.price)
            } else if(sort === "descPrice") {
                newArr.sort((a, b) => b.price - a.price)
            } else if(sort === "descName") {
                newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
            } else if (sort === "ascName") {
                newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
            }

            setMontureData(newArr);
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
        getMonturesList(option);
    };

    const handleFilter = (action, value) => {
        if (action === "sky") {
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
                brand : newArr
            }
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl)
        } else if (action === "10Micron") {
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
                brand : newArr
            }
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl)   
        } else if (action === "celestron") {
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
                brand : newArr
            }
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl)          
        } else if (action === "orion") {
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
                brand : newArr
            }
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl)
        } else if (action === "azi") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[0] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[0] = !filterCtrl[0];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)
        } else if (action === "equa") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[1] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[1] = !filterCtrl[1];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)         
        } else if (action === "with") {
            const newObj = {
                ...filterOptions,
                goTo : true
            }
            setFilterOptions(newObj);        
        } else if (action === "withNot") {
            const newObj = {
                ...filterOptions,
                goTo : false
            }
            setFilterOptions(newObj);          
        } else if (action === "both") {
            const newObj = {
                ...filterOptions,
                goTo : undefined
            }
            setFilterOptions(newObj);          
        } else if (action === "onStock") {
            const newObj = {
                ...filterOptions,
                onStock : !filterOptions.onStock
            }
            setFilterOptions(newObj);
        } 
    };

    const getFilteredList = () => {
        window.scrollTo(0, 0);

        if(filterOptions.brand.length > 0 || filterOptions.type.length > 0 || filterOptions.goTo !== undefined || filterOptions.onStock === true) {

            
            let brand = undefined, type = undefined, goto = undefined, onStock;
            
            if(filterOptions.brand.length > 0) {
                brand = filterOptions.brand;
            }
            if(filterOptions.type.length > 0) {
                type = filterOptions.type
            }
            if(filterOptions.goTo !== undefined) {
                goto = filterOptions.goTo
            }
            if(filterOptions.onStock) {
                onStock = true
            }
            
            fetch('http://localhost:3000/api/products/montures', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', 
                body: JSON.stringify({
                    brand: brand,
                    type: type,
                    goTo: goto,
                    onStock: onStock
                })
            })
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
            } else {
                getMonturesList(sortValue);
            }
    }

    const removeFilter = () => {
        const inputsBrand = document.getElementsByName('mountBrand');
        const inputsType = document.getElementsByName('mountType');
        const inputsGoto = document.getElementsByName('mountGoto');
        const stockInput = document.getElementById('mountOnStock');
        
        inputsBrand.forEach(el => {
            el.checked = false
        })
        inputsType.forEach(el => {
            el.checked = false
        })
        inputsGoto.forEach(el => {
            el.checked = false
        })
        stockInput.checked = false;

        let filter = {brand: [], type: [], goTo: undefined, onStock : false}
        setFilterOptions(filter);
        getMonturesList(sortValue);
    }


    return (
        <main className='mainList'>
            <section className="montureFilter">
            <h2>Marque</h2>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="checkbox" name="mountBrand" id="checkboxMontureBrandSky" />
                        <label htmlFor="checkboxMontureBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("10Micron", e.target.value)} value="10Micron" type="checkbox" name="mountBrand" id="checkboxMontureBrand10Micron" />
                        <label htmlFor="checkboxMontureBrand10Micron">10Micron</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="checkbox" name="mountBrand" id="checkboxMontureBrandCelestron" />
                        <label htmlFor="checkboxMontureBrandCelestron">Celestron</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("orion", e.target.value)} value="Orion" type="checkbox" name="mountBrand" id="checkboxMontureBrandOrion" />
                        <label htmlFor="checkboxMontureBrandOrion">Orion</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>Type</h2>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("azi", e.target.value)} value="azimutale" type="checkbox" name="mountType" id="checkboxMontureTypeAzimutale" />
                        <label htmlFor="checkboxMontureTypeAzimutale">Azimutale</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("equa", e.target.value)} value="equatoriale" type="checkbox" name="mountType" id="checkboxMontureTypeEquatoriale" />
                        <label htmlFor="checkboxMontureTypeEquatoriale">Equatoriale</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>Goto</h2>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("both", e.target.value)} value="false" type="radio" name="mountGoto" id="radioMontureGotoBoth" />
                        <label htmlFor="radioMontureGotoBoth">Tous</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("with", e.target.value)} value="true" type="radio" name="mountGoto" id="radioMontureGotoWith" />
                        <label htmlFor="radioMontureGotoWith">Avec</label>
                    </div>
                    <div className="montureFilter__option">
                        <input onChange={(e) => handleFilter("withNot", e.target.value)} value="false" type="radio" name="mountGoto" id="radioMontureGotoWithNot" />
                        <label htmlFor="radioMontureGotoWithNot">Sans</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="montureFilter__option">
                        <input onChange={() => handleFilter("stock")} type="checkbox" id="mountOnStock" />
                        <label htmlFor="stockFilter">Produits en stock</label>
                    </div>
                <div className="montureFilter__separator"></div>
                    <button onClick={getFilteredList} className='telescopesFilter__btn'>filtrer</button>
                    <button onClick={removeFilter} className='telescopesFilter__btn'>Reinitialiser filtres</button>
                <div className="telescopesFilter__separator"></div>
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
                    {
                    montureData.length === 0 ?
                        <h3 className="montureList__noResult">Aucune monture ne correspond à la recherche</h3>
                        :
                    <ul>
                        {montureData.map(el => {
                            return <MontureCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                    }
                </div>
                <div className="montureList__separator"></div>
                <div className="montureList__bot">
                    {
                        lastSeenData.length !== 0
                        &&
                        <>
                            <h2 className='montureList__bot__title'>articles vus récemment</h2>
                            <ul className='montureList__bot__list'>
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

export default Monture;