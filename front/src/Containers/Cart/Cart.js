import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))

    useEffect(() => {
        console.log(cart);
    },[cart])

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
                        {cart.map(el => {
                            <div className="">
                                <img src="" alt="" />
                                <h3>el.title</h3>
                                <p>el.price</p>
                                <div className="">
                                    <button>-</button>
                                    <input type="number" value={el.count} />
                                    <button>+</button>
                                </div>
                            </div>
                        })}
                    </div>
                    <div className="cart__articles__separator"></div>
                    <div className="cart__articles__totalCont">
                        <h4>Montant Total TTC</h4>
                        <p className="cart__articles__totalCont__total"></p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Cart;