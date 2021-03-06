import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { decodeToken, isExpired } from 'react-jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCartShopping, faTruck, faCreditCard, faCheck, faPerson } from '@fortawesome/free-solid-svg-icons';
import CartLocation from '../../Components/CartLocation/CartLocation';
import CartDelivery from '../../Components/CartDelivery/CartDelivery';
import CartPayment from '../../Components/CartPayment/CartPayment';
import { Helmet } from 'react-helmet';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cartData, setCartData] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [infosData, setInfosData] = useState({});
    const [orderArticles, setOrderArticles] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState({});
    const [paymentInfos, setPaymentInfos] = useState("");
    const [orderDate, setOrderDate] = useState();
    const [orderHour, setOrderHour] = useState();
    const [orderNumber, setOrderNumber] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState({id: "", token: ""});
    const [modalDelete, setModalDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState("");
    const [modalCartInfos, setModalCartInfos] = useState(false);
    const [modalInfosMsg, setModalInfosMsg] = useState("");
    const [emptyCartModal, setEmptyCartModal] = useState(false);
    
    useEffect(() => {

        window.scrollTo(0, 0);

        let promiseArr = [];

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('https://api-e-commerce.julienlenfume.com/api/products/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
            .then(data => {
                let newArr = [], total = 0;
                for (let i = 0; i < data.length; i++) {
                    if(data[i].data !== undefined) {              
                        let image, price = 0;
                        if (cart[i].category === "oculaire") {
                            image = data[i].data.pictures; 
                        } else {
                            image = data[i].data.pictures[0]; 
                        }
                        if(data[i].data.promo) {
                            price = (parseFloat(data[i].data.price) - (parseFloat(data[i].data.price / 100) * data[i].data.promoValue));
                        } else {
                            price = data[i].data.price;
                        }
                        let item = {
                            category: cart[i].category,
                            id: data[i].data.id,
                            count: cart[i].count,
                            price: (price).toFixed(2),
                            name: data[i].data.name,
                            image: image,
                            stock: data[i].data.stock,
                            key: uuidv4()
                        };
                        
                        total += price * parseInt(cart[i].count);
                        
                        newArr.push(item);
                    }
                }
                setTotalCart(total.toFixed(2));
                setCartData(newArr);
            });
        
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
                    return setIsLogged(false);
                };
                const newUserObj = {
                    id: decodedToken.userId,
                    token: token.version
                };
                setUser(newUserObj);
                dispatch ({
                    type: 'LOG'
                });
                setIsLogged(true);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
                setIsLogged(false);
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            setIsLogged(false);
        }; 
         
    },[]);

    /**
     * UPDATE CART LOCALSTORAGE
     */
    const changeLocalStorage = () => {

        let newArr = [];
        for (let i = 0; i < cartData.length; i++) {
            let item = {
                category: cartData[i].category,
                id: cartData[i].id,
                count: cartData[i].count,
                price: cartData[i].price,
                stock: cartData[i].stock,
                name: cartData[i].name,
                image: cartData[i].image
            };
            newArr.push(item);
        }

        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        }) ;
    };

    /**
     * CHECK CART INVENTORY
     */
    const verifyCart = () => {
        let promiseArr = [];

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('https://api-e-commerce.julienlenfume.com/api/products/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    
                    if (data[i].data.stock === 0) {
                        const newArr = cartData;
                        newArr[i].stock = data[i].data.stock;
                        newArr[i].count = data[i].data.stock;

                        dispatch ({
                            type: 'UPDATECART',
                            payload: newArr
                        }); 

                        calculTotalCart(newArr);
                        setCartData(newArr);
                        changeLocalStorage();
                        return toggleInfosModal('Le produit ' + cartData[i].name + ' n\'est plus disponible');
                    } else if (data[i].data.stock < cartData[i].stock) {
                        const newArr = cartData;
                        newArr[i].stock = data[i].data.stock;
                        newArr[i].count = data[i].data.stock;

                        dispatch ({
                            type: 'UPDATECART',
                            payload: newArr
                        }); 

                        calculTotalCart(newArr);
                        setCartData(newArr);
                        changeLocalStorage();
                        return toggleInfosModal('Le produit ' + cartData[i].name + ' a ??t?? mis ?? jour');
                    }
                }
                
                const newArr = cartData;
                setOrderArticles(newArr);

                toNextStep();
                
            })  
    };

    /**
     * GO TO NEXT STEP
     */
    const toNextStep = () => {

        const steps = document.querySelectorAll(".cartSteps__step");
        const stepsContent = document.querySelectorAll(".cartStepCart");

        for(let i = 0; i < steps.length; i++) {
            let a = i - 1;
            if (!steps[i].classList.contains('cartSteps__step--active') && i !== (steps.length)) {
                steps[i].classList.add('cartSteps__step--active');
                stepsContent[i].classList.add('cartStepCart--active');
                stepsContent[a].classList.remove('cartStepCart--active');
                break;
            }
        }  
        window.scrollTo(0, 0);
    };
    
    /**
     * BACK TO PREVIOUS STEP
     */
    const toPreviousStep = () => {

        const steps = document.querySelectorAll(".cartSteps__step");
        const stepsContent = document.querySelectorAll(".cartStepCart");
        
        for(let i = (steps.length - 1); i >= 0; i--) {
            let a = i - 1;
            if (steps[i].classList.contains('cartSteps__step--active') ) {
                steps[i].classList.remove('cartSteps__step--active');
                stepsContent[i].classList.remove('cartStepCart--active');
                stepsContent[a].classList.add('cartStepCart--active');
                break;
            }
        }
        window.scrollTo(0, 0);
    };

    /**
     * GET LOCATION INFOS
     * @param {*} infos 
     */
    const infosReceived = (infos) => {
        setInfosData(infos);
    };

    /**
     * GET DELIVERY INFOS
     * @param {*} options 
     */
    const deliveryOptionsReceived = (options) => {
        let deliveryPrice = 0;

        if (options.method === "collisimo") {
            deliveryPrice = 7;
        } else if (options.method === 'relay') {
            deliveryPrice = 7;
        } else if (options.method === "chronopost") {
            deliveryPrice = 20;
        } 

        let item = {
            method: options.method,
            informations: options.informations,
            price: deliveryPrice
        };

        setDeliveryOptions(item);
    };

    /**
     * GET PAYMENT INFOS
     * @param {*} method 
     */
    const paymentInfosReceived = (method) => {
        let paymentMethod;

        if (method === 'creditCard') {
            paymentMethod = 'Carte de cr??dit';
        } else if (method === 'paypal') {
            paymentMethod = "PayPal";
        } else if (method === 'cheque') {
            paymentMethod = "Ch??que";
        } else if (method === 'transfer') {
            paymentMethod = 'Virement bancaire'
        }

        setPaymentInfos(paymentMethod);

        const DATE_OPTIONS = {year: 'numeric', month: 'long', day: 'numeric'};
        const HOUR_OPTIONS = {hour: 'numeric', minute: 'numeric'};
        const currentDate = new Date().toLocaleDateString('fr-FR', DATE_OPTIONS);
        const actualHour = new Date().toLocaleTimeString('fr-FR', HOUR_OPTIONS);
        const date = new Date();
        const orderTime = [("0" + date.getUTCDate()).slice(-2), ("0" + (date.getUTCMonth() + 1)).slice(-2), date.getUTCFullYear().toString(), ("0" + date.getUTCHours()).slice(-2), ("0" + date.getUTCMinutes()).slice(-2), ("0" + date.getUTCSeconds()).slice(-2)].join("");
        const order = orderTime;
        
        setOrderDate(currentDate);
        setOrderHour(actualHour);
        setOrderNumber(order);

        sendOrder(order);
    };

    /**
     * SEND ORDER TO BACK-END
     * @param {*} orderNumb 
     */
    const sendOrder = (orderNumb) => {

        const idArr = cartData.map(el => {
            return el.id;
        })
        const countArr = cartData.map(el => {
            return el.count;
        })
        const namesArr = cartData.map(el => {
            return el.name;
        })
        const products = idArr.join();
        const counts = countArr.join();
        const names = namesArr.join();

        const newOrder = {
            userId:  user.id,
            order: orderNumb,
            products: products,
            count: counts,
            names: names,
            instruction: infosData.instruction,
            deliveryInformation: deliveryOptions.informations
        };

        fetch("https://api-e-commerce.julienlenfume.com/api/orders/", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + user.token
            },
            method: 'POST', 
            body: JSON.stringify( newOrder )})
            
    };

    /**
     * GO TO LOGIN PAGE
     */
    const toLoginPage = () => {
        navigate('/login', { replace: true });
    };

    /**
     * EMPTY CART
     * AND CART LOCALSTORAGE
     */
    const emptyCart = () => {

        let newArr = [];
        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        }); 

        toggleEmptyCartModal();
        
        setCartData([]);
    };
    
    /**
     * RELOAD THE PAGE
     */
    const reloadPage = () => {
        window.location.reload();
    };

    /**
     * DELETE ONE CART PRODUCT
     * @param {*} productId 
     */
    const deleteItem = (productId) => {

        toggleDeleteModal();
        const newArr = cartData.filter(el => {
            return el.id !== productId;
        });

        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        });

        calculTotalCart(newArr);
        setCartData(newArr);
    };

    /**
     * CONTROL INPUTS
     * @param {*} productId 
     * @param {*} btn 
     * @param {*} value 
     */
    const ctrlInput = (productId, btn, value) => {

        const newArr = cartData.map(el => {
            if(el.id === productId) {
                if(btn === "plus") {
                    if (el.count < el.stock) {
                        value = el.count + 1;
                    } else {
                        value = el.count;
                    }
                } else if (btn === "minus") {
                    if (el.count > 1) {
                        value = el.count - 1;
                    } else {
                        value = el.count;
                    }
                } else {
                    if(value > el.stock) {
                        value = el.stock;
                    } else if (value <= 0) {
                        value = 1;
                    }
                }
                const newObj = {
                    ...el,
                    count: value
                };
                return newObj;
            } else {
                return el;
            }
        });


        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        });  
        
        calculTotalCart(newArr);
        setCartData(newArr); 
    };

    /**
     * CALCUL THE TOTAL CART
     * @param {*} productArr 
     */
    const calculTotalCart = (productArr) => {

        let total = 0;
        for(let i = 0; i < productArr.length; i++) {
            total += (productArr[i].count * productArr[i].price);
        }
        setTotalCart((total).toFixed(2));
    };

    /**
     * TOGGLE THE DELETE CONFIRMATION MODAL
     * @param {*} id 
     */
    const toggleDeleteModal = (id) => {
        if(id){
            setIdToDelete(id);
        }
        setModalDelete(!modalDelete);
    };

    /**
     * TOGGLE INFO MODAL
     * @param {*} message 
     */
    const toggleInfosModal = (message) => {
        if(message) {
            setModalInfosMsg(message);
        }
        setModalCartInfos(!modalCartInfos);
    };

    /**
     * TOGGLE EMPTY CART CONFIRMATION MODAL
     */
    const toggleEmptyCartModal = () => {
        setEmptyCartModal(!emptyCartModal);
    };

    return (
        <>
        <Helmet>
            <title>Panier - React optique shop</title>
            <meta name="title" content="Panier - React optique shop" />
            <meta
            name="description"
            content="Simulez vos achats via le panier et son tunnel de commande."
            />
        </Helmet>
        <main>
            <section className="cartSteps">
                <div className="cartSteps__step cartSteps__step--active">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faCartShopping} />
                    <p>Panier</p>
                </div>
                <div className="cartSteps__step">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faPerson} />
                    <p>Coordonn??es</p>
                </div>
                <div className="cartSteps__step">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faTruck} />
                    <p>Livraison</p>
                </div>
                <div className="cartSteps__step">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faCreditCard} />
                    <p>Paiement</p>
                </div>
                <div className="cartSteps__step">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faCheck} />
                    <p>Confirmation</p>
                </div>
            </section>
            {
                modalCartInfos &&
                <section className="cart__modalCont">
                    <div className="cart__modalCont__modal">
                        <h2>{modalInfosMsg}</h2>
                        <div className=""><button onClick={toggleInfosModal}>Ok</button></div>
                    </div>
                </section>
            }

            {/* FIRST STEP : PANIER */}
            {cartData.length === 0 ? <p className='cartEmpty'>Votre panier est vide.</p>
            :
            <section className='cart cartStepCart cartStepCart--active'>
                <h2 className='cart__title'>Votre panier :</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button onClick={reloadPage} className='cart__btns__options__btn'>Mettre ?? jour</button>
                        <button onClick={toggleEmptyCartModal} className='cart__btns__options__btn'>Vider le panier</button>
                    </div>
                    {
                        isLogged
                        ?
                            <button onClick={verifyCart} className='cart__btns__orderBtn'>Passer commande</button>
                        :
                            <button onClick={toLoginPage} className='cart__btns__orderBtn'>Se connecter</button>
                    }
                </div>

                <div className="cart__articles">
                    <div className="cart__articles__titles">
                        <p className='cart__articles__titles__title cart__articles__titles__title__article'>Article</p>
                        <p className='cart__articles__titles__title cart__articles__titles__title__price'>Prix unitaire</p>
                        <p className='cart__articles__titles__title cart__articles__titles__title__qty'>Quantit??</p>
                        <p className='cart__articles__titles__title cart__articles__titles__title__total'>Montant</p>
                    </div>
                    <div className="cart__articles__separator"></div>
                    <div className="cart__articles__cartContent">
                        {cartData.map(el => {
                          return (
                            <div key={el.key} className="cart__articles__cartContent__article">
                                <NavLink to={"/" + el.category + "/ref_=" + el.id}>
                                    <div className="cart__articles__cartContent__article__leftPart">
                                        <div className="cart__articles__cartContent__article__leftPart__img">
                                            <img src={el.image} alt={"photo de " + el.name} />
                                        </div>    
                                        <h3>{el.name}</h3>
                                    </div>
                                </NavLink>
                                <div className="cart__articles__cartContent__article__priceCont">
                                    <p className='cart__articles__cartContent__article__priceCont__price'>{el.price} ???</p>
                                </div>
                                <div className="cart__articles__cartContent__article__modify">
                                    <button onClick={() => ctrlInput(el.id,"minus")}>-</button>
                                    <input onChange={(e) => ctrlInput(el.id, null, e.target.value)} type="number" value={el.count} />
                                    <button onClick={() => ctrlInput(el.id, "plus")}>+</button>
                                    <FontAwesomeIcon onClick={() => toggleDeleteModal(el.id)} className='cart__articles__cartContent__article__modify__trash' icon={faTrashCan} />
                                </div>
                                <div className="cart__articles__cartContent__article__totalCont">
                                    <p className='cart__articles__cartContent__article__totalCont__result'>{(el.count * el.price).toFixed(2) + " ???"}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="cart__articles__separator"></div>
                    <div className="cart__articles__totalCont">
                        <h4>Montant Total TTC</h4>
                        <p className="cart__articles__totalCont__total">{totalCart} ???</p>
                    </div>
                    {
                        isLogged
                        ?
                        <div className="cart__articles__orderBtn">
                            <button onClick={verifyCart} className='cart__btns__orderBtn'>Passer commande</button>
                        </div>
                        :
                        <div className="cart__articles__orderBtn">
                            <button onClick={toLoginPage} className='cart__btns__orderBtn'>Se connecter</button>
                        </div>
                    }
                </div>
            </section>
            }
            {
                modalDelete &&
                <section className="cart__modalConfirmDelete">
                    <div className="cart__modalConfirmDelete__modal">
                        <h2>Voulez vous supprimer cet article du panier ?</h2>
                        <div className="cart__modalConfirmDelete__modal__btnCont">
                            <button onClick={toggleDeleteModal}>Non</button>
                            <button onClick={() => deleteItem(idToDelete)}>Oui</button>
                        </div>
                    </div>
                </section>
            }
            {
                emptyCartModal && 
                <section className="cart__modalConfirmDelete">
                    <div className="cart__modalConfirmDelete__modal">
                        <h2>Voulez vous supprimer tout le panier ?</h2>
                        <div className="cart__modalConfirmDelete__modal__btnCont">
                            <button onClick={toggleEmptyCartModal}>Non</button>
                            <button onClick={emptyCart}>Oui</button>
                        </div>
                    </div>
                </section>
            }
            {
                isLogged
                &&
                <>
                {/* 2ND STEP : INFORMATIONS */}
                <section className='cartStepLocation cartStepCart'>
                    <CartLocation next={() => toNextStep()} previous={() => toPreviousStep()} sendInfos={infosReceived} user={user.id} token={user.token} />
                </section>
                
                {/* 3TH STEP : LIVRAISON */}
                <section className='cartStepDelivery cartStepCart'>
                    <CartDelivery next={() => toNextStep()} previous={() => toPreviousStep()} sendInfos={deliveryOptionsReceived} address={infosData.deliveryAddress === null ? infosData.address : infosData.deliveryAddress} addressComp={infosData.deliveryAddress === null ? infosData.addressComp : infosData.deliveryAddressComp} city={infosData.deliveryAddress === null ? infosData.city : infosData.deliveryCity} zip={infosData.deliveryAddress === null ? infosData.zipCode : infosData.deliveryZipCode}  />
                </section>
                
                {/* 4TH STEP : PAIEMENT */}
                <section className='cartStepPayment cartStepCart'>
                    <CartPayment next={() => toNextStep()} previous={() => toPreviousStep()} cart={orderArticles} sendInfos={paymentInfosReceived} delivery={deliveryOptions.price} token={user.token} />
                </section>

                {/* LAST STEP : CONFIRMATION */}
                <section className='cartStepConfirm cartStepCart'>
                    
                    <h2>Commande valid??e</h2>

                    <h3>Merci de votre commande ! A bient??t</h3>

                    <div className='cartStepConfirm__backBtn'>
                        <NavLink to="/">
                            <button>Retour ?? l'accueil</button>
                        </NavLink>
                    </div>

                    <div className="cart__articles__separator"></div>
                    <div className="cart__articles__cartContent">
                            {cartData.map(el => {
                            return (
                                <div key={el.key} className="cart__articles__cartContent__article">
                                    <NavLink to={"/" + el.category + "/ref_=" + el.id}>
                                        <div className="cart__articles__cartContent__article__leftPart">
                                            <div className="cart__articles__cartContent__article__leftPart__img">
                                                <img src={el.image} alt={"photo de " + el.name} />
                                            </div>    
                                            <h3>{el.name}</h3>
                                        </div>
                                    </NavLink>
                                    <div className="cart__articles__cartContent__article__priceCont">
                                        <p className='cart__articles__cartContent__article__priceCont__price'>{el.price} ???</p>
                                    </div>
                                    <div className="cart__articles__cartContent__article__modify">
                                        <p>{el.count}</p>
                                    </div>
                                    <div className="cart__articles__cartContent__article__totalCont">
                                        <p className='cart__articles__cartContent__article__totalCont__result'>{(el.count * el.price).toFixed(2) + " ???"}</p>
                                    </div>
                                </div>
                                )
                            })}
                            <div className="cartStepConfirm__deliveryPrice">
                                <h4>Livraison</h4>
                                <p className="cart__articles__cartContent__article__totalCont__result">{parseInt(deliveryOptions.price).toFixed(2) + " ???"}</p>
                            </div>
                        </div>
                        <div className="cart__articles__separator"></div>
                        <div className="cartStepConfirm__recap">
                            <div className="cartStepConfirm__recap__content">
                                <h4>R??capitulatif:</h4>
                                <p>Montant Total de la commande: {(parseInt(totalCart) + deliveryOptions.price).toFixed(2)} ???</p>
                                <p>Commande N?? {orderNumber}</p>
                                <p>le {orderDate} ?? {orderHour}</p>
                                <p>Paiement par {paymentInfos}</p>
                                <p>Livraison en {deliveryOptions.method}</p> 
                                <p className="cartStepConfirm__recap__content__title">Adresse de livraison:</p>
                                {
                                    infosData.societe !== null && <p>{infosData.societe}</p> 
                                }
                                <p>{infosData.lastName} {infosData.firstName}</p>
                                {
                                    infosData.deliveryAddress === null ? 
                                    <>
                                        { infosData.addressComp !== "" && <p>{infosData.addressComp}</p> }
                                        <p>{infosData.address}</p>
                                        <p>{infosData.zipCode} {infosData.city}</p>
                                    </>
                                    :
                                    <>
                                        { infosData.deliveryAddressComp !== "" && <p>{infosData.deliveryAddressComp}</p> }
                                        <p>{infosData.deliveryAddress}</p>
                                        <p>{infosData.deliveryZipCode} {infosData.deliveryCity}</p>
                                    </>
                                }
                                {
                                    deliveryOptions.informations !== "" && 
                                    <>
                                        <p className="cartStepConfirm__recap__content__title">Instructions de livraison:</p>
                                        <p>{deliveryOptions.informations}</p>
                                    </>
                                }
                                {
                                    infosData.instruction !== "" && 
                                    <>
                                        <p className="cartStepConfirm__recap__content__title">Autres instructions:</p>
                                        <p>{infosData.instruction}</p>
                                    </>
                                }
                                <p className="cartStepConfirm__recap__content__title">Moyens de contact:</p>
                                <p>{infosData.mobile}</p>
                                {
                                    (infosData.fixe !== null || infosData.fixe !== "") && 
                                    <>
                                        <p>{infosData.fixe}</p>
                                    </>
                                }
                                {
                                    infosData.fax !== null &&
                                    <>
                                        <p>Fax: {infosData.fax}</p>
                                    </>
                                }
                                {
                                    infosData.newsLetter ?
                                    <>
                                        <p className='cartStepConfirm__recap__content__newsletter'>Votre inscription ?? la newsletters{infosData.ad && <span> et aux campagnes SMS</span>} a bien ??t?? pris en compte.</p>                            
                                    </>
                                    :
                                    <>
                                        { infosData.ad && <p className='cartStepConfirm__recap__content__newsletter'>Votre inscription aux campagnes SMS a bien ??t?? pris en compte.</p> }
                                    </>
                                }
                            </div>
                        </div>
                </section>
                </>
            }
        </main>
        </>
    );
};

export default Cart;