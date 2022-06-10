import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { useParams } from 'react-router-dom';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';
import LastSeen from '../../Components/LastSeen/LastSeen';

const Search = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const [resultData, setResultData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({categories:[], onStock: false});
    const [filterCat, setFilterCat] = useState([false, false, false]);
    const [sortValue, setSortValue] = useState("ascName");

    useEffect(() => {
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

        if (params.query) {
            getSearchList(sortValue)
            } else {
            setResultData([]);
        }

    },[params.query])

    const getSearchList = (sort) => {
        window.scrollTo(0, 0);

        fetch('http://localhost:3000/api/search?query=' + params.query)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    let newArr = [];
                    for (let i = 0; i < data.rows.length; i++) {
                        if(data.rows[i] !== undefined) {
                            const item = {
                                cat: data.rows[i].Category.name,
                                name: data.rows[i].name,
                                pictures: data.rows[i].pictures,
                                price: data.rows[i].price,
                                id: data.rows[i].id,
                                promo: data.rows[i].promo,
                                promoValue: data.rows[i].promoValue,
                                stock: data.rows[i].stock
                            }
                            newArr.push(item)
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

                    setResultData(newArr);
                })
    }

    const handleSort = (option) => {
        setSortValue(option);
        
        let newArr = resultData;

        if(option === "ascPrice") {
            newArr.sort((a, b) => a.price - b.price)
        } else if(option === "descPrice") {
            newArr.sort((a, b) => b.price - a.price)
        } else if(option === "descName") {
            newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
        } else if (option === "ascName") {
            newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        }

        setResultData(newArr)
    }

    const handleFilter = (action, value) => {
        if(action === "telescope") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[0] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.categories.includes(value)){
                    newArr.push(value);
                }
            }
            filteredCtrl[0] = !filteredCtrl[0];
            const newObj = {
                ...filterOptions,
                categories: newArr
            }
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl)
        } else if(action === "oculaire") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[1] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.categories.includes(value)){
                    newArr.push(value);
                }
            }
            filteredCtrl[1] = !filteredCtrl[1];
            const newObj = {
                ...filterOptions,
                categories: newArr
            }
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl)           
        } else if(action === "monture") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[2] === true) {
                let arrFiltered = newArr.filter(el => el !== value)
                newArr = arrFiltered;
            } else {
                if(!filterOptions.categories.includes(value)){
                    newArr.push(value);
                }
            }
            filteredCtrl[2] = !filteredCtrl[2];
            const newObj = {
                ...filterOptions,
                categories: newArr
            }
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl)
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

        if(filterOptions.categories.length > 0 || filterOptions.onStock === true) {

            
            let categories = undefined, onStock;
            
            if(filterOptions.categories.length > 0) {
                categories = filterOptions.categories;
            }
            if(filterOptions.onStock) {
                onStock = true
            }
            
            fetch('http://localhost:3000/api/search?query=' + params.query, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', 
                body: JSON.stringify({
                    categories: categories,
                    onStock: onStock
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let newArr = [];
                for (let i = 0; i < data.rows.length; i++) {
                    if(data.rows[i] !== undefined) {
                        const item = {
                            cat: data.rows[i].Category.name,
                            name: data.rows[i].name,
                            pictures: data.rows[i].pictures,
                            price: data.rows[i].price,
                            id: data.rows[i].id,
                            promo: data.rows[i].promo,
                            promoValue: data.rows[i].promoValue,
                            stock: data.rows[i].stock
                        }
                        newArr.push(item)
                    }
                }

                if(sortValue === "ascPrice") {
                    newArr.sort((a, b) => a.price - b.price)
                } else if(sortValue === "descPrice") {
                    newArr.sort((a, b) => b.price - a.price)
                } else if(sortValue === "descName") {
                    newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
                } else if (sortValue === "ascName") {
                    newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
                }

                setResultData(newArr);  
                })
            } else {
                getSearchList(sortValue);
            }
    }

    const removeFilter = () => {
        const inputCat = document.getElementsByName('searchCategory');

        inputCat.forEach(el => {
            el.checked = false
        })

        let filter = {categories: [], onStock: false}
        setFilterOptions(filter);
        getSearchList(sortValue)
    }

    return (
        <main className='mainList'>
            <section className='searchFilter'>
                <h2>Categorie</h2>
                    <div className="">
                        <input onChange={(e) => handleFilter("telescope", e.target.value)} value="telescope" type="checkbox" name="searchCategory" id="checkboxCatTelescope" />
                        <label htmlFor="checkboxCatTelescope">Telescope</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("oculaire", e.target.value)} value="oculaire" type="checkbox" name="searchCategory" id="checkboxCatOculaire" />
                        <label htmlFor="checkboxCatOculaire">Oculaire</label>
                    </div>
                    <div className="">
                        <input onChange={(e) => handleFilter("monture", e.target.value)} value="monture" type="checkbox" name="searchCategory" id="checkboxCatMonture" />
                        <label htmlFor="checkboxCatMonture">Monture</label>
                    </div>
                    <div className="searchFilter__separator"></div>
                <h2>En stock</h2>
                    <div className="">
                        <input onChange={() => handleFilter("onStock")} type="checkbox" id="telescopeOnStock" />
                        <label htmlFor="telescopeOnStock">Produits en stock</label>
                    </div>
                <div className="searchFilter__separator"></div>
                    <button onClick={getFilteredList} className='searchFilter__btn'>filtrer</button>
                    <button onClick={removeFilter} className='searchFilter__btn'>Reinitialiser filtres</button>
                <div className="searchFilter__separator"></div>
            </section>
            <section className='searchList'>
            { resultData.length > 0 ?
            <>
                <div className="searchList__top">
                    <div className="searchList__top__top">
                        <h2>Resultat de la recherche : <span className='searchList__spanQuery'>{params.query}</span></h2>
                        <div className="searchList__top__top__pages"></div>
                    </div>
            
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
                    </select>
                </div>
                <div className="searchList__main">
                    <ul>
                        {resultData.map(el => {
                            if(el.cat === "telescope") {
                                return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures[0]} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } else if(el.cat === "oculaire") {
                                return <OculaireCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } else if(el.cat === "monture") {
                                return <MontureCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } 
                        })} 
                    </ul>
                </div>
                <div className="searchList__bot">

                </div>
            </>
            :
            <>
                <div className="searchList__top">
                    <div className="searchList__top__top">
                        <h2>Resultat de la recherche : <span className='searchList__spanQuery'>{params.query}</span></h2>
                        <div className="searchList__top__top__pages"></div>
                    </div>
                </div>
                <div className='searchList__noResult'>
                    <h3>Aucun resultat</h3>
                </div>
            </>
            }
            <div className="searchList__separator"></div>
            <LastSeen />
            </section>
        </main>
    );
};

export default Search;