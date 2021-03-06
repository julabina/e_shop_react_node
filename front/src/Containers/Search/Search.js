import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { useParams } from 'react-router-dom';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';
import LastSeen from '../../Components/LastSeen/LastSeen';
import { Helmet } from 'react-helmet';

const Search = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const [resultData, setResultData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({categories:[], onStock: false});
    const [filterCat, setFilterCat] = useState([false, false, false]);
    const [sortValue, setSortValue] = useState("ascName");
    const [toggleFilterBtn, setToggleFilterBtn] = useState(false);

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
                    });
                    localStorage.removeItem('token');
                };
                dispatch ({
                    type: 'LOG'
                });
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
        }; 

        if (params.query) {
            getSearchList(sortValue);
            } else {
            setResultData([]);
        }

    },[params.query]);

    /**
     * GET SEEKED PRODUCTS
     * @param {*} sort 
     */
    const getSearchList = (sort) => {

        window.scrollTo(0, 0);

        fetch('https://api-e-commerce.julienlenfume.com/api/search?query=' + params.query)
                .then(res => res.json())
                .then(data => {
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
                            };
                            newArr.push(item);
                        }
                    }

                    if(sort === "ascPrice") {
                        newArr.sort((a, b) => a.price - b.price);
                    } else if(sort === "descPrice") {
                        newArr.sort((a, b) => b.price - a.price);
                    } else if(sort === "descName") {
                        newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
                    } else if (sort === "ascName") {
                        newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
                    }

                    setResultData(newArr);
                })
    }

    /**
     * SORT SEEKED PRODUCTS
     * @param {*} option 
     */
    const handleSort = (option) => {

        setSortValue(option);
        
        let newArr = resultData;

        if(option === "ascPrice") {
            newArr.sort((a, b) => a.price - b.price);
        } else if(option === "descPrice") {
            newArr.sort((a, b) => b.price - a.price);
        } else if(option === "descName") {
            newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
        } else if (option === "ascName") {
            newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        }

        setResultData(newArr);
    }

    /**
     * CONTROL INPUTS
     * @param {*} action 
     * @param {*} value 
     */
    const handleFilter = (action, value) => {
        if(action === "telescope") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[0] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl);
        } else if(action === "oculaire") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[1] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl);           
        } else if(action === "monture") {
            let newArr = filterOptions.categories;
            let filteredCtrl = filterOptions;
            if(filterOptions[2] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterCat(filteredCtrl);
        } else if (action === "onStock") {
            const newObj = {
                ...filterOptions,
                onStock : !filterOptions.onStock
            };
            setFilterOptions(newObj);
        } 
    }

    /**
     * GET FILTERED SEEKD PRODUCTS
     */
    const getFilteredList = () => {

        window.scrollTo(0, 0);
        const filterMenu = document.querySelector('.searchFilter');

        if(filterOptions.categories.length > 0 || filterOptions.onStock === true) {

            
            let categories = undefined, onStock;
            
            if(filterOptions.categories.length > 0) {
                categories = filterOptions.categories;
            }
            if(filterOptions.onStock) {
                onStock = true;
            }
            
            fetch('https://api-e-commerce.julienlenfume.com/api/search?query=' + params.query, {
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
                            };
                            newArr.push(item);
                        }
                    }

                    if(sortValue === "ascPrice") {
                        newArr.sort((a, b) => a.price - b.price);
                    } else if(sortValue === "descPrice") {
                        newArr.sort((a, b) => b.price - a.price);
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
            filterMenu.classList.add('searchFilter--hidden');
    };

    /**
     * RESET FILTER
     */
    const removeFilter = () => {
        const inputCat = document.getElementsByName('searchCategory');
        const onStockFilter = document.getElementById('telescopeOnStock');
        const filterMenu = document.querySelector('.searchFilter');

        inputCat.forEach(el => {
            el.checked = false;
        })
        onStockFilter.checked = false;

        let filter = {categories: [], onStock: false};
        filterMenu.classList.add('searchFilter--hidden');
        setFilterOptions(filter);
        setFilterCat([false, false, false]);
        getSearchList(sortValue);
    };

    /**
     * ON MOBILE VERSION, DISPLAY FILTERS MENU
     */
     const displayFilters = () => {

        const filter = document.querySelector('.searchFilter');

        if(filter.classList.contains('searchFilter--hidden')) {
            filter.classList.remove('searchFilter--hidden');
            setToggleFilterBtn(true);
        } else {
            filter.classList.add('searchFilter--hidden');
            setToggleFilterBtn(false);
        }
    };

    return (
        <>
        <Helmet>
            <title>Recherche - React optique shop</title>
            <meta name="title" content="Recherche - React optique shop" />
            <meta
            name="description"
            content="Vous trouverez une liste des produits trouv??s grace au formulaire de recherche."
            />
        </Helmet>
        <main className='mainList'>
            {
                toggleFilterBtn ?
                <button onClick={displayFilters} className='mobileFilterHide'>Cacher les filtres</button>
                :
                <button onClick={displayFilters} className='mobileFilterHide'>Afficher les filtres</button>
            }
            <section className='searchFilter searchFilter--hidden'>
            <div className='searchFilter__optionsCont'>
                <div className="searchFilter__optionsCont__filter">
                    <h2>Categorie</h2>
                        <div className="searchFilter__option">
                            <input onChange={(e) => handleFilter("telescope", e.target.value)} value="telescope" type="checkbox" name="searchCategory" id="checkboxCatTelescope" />
                            <label htmlFor="checkboxCatTelescope">Telescope</label>
                        </div>
                        <div className="searchFilter__option">
                            <input onChange={(e) => handleFilter("oculaire", e.target.value)} value="oculaire" type="checkbox" name="searchCategory" id="checkboxCatOculaire" />
                            <label htmlFor="checkboxCatOculaire">Oculaire</label>
                        </div>
                        <div className="searchFilter__option">
                            <input onChange={(e) => handleFilter("monture", e.target.value)} value="monture" type="checkbox" name="searchCategory" id="checkboxCatMonture" />
                            <label htmlFor="checkboxCatMonture">Monture</label>
                        </div>
                        <div className="searchFilter__separator"></div>
                </div>
                <div className="searchFilter__optionsCont__filter">
                    <h2>En stock</h2>
                        <div className="searchFilter__option">
                            <input onChange={() => handleFilter("onStock")} type="checkbox" id="telescopeOnStock" />
                            <label htmlFor="telescopeOnStock">Produits en stock</label>
                        </div>
                </div>
            </div>
            <div className='searchFilter__btnCont'>
                <div className="searchFilter__separator"></div>
                    <button onClick={getFilteredList} className='searchFilter__btn'>filtrer</button>
                    <button onClick={removeFilter} className='searchFilter__btn'>Reinitialiser filtres</button>
                <div className="searchFilter__separator"></div>
            </div>
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
                        <option defaultChecked value="ascName">Trier par ordre alphab??tique croissant</option>
                        <option value="descName">Trier par ordre alphab??tique d??croissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix d??croissant</option>
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
        </>
    );
};

export default Search;