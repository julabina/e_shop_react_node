import React, { useState } from 'react';

const CartLocation = () => {

    const [toggleStatus, setToggleStatus] = useState(true);
    const [togglelocation, setTogglelocation] = useState(false);


    const changeToggleStatus = () => {
        setToggleStatus(!toggleStatus);
    }

    const changeSameLocation = () => {
        setTogglelocation(!togglelocation);
    }


    return (
        <>
                <h2 className='cart__title'>Information client</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button id='backToCart' className='cart__btns__options__btn'>Retour au panier</button>
                    </div>
                    <button className='cart__btns__orderBtn'>Continuer</button>
                </div>

                <p className='cartStepLocation__infosOblig'>Les zones marquées par un astérisque sont obligatoires.</p>

                <div className="cartStepLocation__status">
                    <input defaultChecked onInput={changeToggleStatus} type="radio" name="status" id="individual" />
                    <label htmlFor="individual">Je suis un particulier</label>
                    <input onInput={changeToggleStatus} type="radio" name="status" id="business" />
                    <label htmlFor="business">Je suis une entreprise</label>
                </div>

                {
                    toggleStatus ? 
                        <form className="cartStepLocation__individual">
                            <div className="cartStepLocation__individual__names">
                                <div className='cartStepLocation__individual__names__civ'>
                                    <label htmlFor="civ">Civilité<span> *</span></label>
                                    <select defaultValue={"monsieur"} required name="" id="civ">
                                        <option value="monsieur">M.</option>
                                        <option value="madame">Mme</option>
                                        <option value="mzel">Mlle</option>
                                    </select>
                                </div>
                                <div className='cartStepLocation__individual__names__name'>
                                    <label htmlFor="firstName">Prénom<span> *</span></label>
                                    <input type="text" name="" id="firstName" required />
                                </div>
                                <div className='cartStepLocation__individual__names__name'>
                                <label htmlFor="lastName">Nom<span> *</span></label>
                                    <input type="text" name="" id="lastName" required/>
                                </div>
                            </div>
                            <div className="cartStepLocation__individual__contacts">
                                <div className='cartStepLocation__individual__contacts__mail'>
                                    <label htmlFor="mail">Adress e-mail<span> *</span></label>
                                    <input type="mail" name="" id="mail" required/>
                                </div>
                                <div className="cartStepLocation__individual__contacts__phones">
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="mobile">Téléphone portable<span> *</span></label>
                                        <input type="tel" name="" id="mobile" required />
                                    </div>
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="fixe">Téléphone fixe</label>
                                        <input type="tel" name="" id="fixe" />
                                    </div>
                                </div>
                            </div>
                            <div className="cartStepLocation__individual__newsletter">
                                <div className="cartStepLocation__individual__newsletter__checkBoxCont">
                                    <input type="checkbox" name="" id="newsletter" />
                                    <label htmlFor="newsletter">Je souhaite recevoir votre lettre d'informations commerciales.</label>
                                </div>
                                <div className="cartStepLocation__individual__newsletter__checkBoxCont">
                                    <input type="checkbox" name="" id="pub" />
                                    <label htmlFor="pub">Je souhaite recevoir vos campagnes SMS.</label>
                                </div>
                            </div>

                            <h2 className='cartStepLocation__title'>Adresse de facturation</h2>

                            <div className="cartStepLocation__individual__billLocation">
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Adresse<span> *</span></label>
                                        <input type="text" name="" id="" />
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Complément d'adresse</label>
                                        <input type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Code postal<span> *</span></label>
                                        <input type="number" name="" id="" />
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Ville<span> *</span></label>
                                        <input type="text" name="" id="" />
                                    </div>
                                </div>
                            </div>

                            <h2 className='cartStepLocation__title'>Adresse de livraison</h2>

                            <div className="cartStepLocation__individual__sameLocation">
                                <input onInput={changeSameLocation} type="checkbox" name="" id="sameLocation" defaultChecked/>
                                <label htmlFor="sameLocation">Même adresse que la facturation.</label>
                            </div>

                            {togglelocation && 
                                <div className="cartStepLocation__individual__notSameLocation">
                                    <div className='cartStepLocation__individual__notSameLocation__row'>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Adresse<span> *</span></label>
                                            <input type="text" name="" id="" />
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Complément d'adresse</label>
                                            <input type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className='cartStepLocation__individual__notSameLocation__row'>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Code postal<span> *</span></label>
                                            <input type="number" name="" id="" />
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Ville<span> *</span></label>
                                            <input type="text" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            }

                            <h2 className='cartStepLocation__title'>Divers</h2>
                            
                            <div className='cartStepLocation__individual__divers'>
                                <label htmlFor="">Instructions spéciales</label>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </form>
                    : 
                        <div className="cartStepLocation__business">

                        </div>         
                }


                <div className="cart__articles__orderBtn">
                    <button className='cart__btns__orderBtn'>continuer</button>
                </div>
            </>
    );
};

export default CartLocation;