import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import MontureCard from '../../Components/MontureCard/MontureCard';

const Monture = () => {

    const dispatch = useDispatch();

    const [montureData, setMontureData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: "", type: "", goTo: undefined, onStock : false});
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

        getMonturesList()

    },[])

    const getMonturesList = () => {
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
            setMontureData(newArr);
        });
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
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "10Micron") {
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
        } else if (action === "azi") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);
        } else if (action === "equa") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);         
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

        if(filterOptions.brand !== "" || filterOptions.type !== "" || filterOptions.goTo !== undefined || filterOptions.onStock === true) {

            
            let brand = undefined, type = undefined, goto = undefined, onStock;
            
            if(filterOptions.brand !== "") {
                brand = filterOptions.brand;
            }
            if(filterOptions.type !== "") {
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
                getMonturesList();
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

        let filter = {brand: "", type: "", onStock : false}
        setFilterOptions(filter);
        getMonturesList();
    }


    return (
        <main className='mainList'>
            <section className="montureFilter">
            <h2>Marque</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="radio" name="mountBrand" id="radioMontureBrandSky" />
                        <label htmlFor="radioMontureBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("10Micron", e.target.value)} value="10Micron" type="radio" name="mountBrand" id="radioMontureBrand10Micron" />
                        <label htmlFor="radioMontureBrand10Micron">10Micron</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="radio" name="mountBrand" id="radioMontureBrandCelestron" />
                        <label htmlFor="radioMontureBrandCelestron">Celestron</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("orion", e.target.value)} value="Orion" type="radio" name="mountBrand" id="radioMontureBrandOrion" />
                        <label htmlFor="radioMontureBrandOrion">Orion</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>Type</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("azi", e.target.value)} value="azimutale" type="radio" name="mountType" id="radioMontureTypeAzimutale" />
                        <label htmlFor="radioMontureTypeAzimutale">Azimutale</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("equa", e.target.value)} value="equatorial" type="radio" name="mountType" id="radioMontureTypeEquatoriale" />
                        <label htmlFor="radioMontureTypeEquatoriale">Equatoriale</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>Goto</h2>
                <div className="">
                        <input onChange={(e) => handleFilter("with", e.target.value)} value="true" type="radio" name="mountGoto" id="radioMontureGotoWith" />
                        <label htmlFor="radioMontureGotoWith">Avec</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("withNot", e.target.value)} value="false" type="radio" name="mountGoto" id="radioMontureGotoWithNot" />
                        <label htmlFor="radioMontureGotoWithNot">Sans</label>
                    </div>
                <div className="montureFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="">
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