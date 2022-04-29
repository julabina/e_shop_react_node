import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import CartLocation from '../../Components/cartLocation/CartLocation';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))

    const [cartData, setCartData] = useState([]);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {

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

    return (
        <main>
            <section className="cartSteps">
                <div className="cartSteps__step">

                    <p>Panier</p>
                </div>
                <div className="cartSteps__step">

                    <p>Coordonnées</p>
                </div>
                <div className="cartSteps__step">

                    <p>Livraison</p>
                </div>
                <div className="cartSteps__step">

                    <p>Paiement</p>
                </div>
                <div className="cartSteps__step">

                    <p>Confirmation</p>
                </div>
            </section>

            {/* FIRST STEP : PANIER */}
            {cartData.length === 0 ? <p className='cartEmpty'>Votre panier est vide.</p>
            :
            <section className='cart cartStepCart'>
                <h2 className='cart__title'>Votre panier :</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button className='cart__btns__options__btn'>Mettre à jour</button>
                        <button className='cart__btns__options__btn'>Vider le panier</button>
                    </div>
                    <button className='cart__btns__orderBtn'>Passer commande</button>
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
                        <button className='cart__btns__orderBtn'>Passer commande</button>
                    </div>
                </div>
            </section>
            }

            {/* 2ND STEP : INFORMATIONS */}
            <section className='cartStepLocation cartStepLocation--active'>
                <CartLocation />
              {/*   <h2 className='cart__title'>Information client</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button id='backToCart' className='cart__btns__options__btn'>Retour au panier</button>
                    </div>
                    <button className='cart__btns__orderBtn'>Continuer</button>
                </div>

                <p className='cartStepLocation__infosOblig'>Les zones marquées par un astérisque sont obligatoires.</p>

                <div className="cartStepLocation__status">
                    <input onInput={changeToggleStatus} type="radio" name="status" id="individual" />
                    <label htmlFor="individual">Je suis un particulier</label>
                    <input onInput={changeToggleStatus} type="radio" name="status" id="business" />
                    <label htmlFor="business">Je suis une entreprise</label>
                </div>

                {
                    toggleStatus ? 
                        <div className="cartStepLocation__induvidual">
                            <div className="cartStepLocation__induvidual__names">
                                <div className='cartStepLocation__induvidual__names__civ'>

                                </div>
                                <div className='cartStepLocation__induvidual__names__firstName'></div>
                                <div className='cartStepLocation__induvidual__names__lastName'></div>
                            </div>
                        </div>
                    : 
                        <div className="cartStepLocation__business">

                        </div>         
                }


                <div className="cart__articles__orderBtn">
                    <button className='cart__btns__orderBtn'>continuer</button>
                </div> */}
            </section>
            
            {/* 3TH STEP : LIVRAISON */}
            <section className='cartStepDelivery'>
            <h2 className='cart__title'></h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button id='' className='cart__btns__options__btn'></button>
                    </div>
                    <button className='cart__btns__orderBtn'>Continuer</button>
                </div>


                <div className="cart__articles__orderBtn">
                    <button className='cart__btns__orderBtn'>continuer</button>
                </div>
            </section>
            
            {/* 4TH STEP : PAIEMENT */}
            <section className='cartStepPayment'>
            <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button id='' className='cart__btns__options__btn'></button>
                    </div>
                    <button className='cart__btns__orderBtn'>Continuer</button>
                </div>


                <div className="cart__articles__orderBtn">
                    <button className='cart__btns__orderBtn'>continuer</button>
                </div>
            </section>

            {/* LAST STEP : CONFIRMATION */}
            <section className='cartStepConfirm'>
            <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button id='' className='cart__btns__options__btn'></button>
                    </div>
                </div>


                
            </section>

        </main>
    );
};

export default Cart;