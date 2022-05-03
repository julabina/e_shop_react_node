import React, { useState } from 'react';

const CartLocation = (props) => {

    const [toggleStatus, setToggleStatus] = useState(false);
    const [togglelocation, setTogglelocation] = useState(false);
    const [checkBox, setCheckBox] = useState([false, false])
    const [inputs, setInputs] = useState({
        civilite: 'M.',
        firstName: "",
        lastName: "",
        mail: "",
        mobile: "",
        tel: "",
        societe: "",
        fax: "",
        tva: "",
        siret: "",
        address: "",
        addressComp: "",
        zipCode: "",
        city: "",
        deliveryAddress: "",
        deliveryAddressComp: "",
        deliveryZipCode: "",
        deliveryCity: "",
        instruction: ""
    })


    const changeToggleStatus = () => {
        setToggleStatus(!toggleStatus);
    }

    const changeSameLocation = () => {
        setTogglelocation(!togglelocation);
    }

    const toggleCheckBox = (checkbox) => {
        let newArr = checkBox;
        if (checkbox === "letter") {
            newArr[0] = !newArr[0]
        } else if (checkbox === 'advertisement') {
            newArr[1] = !newArr[1]
        }
        setCheckBox(newArr);
    }

    const changeInput = (action, value) => {
        if (action === 'civiliteSelect') {
            const newObj = {
                ...inputs,
                civilite: value
            }
            setInputs(newObj)
        } else if (action === 'firstName') {
            const newObj = {
                ...inputs,
                firstName: value
            }        
            setInputs(newObj)
        } else if (action === 'lastName') {
            const newObj = {
                ...inputs,
                lastName: value
            }            
            setInputs(newObj)
        } else if (action === 'mail') {
            const newObj = {
                ...inputs,
                mail : value
            }           
            setInputs(newObj)
        } else if (action === 'mobile') {   
            const newObj = {
                ...inputs,
                mobile : value
            }
            setInputs(newObj)
        } else if (action === 'tel') {
            const newObj = {
                ...inputs,
                tel : value
            }
            setInputs(newObj)
            
        } else if (action === 'societe') {
            const newObj = {
                ...inputs,
                societe : value
            }
            
            setInputs(newObj)
        } else if (action === 'fax') {
            const newObj = {
                ...inputs,
                fax : value
            }
            setInputs(newObj)
            
        } else if (action === 'tva') {
            const newObj = {
                ...inputs,
                tva : value
            }
            
            setInputs(newObj)
        } else if (action === 'siret') {
            const newObj = {
                ...inputs,
                siret : value
            }
            
            setInputs(newObj)
        } else if (action === 'address') {
            const newObj = {
                ...inputs,
                address : value
            }
            
            setInputs(newObj)
        } else if (action === 'addressComp') {
            const newObj = {
                ...inputs,
                addressComp : value
            }
            
            setInputs(newObj)
        } else if (action === 'zipCode') {
            const newObj = {
                ...inputs,
                zipCode : value
            }
            
            setInputs(newObj)
        } else if (action === 'city') {
            const newObj = {
                ...inputs,
                city : value
            }
            
            setInputs(newObj)
        } else if (action === 'deliveryAddress') {
            const newObj = {
                ...inputs,
                deliveryAddress : value
            }
            setInputs(newObj)
        } else if (action === 'deliveryAddressComp') {
            const newObj = {
                ...inputs,
                deliveryAddressComp : value
            }
            setInputs(newObj)
        } else if (action === 'deliveryZipCode') {
            const newObj = {
                ...inputs,
                deliveryZipCode : value
            }
            setInputs(newObj)
        } else if (action === 'deliveryCity') {
            const newObj = {
                ...inputs,
                deliveryCity : value
            }
            setInputs(newObj)
        } else if (action === 'instruction') {
            const newObj = {
                ...inputs,
                instruction : value
            }
            setInputs(newObj)
        } 
    }

    const errorDisplay = (message, input, span, valid) => {
        const spanError = document.querySelector('.' + span + '__span');
        const inputError = document.getElementById(input);

        spanError.textContent = message;

        if (valid) {
            inputError.classList.remove('cartStepLocation__individual__inputs__errorInput');
        } else {
            inputError.classList.add('cartStepLocation__individual__inputs__errorInput');
        }
        
    }

    const verifyInfosForm = () => {
        const inputs = document.querySelectorAll('.cartStepLocation__individual__inputs');
        console.log(inputs);

        // vérification prenom
        if(inputs[0].value === "") {
            errorDisplay("Le prénom ne doit pas être vide.","firstName", "cartStepLocation__individual__names__firstName")
        } else if (!inputs[0].value.match(/^[a-zA-Zé èà]*$/)) {
            errorDisplay("Le prénom ne doit comporter que des lettres.","firstName", "cartStepLocation__individual__names__firstName")
        } else {
            errorDisplay("", "firstName", "cartStepLocation__individual__names__firstName", true)
        }




        /* props.next(); */
    }


    return (
        <>
                <h2 className='cart__title'>Information client</h2>
                <div className="cart__btns">
                    <div className="cart__btns__options">
                        <button onClick={props.previous} id='backToCart' className='cart__btns__options__btn'>Retour au panier</button>
                    </div>
                    <button onClick={() => verifyInfosForm()} className='cart__btns__orderBtn'>Continuer</button>
                </div>

                <p className='cartStepLocation__infosOblig'>Les zones marquées par un astérisque sont obligatoires.</p>

                <div className="cartStepLocation__status">
                    <input defaultChecked onInput={changeToggleStatus} type="radio" name="status" id="individual" />
                    <label htmlFor="individual">Je suis un particulier</label>
                    <input onInput={changeToggleStatus} type="radio" name="status" id="business" />
                    <label htmlFor="business">Je suis une entreprise</label>
                </div>
 
                        <form className="cartStepLocation__individual">
                            <div className="cartStepLocation__individual__names">
                                <div className='cartStepLocation__individual__names__civ'>
                                    <label htmlFor="civ">Civilité<span> *</span></label>
                                    <select onChange={(e) => changeInput('civiliteSelect', e.target.value)} defaultValue={"M."} value={inputs.civilite} required name="" id="civ">
                                        <option value="M.">M.</option>
                                        <option value="Mme">Mme</option>
                                        <option value="Mlle">Mlle</option>
                                    </select>
                                </div>
                                <div className='cartStepLocation__individual__names__name cartStepLocation__individual__names__firstName'>
                                    <label htmlFor="firstName">Prénom<span> *</span></label>
                                    <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('firstName', e.target.value)} value={inputs.firstName} type="text" name="" id="firstName" required />
                                    <span className='cartStepLocation__individual__names__firstName__span cartStepLocation__individual__errorSpan'></span>
                                </div>
                                <div className='cartStepLocation__individual__names__name cartStepLocation__individual__names__lastName'>
                                    <label htmlFor="lastName">Nom<span> *</span></label>
                                    <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('lastName', e.target.value)} value={inputs.lastName} type="text" name="" id="lastName" required/>
                                </div>
                            </div>
                            <div className="cartStepLocation__individual__contacts">
                                <div className='cartStepLocation__individual__contacts__mail'>
                                    <label htmlFor="mail">Adress e-mail<span> *</span></label>
                                    <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('mail', e.target.value)} value={inputs.mail} type="mail" name="" id="mail" required/>
                                </div>
                                <div className="cartStepLocation__individual__contacts__phones">
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="mobile">Téléphone portable<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('mobile', e.target.value)} value={inputs.mobile} type="tel" name="" id="mobile" required />
                                    </div>
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="fixe">Téléphone fixe</label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('tel', e.target.value)}  value={inputs.tel} type="tel" name="" id="fixe" />
                                    </div>
                                </div>
                            </div>
                            <div className="cartStepLocation__individual__newsletter">
                                <div className="cartStepLocation__individual__newsletter__checkBoxCont">
                                    <input className="cartStepLocation__individual__inputs" onChange={() => toggleCheckBox('letter')} on type="checkbox" name="" id="newsletter" />
                                    <label htmlFor="newsletter">Je souhaite recevoir votre lettre d'informations commerciales.</label>
                                </div>
                                <div className="cartStepLocation__individual__newsletter__checkBoxCont">
                                    <input className="cartStepLocation__individual__inputs" onChange={() => toggleCheckBox('advertisement')} type="checkbox" name="" id="advertisement" />
                                    <label htmlFor="advertisement">Je souhaite recevoir vos campagnes SMS.</label>
                                </div>
                            </div>

                            {toggleStatus && 
                                <div className="cartStepLocation__business">
                                    <div className="cartStepLocation__business__row">
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">Société<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('societe', e.target.value)} value={inputs.societe} type="text" name="" id="" />
                                        </div>
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">Télécopie</label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('fax', e.target.value)} value={inputs.fax} type="tel" name="" id="" />
                                        </div>
                                    </div>
                                    <div className="cartStepLocation__business__row">
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">N° de TVA intra-communautaire<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('tva', e.target.value)} value={inputs.tva} type="text" name="" id="" />
                                        </div>
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">N° SIRET<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('siret', e.target.value)} value={inputs.siret} type="number" name="" id="" />
                                        </div>
                                    </div>
                                </div>
                            }

                            <h2 className='cartStepLocation__title'>Adresse de facturation</h2>

                            <div className="cartStepLocation__individual__billLocation">
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Adresse<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('address', e.target.value)} value={inputs.address} type="text" name="" id="" required />
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Complément d'adresse</label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('addressComp', e.target.value)} value={inputs.addressComp} type="text" name="" id="" />
                                    </div>
                                </div>
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Code postal<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('zipCode', e.target.value)} value={inputs.zipCode} type="number" name="" id="" required />
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Ville<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('city', e.target.value)} value={inputs.city} type="text" name="" id="" required />
                                    </div>
                                </div>
                            </div>

                            <h2 className='cartStepLocation__title'>Adresse de livraison</h2>

                            <div className="cartStepLocation__individual__sameLocation">
                                <input className="cartStepLocation__individual__inputs" onInput={changeSameLocation} type="checkbox" name="" id="sameLocation" defaultChecked/>
                                <label htmlFor="sameLocation">Même adresse que la facturation.</label>
                            </div>

                            {togglelocation && 
                                <div className="cartStepLocation__individual__notSameLocation">
                                    <div className='cartStepLocation__individual__notSameLocation__row'>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Adresse<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryAddress', e.target.value)} value={inputs.deliveryAddress} type="text" name="" id="" required />
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Complément d'adresse</label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryAddressComp', e.target.value)} value={inputs.deliveryAddressComp} type="text" name="" id="" />
                                        </div>
                                    </div>
                                    <div className='cartStepLocation__individual__notSameLocation__row'>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Code postal<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryZipCode', e.target.value)} value={inputs.deliveryZipCode} type="number" name="" id="" required />
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Ville<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryCity', e.target.value)} value={inputs.deliveryCity} type="text" name="" id="" required />
                                        </div>
                                    </div>
                                </div>
                            }

                            <h2 className='cartStepLocation__title'>Divers</h2>
                            
                            <div className='cartStepLocation__individual__divers'>
                                <label htmlFor="">Instructions spéciales</label>
                                <textarea onChange={(e) => changeInput('instruction', e.target.value)} value={inputs.instruction} name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </form>        


                <div className="cart__articles__orderBtn">
                    <button onClick={() => verifyInfosForm()} className='cart__btns__orderBtn'>continuer</button>
                </div>
            </>
    );
};

export default CartLocation;