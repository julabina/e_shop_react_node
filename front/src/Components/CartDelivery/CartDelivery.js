import React from 'react';
import colissimo from '../../assets/colissimo.webp';
import relay from '../../assets/relay.webp';
import chronopost from '../../assets/chronopost.webp';

const CartDelivery = (props) => {
    return (
        <>
            <h2 className='cart__title'>Livraison</h2>
            <div className="cart__btns">
                <div className="cart__btns__options">
                    <button onClick={props.previous} id='delivery__backBtn' className='cart__btns__options__btn cartStepDelivery__backBtn'>Retour Coordonnées</button>
                </div>
                <button onClick={props.next} className='cart__btns__orderBtn'>Continuer</button>
            </div>

            <h3>Adresse de livraison</h3>
            <div className="cartStepDelivery__adress">
                <p>12 rue de la chouette</p>
                <p>Paris, 75000</p>
                <p>FRANCE METROPOLITAINE</p>
            </div>

            <h3>Informations complémentaires pour la livraison :</h3>
            <textarea className='cartStepDelivery__infosComp' name="" id=""></textarea>

            <h3 className="cartStepDelivery__deliveySelect">Veuillez sélectionner un mode de livraison :</h3>

            <div>            
                <div className="cartStepDelivery__optionDelivery">
                    <input defaultChecked type="radio" name="delivery" id="" />
                    <div className="cartStepDelivey__optionDelivery__cont">
                        <div className="cartStepDelivery__optionDelivery__cont__mainInfos">
                            <p className="cartStepDelivery__optionDelivery__cont__mainInfos__price">7.00 €</p>
                            <p className='cartStepDelivery__optionDelivery__cont__mainInfos__methode'>Colissimo Domicile - France métropolitaine et Corse</p>
                        </div>
                        <div className="cartStepDelivery__optionDelivery__cont__infos">
                            <p>Livraison à domicile en France métropolitaine et Corse en 48 / 72h avec signature</p>
                            <p>Si vous êtes absent, un avis de passage vous sera déposé vous permettant de choisir sur Internet une nouvelle date de livraison dans les 6 jours ouvrés ou de récupérer votre colis dès le lendemain 15h dans le bureau de poste de votre choix.</p>
                        </div>
                    </div>
                    <div className="cartStepDelivery__optionDelivery__img">
                        <img src={colissimo} alt="logo de colissimo" />
                    </div>
                </div>
                <div className="cartStepDelivery__optionDelivery">
                    <input type="radio" name="delivery" id="" />
                    <div className="cartStepDelivey__optionDelivery__cont">
                        <div className="cartStepDelivery__optionDelivery__cont__mainInfos">
                            <p className="cartStepDelivery__optionDelivery__cont__mainInfos__price">7.00 €</p>
                            <p className='cartStepDelivery__optionDelivery__cont__mainInfos__methode'>Mondail Relay - Au point Modial Relay le plus proche</p>
                        </div>
                        <div className="cartStepDelivery__optionDelivery__cont__infos">
                            <p>Livraison en point de retrait en France métropolitaine et Corse en 48 / 72h avec signature</p>
                        </div>
                    </div>
                    <div className="cartStepDelivery__optionDelivery__img">
                        <img src={relay} alt="logo de mondial relay" />
                    </div>
                </div>
                <div className="cartStepDelivery__optionDelivery">
                    <input type="radio" name="delivery" id="" />
                    <div className="cartStepDelivey__optionDelivery__cont">
                        <div className="cartStepDelivery__optionDelivery__cont__mainInfos">
                            <p className="cartStepDelivery__optionDelivery__cont__mainInfos__price">20.00 €</p>
                            <p className='cartStepDelivery__optionDelivery__cont__mainInfos__methode'>Chronopost - France métropolitaine (hors Corse)</p>
                        </div>
                        <div className="cartStepDelivery__optionDelivery__cont__infos">
                            <p>Livraison à domicile en France métropolitaine (hors Corse) le lendemain avant 13 h (hors week-end et jour férié). </p>
                        </div>
                    </div>
                    <div className="cartStepDelivery__optionDelivery__img">
                        <img src={chronopost} alt="logo de chronopost" />
                    </div>
                </div>
            </div>

            <div className="cart__articles__orderBtn">
                <button onClick={props.next} className='cart__btns__orderBtn'>continuer</button>
            </div>
        </>
    );
};

export default CartDelivery;