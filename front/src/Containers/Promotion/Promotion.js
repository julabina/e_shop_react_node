import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import TelescopeCard from '../../Components/TelescopeCard/TelescopeCard';
import OculaireCard from '../../Components/OculaireCard/OculaireCard';
import MontureCard from '../../Components/MontureCard/MontureCard';
import LastSeen from '../../Components/LastSeen/LastSeen';

const Promotion = () => {

    const dispatch = useDispatch();

    const [promoData, setPromoData] = useState([]);
    const [filterOptions, setFilterOptions] = useState({telescope : false, oculaire: false, monture: false, onStock: false});
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

        getPromoProducts(sortValue);

    },[]);

    /**
     * GET SOLDED PRODUCTS
     * @param {*} sort 
     */
    const getPromoProducts = (sort) => {

        fetch('http://localhost:3000/api/products/promotion', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let newArr = [];
                for (let i = 0; i < data.data.length; i++) {
                    if(data.data[i] !== undefined) {
                        const item = {
                            cat: data.data[i].Category.name,
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
                } else if (sort === "ascPromo") {
                    newArr.sort((a, b) => a.promoValue - b.promoValue);
                } else if (sort === "descPromo") {
                    newArr.sort((a, b) => b.promoValue - a.promoValue);
                }
                
                setPromoData(newArr);
            });
    };

    /**
     * SORT PRODUCTS
     * @param {*} option 
     */
    const handleSort = (option) => {

        setSortValue(option);
        
        let newArr = promoData;

        if(option === "ascPrice") {
            newArr.sort((a, b) => a.price - b.price);
        } else if(option === "descPrice") {
            newArr.sort((a, b) => b.price - a.price);
        } else if(option === "descName") {
            newArr.sort((a, b) => (a.name < b.name) ? 1 : (b.name < a.name) ? -1 : 0);
        } else if (option === "ascName") {
            newArr.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
        } else if (option === "ascPromo") {
            newArr.sort((a, b) => a.promoValue - b.promoValue);
        } else if (option === "descPromo") {
            newArr.sort((a, b) => b.promoValue - a.promoValue);
        }

        setPromoData(newArr);
    };

    /**
     * CONTROL FILTERS
     * @param {*} action 
     */
    const handleCheckFilters = (action) => {

        if(action === "telescope") {
            const newObj = {
                ...filterOptions,
                telescope: !filterOptions.telescope
            };
            setFilterOptions(newObj);
        } else if(action === "oculaire") {
            const newObj = {
                ...filterOptions,
                oculaire: !filterOptions.oculaire
            };
            setFilterOptions(newObj);
        } else if(action === "monture") {
            const newObj = {
                ...filterOptions,
                monture: !filterOptions.monture
            };
            setFilterOptions(newObj);    
        } else if(action === "onStock") {
            const newObj = {
                ...filterOptions,
                onStock: !filterOptions.onStock
            };
            setFilterOptions(newObj);
        }
    };

    /**
     * GET FILTERED SOLDED PRODUCTS
     */
    const getFilteredList = () => {

        window.scrollTo(0, 0);

        if(filterOptions.telescope === true || filterOptions.oculaire === true || filterOptions.monture === true || filterOptions.onStock === true) {
            
            let telescope = false, oculaire = false, monture = false, onStock;
            
            if(filterOptions.telescope) {
                telescope = true;
            }
            if(filterOptions.oculaire) {
                oculaire = true;
            }
            if(filterOptions.monture) {
                monture = true;
            }
            if(filterOptions.onStock) {
                onStock = true;
            }
            
            fetch('http://localhost:3000/api/products/promotion', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST', 
                body: JSON.stringify({
                    telescope: telescope,
                    oculaire: oculaire,
                    monture: monture,
                    onStock: onStock
                })
            })
                .then(res => res.json())
                .then(data => {
                    let newArr = [];
                    for (let i = 0; i < data.data.length; i++) {
                        if(data.data[i] !== undefined) {
                            const item = {
                                cat: data.data[i].Category.name,
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
                    } else if (sortValue === "ascPromo") {
                        newArr.sort((a, b) => a.promoValue - b.promoValue);
                    } else if (sortValue === "descPromo") {
                        newArr.sort((a, b) => b.promoValue - a.promoValue);
                    }

                    setPromoData(newArr);
                })
            } else {
                getPromoProducts(sortValue);
            }
    };

    /**
     * RESET FILTERS
     */
    const removeFilter = () => {

        const filterTelescope = document.getElementById('optionFilterTelescope');
        const filterOculaire = document.getElementById('optionFilterOculaire');
        const filterMonture = document.getElementById('optionFilterMonture');
        const filterOnStock = document.getElementById('optionFilterOnStock');

        filterTelescope.checked = false;
        filterOculaire.checked = false;
        filterMonture.checked = false;
        filterOnStock.checked = false;

        getPromoProducts(sortValue);
    };

    return (
        <main className='mainList'>
            <section className="promotionFilter">
            <div className='promotionFilter__optionsCont'>
                <div className="promotionFilter__optionsCont__filter">
                    <h2>Categorie</h2>
                        <div className="promotionFilter__option">
                            <input onChange={() => handleCheckFilters("telescope")} type="checkbox" id="optionFilterTelescope" />
                            <label htmlFor="optionFilterTelescope">Télescope</label>
                        </div>
                        <div className="promotionFilter__option">
                            <input onChange={() => handleCheckFilters("oculaire")} type="checkbox" id="optionFilterOculaire" />
                            <label htmlFor="optionFilterOculaire">Oculaire</label>
                        </div>
                        <div className="promotionFilter__option">
                            <input onChange={() => handleCheckFilters("monture")} type="checkbox" id="optionFilterMonture" />
                            <label htmlFor="optionFilterMonture">Monture</label>
                        </div>
                    <div className="promotionFilter__separator"></div>
                </div>
                <div className="promotionFilter__optionsCont__filter">  
                    <h2>En stock</h2>
                        <div className="promotionFilter__option">
                            <input onChange={() => handleCheckFilters("onStock")} type="checkbox" id="optionFilterOnStock" />
                            <label htmlFor="optionFilterOnStock">Produits en stock</label>
                        </div>
                    </div>
                </div>
                <div className="promotionFilter__btnCont">
                    <div className="promotionFilter__separator"></div>
                        <button onClick={getFilteredList} className='promotionFilter__btn'>filtrer</button>
                        <button onClick={removeFilter} className='promotionFilter__btn'>Reinitialiser filtres</button>
                    <div className="promotionFilter__separator"></div>
                </div>
            </section>
            <section className='promotionList'>
                <div className="promotionList__top">
                    <div className="promotionList__top__top">
                        <h2>Promotions</h2>
                        <div className="promotionList__top__top__pages"></div>
                    </div>
                    <select onChange={(e) => handleSort(e.target.value)}>
                        <option defaultChecked value="ascName">Trier par ordre alphabétique croissant</option>
                        <option value="descName">Trier par ordre alphabétique décroissant</option>
                        <option value="ascPrice">Trier par prix croissant</option>
                        <option value="descPrice">Trier par prix décroissant</option>
                        <option value="ascPromo">Trier par remise croissante</option>
                        <option value="descPromo">Trier par remise décroissante</option>
                    </select>
                </div>
                <div className="promotionList__main">
                    {
                     promoData.length === 0 ?
                        <h3 className="promotionList__noResult">Aucun produit ne correspond à la recherche</h3>
                     :
                     <ul>
                        {promoData.map(el => {
                            if(el.cat === "telescope") {
                                return <TelescopeCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures[0]} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } else if(el.cat === "oculaire") {
                                return <OculaireCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } else if(el.cat === "monture") {
                                return <MontureCard id={el.id} name={el.name} price={el.price} key={el.id} image={el.pictures} stock={el.stock} promo={el.promo} promoValue={el.promoValue} />
                            } 
                        })} 
                    </ul>
                    }
                </div>
                <div className="promotionList__separator"></div>
                <LastSeen />
            </section>
        </main>
    );
};

export default Promotion;