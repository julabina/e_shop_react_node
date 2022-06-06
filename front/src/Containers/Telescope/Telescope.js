import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Telescope = () => {

    const dispatch = useDispatch();

    const [telescopeData, setTelescopeData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: [], type: [], onStock : false});
    const [filterBrand, setFilterBrand] = useState([false, false, false, false])
    const [filterType, setFilterType] = useState([false, false, false, false, false, false])
    const [lastSeenData, setLastSeenData] = useState([]);
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

        getTelescopeslist();
        getLastSeen();
    }, []);

    const getTelescopeslist = () => {
        window.scrollTo(0, 0);

        fetch('http://localhost:3000/api/products/telescopes')
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
        setTelescopeData(newArr);
        });
    };

    const getLastSeen = () => {
        if (localStorage.getItem('lastSeen') !== null) {
            let lastSeenArr = JSON.parse(localStorage.getItem('lastSeen'));
            setLastSeenData(lastSeenArr);
        }
    }

    const handleSort = (option) => {
        if (option === "ascName") {

        } else if (option === "descName") {

        } else if (option === "ascPrice") {

        } else if (option === "descPrice") {

        }
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
        } else if (action === "takahashi") {
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
        } else if (action === "unistellar") {
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
        } else if (action === "achro") {
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
        } else if (action === "apo") {
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
        } else if (action === "newton") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[2] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[2] = !filterCtrl[2];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)        
        } else if (action === "mak") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[3] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[3] = !filterCtrl[3];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)          
        } else if (action === "edge") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[4] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[4] = !filterCtrl[4];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)          
        } else if (action === "sc") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[5] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.type.includes(value)){
                    newArr.push(value);
                }
            }
            filterCtrl[5] = !filterCtrl[5];
            const newObj = {
                ...filterOptions,
                type : newArr
            }
            setFilterOptions(newObj);
            setFilterType(filterCtrl)
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

        if(filterOptions.brand.length > 0 || filterOptions.type.length > 0 || filterOptions.onStock === true) {

            
            let brand = undefined, type = undefined, onStock;
            
            if(filterOptions.brand.length > 0) {
                brand = filterOptions.brand;
            }
            if(filterOptions.type.length > 0) {
                type = filterOptions.type
            }
            if(filterOptions.onStock) {
                onStock = true
            }
            
            fetch('http://localhost:3000/api/products/telescopes', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', 
                body: JSON.stringify({
                    brand: brand,
                    type: type,
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
                setTelescopeData(newArr);
                })
            } else {
                getTelescopeslist();
            }
    };
        
    const removeFilter = () => {
        const inputsBrand = document.getElementsByName('telescopeBrand');
        const inputsType = document.getElementsByName('telescopeType');
        const stockInput = document.getElementById('telescopeOnStock');
        
        inputsBrand.forEach(el => {
            el.checked = false
        })
        inputsType.forEach(el => {
            el.checked = false
        })
        stockInput.checked = false;

        let filter = {brand: [], type: [], onStock : false}
        setFilterOptions(filter);
        getTelescopeslist()
    };

    return (
        <main className='mainList'>
            <section className='telescopesFilter'>
                <h2>Marque</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandSky" />
                        <label htmlFor="checkboxTelescopeBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("takahashi", e.target.value)} value="Takahashi" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandTakahashi" />
                        <label htmlFor="checkboxTelescopeBrandTakahashi">Takahashi</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandCelestron" />
                        <label htmlFor="checkboxTelescopeBrandCelestron">Celestron</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("unistellar", e.target.value)} value="Unistellar" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandUnistellar" />
                        <label htmlFor="checkboxTelescopeBrandUnistellar">Unistellar</label>
                    </div>
                <div className="telescopesFilter__separator"></div>
                <h2>Type</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("achro", e.target.value)} value="lunette achromatique" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeAchro" />
                        <label htmlFor="checkboxTelescopeTypeAchro">Achromatique</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("apo", e.target.value)} value="lunette apochromatique" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeApo" />
                        <label htmlFor="checkboxTelescopeTypeApo">Apochromatique</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("newton", e.target.value)} value="telescope Newton" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeNewton" />
                        <label htmlFor="checkboxTelescopeTypeNewton">Newton</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("mak", e.target.value)} value="telescope Maksutov" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeMak" />
                        <label htmlFor="checkboxTelescopeTypeMak">Maksutov</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("edge", e.target.value)} value="telescope  edge HD" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeEdge" />
                        <label htmlFor="checkboxTelescopeTypeEdge">Edge HD</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("sc", e.target.value)} value="telescope Schmidt-Cassegrain" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeSC" />
                        <label htmlFor="checkboxTelescopeTypeSC">Schmidt-Cassegrain</label>
                    </div>
                    <div className="telescopesFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="">
                        <input onChange={() => handleFilter("onStock")} type="checkbox" id="telescopeOnStock" />
                        <label htmlFor="telescopeOnStock">Produits en stock</label>
                    </div>
                <div className="telescopesFilter__separator"></div>
                    <button onClick={getFilteredList} className='telescopesFilter__btn'>filtrer</button>
                    <button onClick={removeFilter} className='telescopesFilter__btn'>Reinitialiser filtres</button>
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
                <div className="telescopesList__separator"></div>
                <div className="telescopesList__bot">
                    {
                        lastSeenData.length !== 0
                        &&
                        <>
                            <h2 className='telescopesList__bot__title'>articles vus récemment</h2>
                            <ul className='telescopesList__bot__list'>
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

export default Telescope;