import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCartShopping, faTruck, faCreditCard, faCheck, faPerson } from '@fortawesome/free-solid-svg-icons';
import CartLocation from '../../Components/CartLocation/CartLocation';
import CartDelivery from '../../Components/CartDelivery/CartDelivery';
import CartPayment from '../../Components/CartPayment/CartPayment';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))

    const dispatch = useDispatch();

    const [cartData, setCartData] = useState([]);
    const [totalCart, setTotalCart] = useState(0);
    const [infosData, setInfosData] = useState({});
    const [orderArticles, setOrderArticles] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState({});
    const [paymentInfos, setPaymentInfos] = useState("");
    const [orderDate, setOrderDate] = useState();
    const [orderHour, setOrderHour] = useState();
    const [orderNumber, setOrderNumber] = useState("");
    
    useEffect(() => {
        window.scrollTo(0, 0);

        let promiseArr = []

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('http://localhost:3000/api/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
        .then(data => {
            console.log(data);
            let newArr = [], total = 0;
            for (let i = 0; i < data.length; i++) {
                if(data[i].data !== undefined) {              
                    let image;
                    if (cart[i].category === "oculaire") {
                        image = data[i].data.pictures 
                    } else {
                        image = data[i].data.pictures[0] 
                    }
                    let item = {
                        category: cart[i].category,
                        id: data[i].data.id,
                        count: cart[i].count,
                        price: data[i].data.price,
                        name: data[i].data.name,
                        image: image,
                        stock: data[i].data.stock,
                        key: uuidv4() 
                    }
                    total += data[i].data.price * cart[i].count;
                    newArr.push(item);
                }
            }
            console.log(newArr);
            setTotalCart(total.toFixed(2));
            setCartData(newArr);
        })     
         
    },[])

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
                image: process.env.PUBLIC_URL +  cartData[i].image
            }
            newArr.push(item);
        }

        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        }) 
    }

    const verifyCart = () => {
        let promiseArr = []

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('http://localhost:3000/api/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                
                if (data[i].data.stock === 0) {
                    const newArr = cartData;
                    newArr[i].stock = data[i].data.stock;
                    newArr[i].count = data[i].data.stock;
                    setCartData(newArr);
                    changeLocalStorage();
                    return (alert('Le produit ' + cartData[i].name + ' n\'est plus disponible'))
                } else if (data[i].data.stock < cartData[i].stock) {
                    const newArr = cartData;
                    newArr[i].stock = data[i].data.stock;
                    newArr[i].count = data[i].data.stock;
                    setCartData(newArr);
                    changeLocalStorage();
                    return alert('Le produit ' + cartData[i].name + ' a été mis à jour');
                }
            }
            
            /* produit en stock, valider, ici reserver temp stock */
            const newArr = cartData;
            setOrderArticles(newArr);

            toNextStep();

        })  
    }

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
    }
    
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
    }

    const infosReceived = (infos) => {
        setInfosData(infos);
    }

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
        }

        setDeliveryOptions(item);
    }

    const paymentInfosReceived = (method) => {
        let paymentMethod;
        console.log(method);

        if (method === 'creditCard') {
            paymentMethod = 'Carte de crédit';
        } else if (method === 'paypal') {
            paymentMethod = "PayPal";
        } else if (method === 'cheque') {
            paymentMethod = "Chèque";
        } else if (method === 'transfer') {
            paymentMethod = 'Virement bancaire'
        }

        setPaymentInfos(paymentMethod)

        const DATE_OPTIONS = {year: 'numeric', month: 'long', day: 'numeric'};
        const HOUR_OPTIONS = {hour: 'numeric', minute: 'numeric'}
        const currentDate = new Date().toLocaleDateString('fr-FR', DATE_OPTIONS);
        const actualHour = new Date().toLocaleTimeString('fr-FR', HOUR_OPTIONS)
        const date = new Date();
        const orderTime = [("0" + date.getUTCDate()).slice(-2), ("0" + (date.getUTCMonth() + 1)).slice(-2), date.getUTCFullYear().toString(), ("0" + date.getUTCHours()).slice(-2), ("0" + date.getUTCMinutes()).slice(-2), ("0" + date.getUTCSeconds()).slice(-2)].join("")
        // Remplacer 124 par le numero client
        const order = orderTime + "124"
        
        setOrderDate(currentDate);
        setOrderHour(actualHour);
        setOrderNumber(order);
    }
    

    return (
        <main>
            <section className="cartSteps">
                <div className="cartSteps__step cartSteps__step--active">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faCartShopping} />
                    <p>Panier</p>
                </div>
                <div className="cartSteps__step">
                    <FontAwesomeIcon className='cartSteps__step__icon' icon={faPerson} />
                    <p>Coordonnées</p>
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

            {/* FIRST STEP : PANIER */}
            {cartData.length === 0 ? <p className='cartEmpty'>Votre panier est vide.</p>
            :
            <section className='cart cartStepCart cartStepCart--active'>
                <h2 className='cart__title'>Votre panier :</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button className='cart__btns__options__btn'>Mettre à jour</button>
                        <button className='cart__btns__options__btn'>Vider le panier</button>
                    </div>
                    <button onClick={verifyCart} className='cart__btns__orderBtn'>Passer commande</button>
                </div>

                <div className="cart__articles">
                    <div className="cart__articles__titles">
                        <p className='cart__articles__titles__title cart__articles__titles__title__article'>Article</p>
                        <p className='cart__articles__titles__title cart__articles__titles__title__price'>Prix unitaire</p>
                        <p className='cart__articles__titles__title cart__articles__titles__title__qty'>Quantité</p>
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
                                    <p className='cart__articles__cartContent__article__priceCont__price'>{el.price} €</p>
                                </div>
                                <div className="cart__articles__cartContent__article__modify">
                                    <button>-</button>
                                    <input type="number" value={el.count} />
                                    <button>+</button>
                                    <FontAwesomeIcon className='cart__articles__cartContent__article__modify__trash' icon={faTrashCan} />
                                </div>
                                <div className="cart__articles__cartContent__article__totalCont">
                                    <p className='cart__articles__cartContent__article__totalCont__result'>{(el.count * el.price).toFixed(2) + " €"}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="cart__articles__separator"></div>
                    <div className="cart__articles__totalCont">
                        <h4>Montant Total TTC</h4>
                        <p className="cart__articles__totalCont__total">{totalCart} €</p>
                    </div>
                    <div className="cart__articles__orderBtn">
                        <button onClick={verifyCart} className='cart__btns__orderBtn'>Passer commande</button>
                    </div>
                </div>
            </section>
            }

            {/* 2ND STEP : INFORMATIONS */}
            <section className='cartStepLocation cartStepCart'>
                <CartLocation next={() => toNextStep()} previous={() => toPreviousStep()} sendInfos={infosReceived} />
            </section>
            
            {/* 3TH STEP : LIVRAISON */}
            <section className='cartStepDelivery cartStepCart'>
                <CartDelivery next={() => toNextStep()} previous={() => toPreviousStep()} sendInfos={deliveryOptionsReceived} address={infosData.deliveryAddress === null ? infosData.address : infosData.deliveryAddress} addressComp={infosData.deliveryAddress === null ? infosData.addressComp : infosData.deliveryAddressComp} city={infosData.deliveryAddress === null ? infosData.city : infosData.deliveryCity} zip={infosData.deliveryAddress === null ? infosData.zipCode : infosData.deliveryZipCode}  />
            </section>
            
            {/* 4TH STEP : PAIEMENT */}
            <section className='cartStepPayment cartStepCart'>
                <CartPayment next={() => toNextStep()} previous={() => toPreviousStep()} cart={orderArticles} sendInfos={paymentInfosReceived} delivery={deliveryOptions.price} />
            </section>

            {/* LAST STEP : CONFIRMATION */}
            <section className='cartStepConfirm cartStepCart'>
                
                <h2>Commande validée</h2>

                <h3>Merci de votre commande ! A bientôt</h3>

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
                                    <p className='cart__articles__cartContent__article__priceCont__price'>{el.price} €</p>
                                </div>
                                <div className="cart__articles__cartContent__article__modify">
                                    <p>{el.count}</p>
                                </div>
                                <div className="cart__articles__cartContent__article__totalCont">
                                    <p className='cart__articles__cartContent__article__totalCont__result'>{(el.count * el.price).toFixed(2) + " €"}</p>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <div className="cart__articles__separator"></div>
                    <div className="">
                        <p>Récapitulatif:</p>
                        <p>Commande N° {orderNumber}</p>
                        <p>le {orderDate} à {orderHour}</p>
                        <p>Montant Total de la commande: {(parseInt(totalCart) + deliveryOptions.price).toFixed(2)} €</p>
                        <p>Paiement par: {paymentInfos}</p>
                        <p>Livraison en: {deliveryOptions.method}</p> 
                        <p>Adresse de livraison:</p>
                        {
                            infosData.societe !== null && <p>{infosData.societe}</p> 
                        }
                        <p>{infosData.civilite} {infosData.lastName} {infosData.firstName}</p>
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
                                <p>Instructions de livraison:</p>
                                <p>{deliveryOptions.informations}</p>
                            </>
                        }
                        {
                            infosData.instruction !== "" && 
                            <>
                                <p>Autres instructions:</p>
                                <p>{infosData.instruction}</p>
                            </>
                        }
                        <p>Moyens de contact:</p>
                        <p>{infosData.mail}</p>
                        <p>{infosData.mobile}</p>
                        {
                            infosData.tel !== "" && 
                            <>
                                <p>{}</p>
                            </>
                        }
                        {
                            infosData.societe !== null &&
                            <>
                               {
                                    infosData.fax !== "" && <p>Fax: {infosData.fax}</p>
                                } 
                            </>
                        }
                        {
                            infosData.newsLetter ?
                            <>
                                <p>Votre inscription à la newsletters{infosData.ad && <span> et aux campagnes SMS</span>} a bien été pris en compte.</p>                            
                            </>
                            :
                            <>
                                { infosData.ad && <p>Votre inscription aux campagnes SMS a bien été pris en compte.</p> }
                            </>
                        }
                    </div>
                
            </section>

        </main>
    );
};

export default Cart;