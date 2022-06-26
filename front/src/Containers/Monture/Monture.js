import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import MontureCard from '../../Components/MontureCard/MontureCard';
import LastSeen from '../../Components/LastSeen/LastSeen';
import { Helmet } from 'react-helmet';

const Monture = () => {

    const dispatch = useDispatch();

    const [montureData, setMontureData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: [], type: [], goTo: undefined, onStock : false});
    const [filterBrand, setFilterBrand] = useState([false, false, false, false]);
    const [filterType, setFilterType] = useState([false, false]);
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

        getMonturesList(sortValue)

    },[]);

    /**
     * GET ALL MONTURE PRODUCTS
     * @param {*} sort 
     */
    const getMonturesList = (sort) => {

        window.scrollTo(0, 0);

        fetch('https://api-e-commerce.julienlenfume.com/api/products/montures')
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

                setMontureData(newArr);
            });
    }

    /**
     * SORTING FUNCTION FOR PRODUCTS
     * @param {*} option 
     */
    const handleSort = (option) => {
        setSortValue(option);
        
        let newArr = montureData;

        if(option === "ascPrice") {
            newArr.sort((a, b) => a.price - b.price);
        } else if(option === "descPrice") {
            newArr.sort((a, b) => b.price - a.price);
        } else if(option === "descName") {
            newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
        } else if (option === "ascName") {
            newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        }

        setMontureData(newArr);
    };

    /**
     * CONTROL FILTERS INPUTS
     * @param {*} action 
     * @param {*} value 
     */
    const handleFilter = (action, value) => {

        if (action === "sky") {
            let newArr = filterOptions.brand;
            let filterCtrl = filterBrand;
            if(filterCtrl[0] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl);
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
            };
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl); 
        } else if (action === "celestron") {
            let newArr = filterOptions.brand;
            let filterCtrl = filterBrand;
            if(filterCtrl[2] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl);         
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
            };
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl);
        } else if (action === "azi") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[0] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);
        } else if (action === "equa") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[1] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);        
        } else if (action === "with") {
            const newObj = {
                ...filterOptions,
                goTo : true
            };
            setFilterOptions(newObj);        
        } else if (action === "withNot") {
            const newObj = {
                ...filterOptions,
                goTo : false
            };
            setFilterOptions(newObj);          
        } else if (action === "both") {
            const newObj = {
                ...filterOptions,
                goTo : undefined
            };
            setFilterOptions(newObj);          
        } else if (action === "stock") {
            const newObj = {
                ...filterOptions,
                onStock : !filterOptions.onStock
            };
            setFilterOptions(newObj);
        } 
    };

    /**
     * GET FILTERED MONTURE PRODUCTS
     */
    const getFilteredList = () => {

        window.scrollTo(0, 0);
        const filterMenu = document.querySelector('.montureFilter');

        if(filterOptions.brand.length > 0 || filterOptions.type.length > 0 || filterOptions.goTo !== undefined || filterOptions.onStock === true) {

            
            let brand = undefined, type = undefined, goto = undefined, onStock;
            
            if(filterOptions.brand.length > 0) {
                brand = filterOptions.brand;
            }
            if(filterOptions.type.length > 0) {
                type = filterOptions.type;
            }
            if(filterOptions.goTo !== undefined) {
                goto = filterOptions.goTo;
            }
            if(filterOptions.onStock) {
                onStock = true;
            }

            
            fetch('https://api-e-commerce.julienlenfume.com/api/products/montures', {
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

                    setMontureData(newArr);
                })
            } else {
                getMonturesList(sortValue);
            }
            filterMenu.classList.add('montureFilter--hidden');
    };

    /**
     * RESET FILTERS
     */
    const removeFilter = () => {

        const inputsBrand = document.getElementsByName('mountBrand');
        const inputsType = document.getElementsByName('mountType');
        const inputsGoto = document.getElementsByName('mountGoto');
        const stockInput = document.getElementById('mountOnStock');
        const filterMenu = document.querySelector('.montureFilter');
        
        inputsBrand.forEach(el => {
            el.checked = false;
        })
        inputsType.forEach(el => {
            el.checked = false;
        })
        inputsGoto.forEach(el => {
            el.checked = false;
        })
        stockInput.checked = false;

        let filter = {brand: [], type: [], goTo: undefined, onStock : false};
        filterMenu.classList.add('montureFilter--hidden');
        setFilterBrand([false, false, false, false]);
        setFilterType([false, false]);
        setFilterOptions(filter);
        getMonturesList(sortValue);
    };

    /**
     * ON MOBILE VERSION, DISPLAY FILTERS MENU
     */
     const displayFilters = () => {

        const filter = document.querySelector('.montureFilter');

        if(filter.classList.contains('montureFilter--hidden')) {
            filter.classList.remove('montureFilter--hidden');
        } else {
            filter.classList.add('montureFilter--hidden');
        }
    };

    return (
        <>
        <Helmet>
            <title>Montures - React optique shop</title>
            <meta name="title" content="Montures - React optique shop" />
            <meta
            name="description"
            content="Vous trouverez une liste de toute les montures disponible."
            />
        </Helmet>
        <main className='mainList'>
            <button onClick={displayFilters} className='mobileFilterHide'>Afficher les filtres</button>
            <section className="montureFilter montureFilter--hidden">
            <div className='montureFilter__optionsCont'>
                <div className="montureFilter__optionsCont__filter">
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
                </div>
                <div className="montureFilter__optionsCont__filter">    
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
                </div>
                <div className="montureFilter__optionsCont__filter">
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
                </div>
                <div className="montureFilter__optionsCont__filter">
                    <h2>En stock</h2>
                        <div className="montureFilter__option">
                            <input onChange={() => handleFilter("stock")} type="checkbox" id="mountOnStock" />
                            <label htmlFor="stockFilter">Produits en stock</label>
                        </div>
                </div>        
                </div>
                <div className="montureFilter__btnCont">
                    <div className="montureFilter__separator"></div>
                        <button onClick={getFilteredList} className='montureFilter__btn'>filtrer</button>
                        <button onClick={removeFilter} className='montureFilter__btn'>Reinitialiser filtres</button>
                    <div className="montureFilter__separator"></div>
                </div>
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
                <LastSeen />
            </section>
        </main>
        </>
    );
};

export default Monture;