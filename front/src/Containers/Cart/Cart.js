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
    const [deliveryOptions, setDeliveryOptions] = useState();
    const [paymentInfos, setPaymentInfos] = useState("");

    useEffect(() => {

        let promiseArr = []

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('http://localhost:3000/api/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
        .then(data => {
            let newArr = [], total = 0;
            for (let i = 0; i < data.length; i++) {
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
        setDeliveryOptions(options);
    }

    const paymentInfosReceived = (method) => {
        setPaymentInfos(method)
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
                <CartDelivery next={() => toNextStep()} previous={() => toPreviousStep()} sendInfos={deliveryOptionsReceived} address={infosData.address} city={infosData.city} zip={infosData.zipCode} />
            </section>
            
            {/* 4TH STEP : PAIEMENT */}
            <section className='cartStepPayment cartStepCart'>
                <CartPayment next={() => toNextStep()} previous={() => toPreviousStep()} cart={orderArticles} sendInfos={paymentInfosReceived} />
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
                    <div className="cart__articles__totalCont">
                        <h4>Montant Total TTC</h4>
                        <p className="cart__articles__totalCont__total">{totalCart} €</p>
                    </div>
                
            </section>

        </main>
    );
};

export default Cart;