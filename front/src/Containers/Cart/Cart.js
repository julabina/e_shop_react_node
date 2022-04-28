import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        let newArr = [];
        for(let i = 0; i < cart.length; i++) {
            let item = {
                category: cart[i].category,
                id: cart[i].id,
                count: cart[i].count,
                price: cart[i].price.toFixed(2),
                name: cart[i].name,
                image: cart[i].image,
                stock: cart[i].stock,
                key: uuidv4()
            }
            newArr.push(item);
        }
        setCartData(newArr);
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

            {cartData.length === 0 ? <p className='cartEmpty'>Votre panier est vide.</p>
            :
            <section className='cart'>
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
                        <p className="cart__articles__totalCont__total">0 €</p>
                    </div>
                    <div className="cart__articles__orderBtn">
                        <button className='cart__btns__orderBtn'>Passer commande</button>
                    </div>
                </div>
            </section>
            }
        </main>
    );
};

export default Cart;