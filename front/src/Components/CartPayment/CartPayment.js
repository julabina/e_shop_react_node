import React from 'react';
import paypal from '../../assets/paypal.webp';
import cheque from '../../assets/cheque.webp';
import virement from '../../assets/virement.webp';
import cb from '../../assets/cb.webp'

const CartPayment = (props) => {
    return (
        <>
        <h2 className='cart__title'>Mode de paiement</h2>
        <div className="cart__btns">
            <div className="cart__btns__options">
                <button  onClick={props.previous} id='' className='cart__btns__options__btn'>Retour livraison</button>
            </div>
            <button onClick={props.next} className='cart__btns__orderBtn'>Continuer</button>
        </div>

        <div className="cartStepPayment__paymentChoice">
            <h3>Sélectionnez un mode de paiement :</h3>
            <div className="cartStepPayment__paymentChoice__choice">
                <input type="radio" name="paymentRadio" id="" />
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
                <input type="radio" name="paymentRadio" id="" />
                <div className="cartStepPayment__paymentChoice__choice__textCont">
                    <h4>Payer par compte PayPal</h4>
                    <p>Avec votre compte Paypal, vous pouvez effectuer vos transactions sur le web sans jamais communiquer vos données bancaires aux bénéficiaires (il vous suffit en effet de les avoir indiquées lors de la création de votre compte PayPal), votre adresse email et votre mot de passe suffisent.</p>
                </div>
                <div className="cartStepPayment__paymentChoice__choice__img">
                    <img src={paypal} alt="logo de paypal" />
                </div>
            </div>
            <div className="cartStepPayment__paymentChoice__choice">
                <input type="radio" name="paymentRadio" id="" />
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
                <input type="radio" name="paymentRadio" id="" />
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
                    {/* {cartData.map(el => {
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
                    })} */}
                </div>
                <div className="cart__articles__separator"></div>
                <div className="cart__articles__totalCont">
                    <h4>Montant Total TTC</h4>
                    <p className="cart__articles__totalCont__total">0 €</p>
                </div>
            </div>
        </div>


        <div className="cart__articles__orderBtn">
                <button onClick={props.next} className='cart__btns__orderBtn'>continuer</button>
        </div>
        </>
    );
};

export default CartPayment;