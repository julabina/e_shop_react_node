import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';

const Telescope = () => {

    const dispatch = useDispatch();

    const [telescopeData, setTelescopeData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: "", type: "", onStock : false});
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
        } else if (action === "takahashi") {
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
        } else if (action === "unistellar") {
            const newObj = {
                ...filterOptions,
                brand : value
            }
            setFilterOptions(newObj);
        } else if (action === "achro") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);
        } else if (action === "apo") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);         
        } else if (action === "newton") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);        
        } else if (action === "mak") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);          
        } else if (action === "edge") {
            const newObj = {
                ...filterOptions,
                type : value
            }
            setFilterOptions(newObj);          
        } else if (action === "sc") {
            const newObj = {
                ...filterOptions,
                type : value
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

        if(filterOptions.brand !== "" || filterOptions.type !== "" || filterOptions.onStock === true) {

            
            let brand = undefined, type = undefined, onStock;
            
            if(filterOptions.brand !== "") {
                brand = filterOptions.brand;
            }
            if(filterOptions.type !== "") {
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

        let filter = {brand: "", type: "", onStock : false}
        setFilterOptions(filter);
        getTelescopeslist()
    };

    return (
        <main className='mainList'>
            <section className='telescopesFilter'>
                <h2>Marque</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="radio" name="telescopeBrand" id="radioTelescopeBrandSky" />
                        <label htmlFor="radioTelescopeBrandSky">Sky-Watcher</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("takahashi", e.target.value)} value="Takahashi" type="radio" name="telescopeBrand" id="radioTelescopeBrandTakahashi" />
                        <label htmlFor="radioTelescopeBrandTakahashi">Takahashi</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="radio" name="telescopeBrand" id="radioTelescopeBrandCelestron" />
                        <label htmlFor="radioTelescopeBrandCelestron">Celestron</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("unistellar", e.target.value)} value="Unistellar" type="radio" name="telescopeBrand" id="radioTelescopeBrandUnistellar" />
                        <label htmlFor="radioTelescopeBrandUnistellar">Unistellar</label>
                    </div>
                <div className="telescopesFilter__separator"></div>
                <h2>Type</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("achro", e.target.value)} value="lunette achromatique" type="radio" name="telescopeType" id="radioTelescopeTypeAchro" />
                        <label htmlFor="radioTelescopeTypeAchro">Achromatique</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("apo", e.target.value)} value="lunette apochromatique" type="radio" name="telescopeType" id="radioTelescopeTypeApo" />
                        <label htmlFor="radioTelescopeTypeApo">Apochromatique</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("newton", e.target.value)} value="telescope Newton" type="radio" name="telescopeType" id="radioTelescopeTypeNewton" />
                        <label htmlFor="radioTelescopeTypeNewton">Newton</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("mak", e.target.value)} value="telescope Maksutov" type="radio" name="telescopeType" id="radioTelescopeTypeMak" />
                        <label htmlFor="radioTelescopeTypeMak">Maksutov</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("edge", e.target.value)} value="telescope  edge HD" type="radio" name="telescopeType" id="radioTelescopeTypeEdge" />
                        <label htmlFor="radioTelescopeTypeEdge">Edge HD</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("sc", e.target.value)} value="telescope Schmidt-Cassegrain" type="radio" name="telescopeType" id="radioTelescopeTypeSC" />
                        <label htmlFor="radioTelescopeTypeSC">Schmidt-Cassegrain</label>
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
                <div className="telescopesList__bot">

                </div>
            </section>
        </main>
    );
};

export default Telescope;