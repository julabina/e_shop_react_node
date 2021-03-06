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
    }));
    const dispatch = useDispatch();

    const [totalCart, setTotalCart] = useState(45);
    const [method, setMethode] = useState("creditCard");
    const [cartData, setCartData] = useState([]);
    const [modalInfos, setModalInfos] = useState(false);
    const [modalInfosMsg, setModalInfosMsg] = useState('');

    useEffect(() => {

        let total = 0;
        let newArr = props.cart;

        for(let i = 0; i < newArr.length; i++) { 
            total += newArr[i].count * newArr[i].price   ;  
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
            };
            newCartArr.push(item);
        }
        setCartData(newCartArr);

        setTotalCart(total);

    },[props.cart]);

    /**
     * CHANGE VALUE OF PAYMENT METHOD
     * @param {*} value 
     */
    const changePaymentMethod = (value) => {
        setMethode(value);
    };

    /**
     * CHANGE THE CART IN THE LOCALSTORAGE
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
            });
    };

    /**
     * CHECK IN BACKEND IF ALL PRODUCTS ARE ON STOCK
     */
    const watchStock = () => {

        let promiseArr = [], validate = true;

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

                        changeLocalStorage();
                        toggleInfoModal('Le produit ' + cartData[i].name + ' n\'est plus disponible.');
                        return validate = false;
                    } else if (data[i].data.stock < cartData[i].stock) {
                        const newArr = cartData;
                        newArr[i].stock = data[i].data.stock;
                        newArr[i].count = data[i].data.stock;

                        dispatch ({
                            type: 'UPDATECART',
                            payload: newArr
                        }); 

                        changeLocalStorage();
                        toggleInfoModal('Le produit ' + cart[i].name + ' ne dispose plus en stock du nombres d\'articles s??lectionn??s.');
                        return validate = false;
                    }
                }
                
                if(validate) {
                    removeStock();
                }
            })  
    };

    /**
     * REMOVE CART PRODUCTS INVENTORY FROM CART IN BACK-END
     */
    const removeStock = () => {

        let promiseArr = [];

        for(let i = 0; i < cart.length; i++) {
            let promise = fetch('https://api-e-commerce.julienlenfume.com/api/products/' + cart[i].id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + props.token
                },
                method : 'PUT',
                body: JSON.stringify({ stock: parseInt(cart[i].count) })
            });
            promiseArr.push(promise);
        }

        Promise.all(promiseArr)
            .then(() => {
                sendInfos();
            })
            
    };

    /**
     * EMPTY THE CART
     */
    const emptyCart = () => {

        let emptyArr = [];

        dispatch ({
            type: 'UPDATECART',
            payload: emptyArr
        });
    };

    /**
     * SEEND PAYMENT INFO TO cart.js
     */
    const sendInfos = () => {
        props.sendInfos(method);
        emptyCart();
        props.next();
    };

    /**
     * TOGGLE INFO MODAL
     * @param {*} message 
     * @param {*} redirection 
     */
    const toggleInfoModal = (message, redirection) => {
        if(message) {
            setModalInfosMsg(message);
        }
        if(redirection) {
            window.location.reload(false);
        }
        setModalInfos(!modalInfos);
    };

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
            <h3>S??lectionnez un mode de paiement :</h3>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="creditCard" id="" defaultChecked />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par cartes bancaires</h4>
                    <p>Nous acceptons les r??glements en ligne uniquement par CB, Visa et Mastercard, les autres cartes, type American Express, ne sont accept??s qu'au travers d'un r??glement sur la plateforme PayPal. La transaction est crypt??e. </p>
                    <p>Toutes les informations bancaires que vous donnez, ne circuleront jamais en clair sur Internet et votre num??ro de carte ne sera jamais connu ni conserv?? par React Optique Shop</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={cb} alt="logo de carte bancaire" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="paypal" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par compte PayPal</h4>
                    <p>Avec votre compte Paypal, vous pouvez effectuer vos transactions sur le web sans jamais communiquer vos donn??es bancaires aux b??n??ficiaires (il vous suffit en effet de les avoir indiqu??es lors de la cr??ation de votre compte PayPal), votre adresse email et votre mot de passe suffisent.</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={paypal} alt="logo de paypal" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="cheque" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par ch??que</h4>
                    <p>Nous acceptons le r??glement par ch??que bancaire ou postal exprim??s en Euros et payable en France M??tropolitaine. Le traitement de la commande sera plus long du fait du d??lai d'acheminement postal de votre ch??que.</p>
                    <p>L'ordre et l'adresse du ch??que seront affich??s sur la page de confirmation de commande.</p>
                    <p>Votre commande vous sera r??serv??e 10 jours et sera exp??di??e apr??s encaissement de votre ch??que.</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={cheque} alt="logo du cheque" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input onChange={(e) => changePaymentMethod(e.target.value)} type="radio" name="paymentRadio" value="transfer" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par virement bancaire</h4>
                    <p>Nous acceptons le r??glement par virement bancaire exprim?? en Euros. Le traitement de la commande sera plus long du fait des d??lais de confirmation interbancaire. </p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={virement} alt="logo du virement bancaire" />
                </div>
            </div>
        </div>

        <div className="cartStepPayment__cartContains">
            <h3>D??tail</h3>
            <div className="cart__articles">
                <div className="cart__articles__titles">
                    <p className='cart__articles__titles__title cart__articles__titles__title__article'>Article</p>
                    <p className='cart__articles__titles__title cart__articles__titles__title__price'>Prix unitaire</p>
                    <p className='cart__articles__titles__title cart__articles__titles__title__qty'>Quantit??</p>
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
                </div>
                <div className="cart__articles__separator"></div>
                <div className="cart__articles__totalCont">
                    <h4>Total Panier</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(totalCart).toFixed(2)} ???</p>
                </div>
                <div className="cart__articles__totalCont">
                    <h4>Livraison</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(parseInt(props.delivery)).toFixed(2)} ???</p>
                </div>
                <div className="cart__articles__totalCont">
                    <h4>Montant Total TTC</h4>
                    <p className="cartStepPayment__articles__totalCont__total">{(parseInt(props.delivery) + totalCart).toFixed(2)} ???</p>
                </div>
            </div>
        </div>


        <div className="cart__articles__orderBtn">
                <button onClick={watchStock} className='cart__btns__orderBtn'>continuer</button>
        </div>
        {
            modalInfos &&
            <div className="cart__modalCont">
                <div className="cart__modalCont__modal">
                    <h2>{modalInfosMsg}</h2>
                    <div className=""><button onClick={() => toggleInfoModal(null, true)}>Ok</button></div>
                </div>
            </div>
        }
        </>
    );

};

export default CartPayment;