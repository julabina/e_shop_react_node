import React, { useEffect, useState } from 'react';
import paypal from '../../assets/paypal.webp';
import cheque from '../../assets/cheque.webp';
import virement from '../../assets/virement.webp';
import cb from '../../assets/cb.webp'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const CartPayment = (props) => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))
    const dispatch = useDispatch()

    const [totalCart, setTotalCart] = useState(45);
    const [method, setMethode] = useState("creditCard");
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        let total = 0;
        let newArr = props.cart

        for(let i = 0; i < newArr.length; i++) { 
            total += newArr[i].count * newArr[i].price     
        }

        let newCartArr = [];

        for(let i = 0; i < cart.length; i++) {
            let item = {
                category: cart[i].category,
                id: cart[i].id,
                count: cart[i].count,
                price: cart[i].price,
                stock: cart[i].stock,
                name: cart[i].name,
                image: cart[i].image,
                key: cart[i].key
            }
            newCartArr.push(item);
        }
        setCartData(newCartArr);

        setTotalCart(total);

    },[props.cart])

    const changePaymentMethod = (value) => {
        setMethode(value)
    }

    const changeLocalStorage = (stock) => {
        let newArr = [];
        for (let i = 0; i < cart.length; i++) {
            let item = {
                category: cartData[i].category,
                id: cartData[i].id,
                count: stock,
                price: cartData[i].price,
                stock: stock,
                name: cartData[i].name,
                image: process.env.PUBLIC_URL +  cartData[i].image,
                key: cartData[i].key
            }
            newArr.push(item);
        }

        dispatch ({
            type: 'UPDATECART',
            payload: newArr
        }) 
    }

    const watchStock = () => {
        let promiseArr = []

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('http://localhost:3000/api/products/' + cart[i].category + 's/' + cart[i].id).then(res => res.json());
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
        .then(data => {
            for (let i = 0; i < data.length; i++) {     
                if (data[i].data.stock === 0) {
                    changeLocalStorage(0);
                    (alert('Le produit ' + cart[i].name + ' n\'est plus disponible'))
                    return window.location.reload(false)
                } 
                if (data[i].data.stock < cartData[i].count) {
                    changeLocalStorage(data[i].data.stock);
                    (alert('Le produit ' + cart[i].name + ' ne dispose plus en stock du nombres d\'articles sélectionnés'))
                    return window.location.reload(false)
                }
            }
            
        })  
        sendInfos();
    }

    const emptyCart = () => {
        let emptyArr = []

        dispatch ({
            type: 'UPDATECART',
            payload: emptyArr
        })
    }

    const sendInfos = () => {
        props.sendInfos(method);
        emptyCart();
        props.next();
    }

    return (
        <>
        <h2 className='cart__title'>Mode de paiement</h2>
        <div className="cart__btns">
            <div className="cart__btns__options">
                <button  onClick={props.previous} id='' className='cart__btns__options__btn'>Retour livraison</button>
            </div>
            <button onClick={watchStock} className='cart__btns__orderBtn'>Continuer</button>
        </div>

        <div className="cartStepPayment__paymentChoice">
            <h3>Sélectionnez un mode de paiement :</h3>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="creditCard" id="" defaultChecked />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par cartes bancaires</h4>
                    <p>Nous acceptons les règlements en ligne uniquement par CB, Visa et Mastercard, les autres cartes, type American Express, ne sont acceptés qu'au travers d'un règlement sur la plateforme PayPal. La transaction est cryptée. </p>
                    <p>Toutes les informations bancaires que vous donnez, ne circuleront jamais en clair sur Internet et votre numéro de carte ne sera jamais connu ni conservé par React Optique Shop</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={cb} alt="logo de carte bancaire" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="paypal" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par compte PayPal</h4>
                    <p>Avec votre compte Paypal, vous pouvez effectuer vos transactions sur le web sans jamais communiquer vos données bancaires aux bénéficiaires (il vous suffit en effet de les avoir indiquées lors de la création de votre compte PayPal), votre adresse email et votre mot de passe suffisent.</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={paypal} alt="logo de paypal" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="cheque" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par chèque</h4>
                    <p>Nous acceptons le règlement par chèque bancaire ou postal exprimés en Euros et payable en France Métropolitaine. Le traitement de la commande sera plus long du fait du délai d'acheminement postal de votre chèque.</p>
                    <p>L'ordre et l'adresse du chèque seront affichés sur la page de confirmation de commande.</p>
                    <p>Votre commande vous sera réservée 10 jours et sera expédiée après encaissement de votre chèque.</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={cheque} alt="logo du cheque" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="transfer" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par virement bancaire</h4>
                    <p>Nous acceptons le règlement par virement bancaire exprimé en Euros. Le traitement de la commande sera plus long du fait des délais de confirmation interbancaire. </p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={virement} alt="logo du virement bancaire" />
                </div>
            </div>
        </div>

        <div className="cartStepPayment__cartContains">
            <h3>Détail</h3>
            <div className="cart__articles">
                <div className="cart__articles__titles">
                    <p className='cart__articles__titles__title cart__articles__titles__title__article'>Article</p>
                    <p className='cart__articles__titles__title cart__articles__titles__title__price'>Prix unitaire</p>
                    <p className='cart__articles__titles__title cart__articles__titles__title__qty'>Quantité</p>
                    <p className='cart__articles__titles__title cart__articles__titles__title__total'>Montant</p>
                </div>
                <div className="cart__articles__separator"></div>
                <div className="cart__articles__cartContent">
                    {props.cart.map(el => {
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
                    <h4>Total Panier</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(totalCart).toFixed(2)} €</p>
                </div>
                <div className="cart__articles__totalCont">
                    <h4>Livraison</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(parseInt(props.delivery)).toFixed(2)} €</p>
                </div>
                <div className="cart__articles__totalCont">
                    <h4>Montant Total TTC</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(parseInt(props.delivery) + totalCart).toFixed(2)} €</p>
                </div>
            </div>
        </div>


        <div className="cart__articles__orderBtn">
                <button onClick={watchStock} className='cart__btns__orderBtn'>continuer</button>
        </div>
        </>
    );

};

export default CartPayment;