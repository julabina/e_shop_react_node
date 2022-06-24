import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import LastSeen from '../../Components/LastSeen/LastSeen';

const Telescope = () => {

    const dispatch = useDispatch();

    const [telescopeData, setTelescopeData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({brand: [], type: [], onStock : false});
    const [filterBrand, setFilterBrand] = useState([false, false, false, false]);
    const [filterType, setFilterType] = useState([false, false, false, false, false, false]);
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

        getTelescopeslist(sortValue);

    }, []);

    /**
     * GET TELESCOPES PRODUCTS
     * @param {*} sort 
     */
    const getTelescopeslist = (sort) => {

        window.scrollTo(0, 0);

        fetch('https://api-e-commerce.julienlenfume.com/api/products/telescopes')
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
                
                setTelescopeData(newArr);
            });
    };

    /**
     * SORTING FUNCTION FOR PRODUCTS
     * @param {*} option 
     */
    const handleSort = (option) => {

        setSortValue(option);

        let newArr = telescopeData;

        if(option === "ascPrice") {
            newArr.sort((a, b) => a.price - b.price);
        } else if(option === "descPrice") {
            newArr.sort((a, b) => b.price - a.price);
        } else if(option === "descName") {
            newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
        } else if (option === "ascName") {
            newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        }
        
        setTelescopeData(newArr);

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
        } else if (action === "takahashi") {
            let newArr = filterOptions.brand;
            let filterCtrl = filterBrand;
            if(filterCtrl[1] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            setFilterBrand(filterCtrl) ;   
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
            };
            setFilterOptions(newObj);
            setFilterBrand(filterCtrl);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);      
        } else if (action === "newton") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[2] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);   
        } else if (action === "mak") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[3] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);          
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);          
        } else if (action === "sc") {
            let newArr = filterOptions.type;
            let filterCtrl = filterType;
            if(filterCtrl[5] === true) {
                let arrFiltered = newArr.filter(el => el !== value);
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
            };
            setFilterOptions(newObj);
            setFilterType(filterCtrl);
        } else if (action === "onStock") {
            const newObj = {
                ...filterOptions,
                onStock : !filterOptions.onStock
            };
            setFilterOptions(newObj);
        } 
    };

    /**
     * GET FILTERED INPUTS
     */
    const getFilteredList = () => {

        window.scrollTo(0, 0);
        const filterMenu = document.querySelector('.telescopesFilter');

        if(filterOptions.brand.length > 0 || filterOptions.type.length > 0 || filterOptions.onStock === true) {
          
            let brand = undefined, type = undefined, onStock;
            
            if(filterOptions.brand.length > 0) {
                brand = filterOptions.brand;
            }
            if(filterOptions.type.length > 0) {
                type = filterOptions.type;
            }
            if(filterOptions.onStock) {
                onStock = true;
            }
            
            fetch('https://api-e-commerce.julienlenfume.com/api/products/telescopes', {
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
                    setTelescopeData(newArr);
                })
            } else {
                getTelescopeslist(sortValue);
            }
            filterMenu.classList.add('telescopesFilter--hidden');
    };
        
    /**
     * RESET FILTERS
     */
    const removeFilter = () => {

        const inputsBrand = document.getElementsByName('telescopeBrand');
        const inputsType = document.getElementsByName('telescopeType');
        const stockInput = document.getElementById('telescopeOnStock');
        const filterMenu = document.querySelector('.telescopesFilter');
        
        inputsBrand.forEach(el => {
            el.checked = false;
        })
        inputsType.forEach(el => {
            el.checked = false;
        })
        stockInput.checked = false;

        let filter = {brand: [], type: [], onStock : false};
        filterMenu.classList.add('telescopesFilter--hidden');
        setFilterBrand([false, false, false, false]);
        setFilterType([false, false, false, false, false, false]);
        setFilterOptions(filter);
        getTelescopeslist(sortValue);
    };

    /**
     * ON MOBILE VERSION, DISPLAY FILTERS MENU
     */
    const displayFilters = () => {

        const filter = document.querySelector('.telescopesFilter');

        if(filter.classList.contains('telescopesFilter--hidden')) {
            filter.classList.remove('telescopesFilter--hidden');
        } else {
            filter.classList.add('telescopesFilter--hidden');
        }
    };

    return (
        <main className='mainList'>
            <button onClick={displayFilters} className='mobileFilterHide'>Afficher les filtres</button>
            <section className='telescopesFilter telescopesFilter--hidden'>
                <div className='telescopesFilter__optionsCont'>
                    <div className="telescopesFilter__optionsCont__filter">
                        <h2>Marque</h2>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("sky", e.target.value)} value="Sky-Watcher" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandSky" />
                                <label htmlFor="checkboxTelescopeBrandSky">Sky-Watcher</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("takahashi", e.target.value)} value="Takahashi" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandTakahashi" />
                                <label htmlFor="checkboxTelescopeBrandTakahashi">Takahashi</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("celestron", e.target.value)} value="Celestron" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandCelestron" />
                                <label htmlFor="checkboxTelescopeBrandCelestron">Celestron</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("unistellar", e.target.value)} value="Unistellar" type="checkbox" name="telescopeBrand" id="checkboxTelescopeBrandUnistellar" />
                                <label htmlFor="checkboxTelescopeBrandUnistellar">Unistellar</label>
                            </div>
                        <div className="telescopesFilter__separator"></div>
                    </div>
                    <div className="telescopesFilter__optionsCont__filter">
                        <h2>Type</h2>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("achro", e.target.value)} value="lunette achromatique" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeAchro" />
                                <label htmlFor="checkboxTelescopeTypeAchro">Achromatique</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("apo", e.target.value)} value="lunette apochromatique" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeApo" />
                                <label htmlFor="checkboxTelescopeTypeApo">Apochromatique</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("newton", e.target.value)} value="telescope Newton" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeNewton" />
                                <label htmlFor="checkboxTelescopeTypeNewton">Newton</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("mak", e.target.value)} value="telescope Maksutov" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeMak" />
                                <label htmlFor="checkboxTelescopeTypeMak">Maksutov</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("edge", e.target.value)} value="telescope  edge HD" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeEdge" />
                                <label htmlFor="checkboxTelescopeTypeEdge">Edge HD</label>
                            </div>
                            <div className="telescopesFilter__option">
                                <input onChange={(e) => handleFilter("sc", e.target.value)} value="telescope Schmidt-Cassegrain" type="checkbox" name="telescopeType" id="checkboxTelescopeTypeSC" />
                                <label htmlFor="checkboxTelescopeTypeSC">Schmidt-Cassegrain</label>
                            </div>
                            <div className="telescopesFilter__separator"></div>
                    </div>
                    <div className="telescopesFilter__optionsCont__filter">
                        <h2>En stock</h2>
                            <div className="telescopesFilter__option">
                                <input onChange={() => handleFilter("onStock")} type="checkbox" id="telescopeOnStock" />
                                <label htmlFor="telescopeOnStock">Produits en stock</label>
                            </div>
                    </div>
                </div>
                <div className="telescopesFilter__btnCont">
                    <div className="telescopesFilter__separator"></div>
                            <button onClick={getFilteredList} className='telescopesFilter__btn'>filtrer</button>
                            <button onClick={removeFilter} className='telescopesFilter__btn'>Reinitialiser filtres</button>
                    <div className="telescopesFilter__separator"></div>
                </div>
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
                    {
                    telescopeData.length === 0 ?
                        <h3 className="telescopesList__noResult">Aucun télescope ne correspond à la recherche</h3>
                    :
                    <ul>
                        {telescopeData.map(el => {
                            return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures[0]} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                        })} 
                    </ul>
                    }
                </div>
                <div className="telescopesList__separator"></div>
                <LastSeen />
            </section>
        </main>
    );
};

export default Telescope;