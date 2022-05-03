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

    // Ajoute des champs si le client est une société
    const changeToggleStatus = () => {
        setToggleStatus(!toggleStatus);
    }

    // verifie si l' adresse et l'adresse de livraison sont les memes
    const changeSameLocation = () => {
        setTogglelocation(!togglelocation);
    }

    // verifie si cocher ou non
    const toggleCheckBox = (checkbox) => {
        let newArr = checkBox;
        if (checkbox === "letter") {
            newArr[0] = !newArr[0]
        } else if (checkbox === 'advertisement') {
            newArr[1] = !newArr[1]
        }
        setCheckBox(newArr);
    }

    // controler les inputs
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

    // Affiche les erreurs
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


    // Verifier les champs du formulaire
    const verifyInfosForm = () => {
        const inputs = document.querySelectorAll('.cartStepLocation__individual__inputs');
        const textArea = document.getElementById('instruction');
        let totalCheck = 0;

        // vérification prenom
        if(inputs[0].value === "") {
            errorDisplay("Le prénom ne doit pas être vide.","firstName", "cartStepLocation__individual__names__firstName")
        } else if (inputs[0].value.length < 3 || inputs[0].value.length > 25) {
            errorDisplay("Le prénom doit être compris entre 2 et 25 caratères.","firstName", "cartStepLocation__individual__names__firstName")
        } else if (!inputs[0].value.match(/^[a-zA-Zé èà]*$/)) {
            errorDisplay("Le prénom ne doit comporter que des lettres.","firstName", "cartStepLocation__individual__names__firstName")
        } else {
            errorDisplay("", "firstName", "cartStepLocation__individual__names__firstName", true)
            totalCheck += 1;
        }
        
        // vérification nom
        if(inputs[1].value === "") {
            errorDisplay("Le nom ne doit pas être vide.","lastName", "cartStepLocation__individual__names__lastName")
        } else if (inputs[1].value.length < 3 || inputs[1].value.length > 25) {
            errorDisplay("Le nom doit être compris entre 2 et 25 caratères.","lastName", "cartStepLocation__individual__names__lastName")
        } else if (!inputs[1].value.match(/^[a-zA-Zé èà]*$/)) {
            errorDisplay("Le nom ne doit comporter que des lettres.","lastName", "cartStepLocation__individual__names__lastName")
        } else {
            errorDisplay("", "lastName", "cartStepLocation__individual__names__lastName", true)
            totalCheck += 1;
        }

        // vérification mail
        if(inputs[2].value === "") {
            errorDisplay("Le mail ne doit pas être vide.","mail", "cartStepLocation__individual__names__mail")
        } else if (!inputs[2].value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
            errorDisplay("Le mail n'a pas un format valide. ","mail", "cartStepLocation__individual__names__mail")
        } else {
            errorDisplay("", "mail", "cartStepLocation__individual__names__mail", true)
            totalCheck += 1;
        }

        // vérification mobile
        if(inputs[3].value === "") {
            errorDisplay("Le mobile ne doit pas être vide.","mobile", "cartStepLocation__individual__names__mobile")
        } else if (!inputs[3].value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
            errorDisplay("Le mobile n'a pas un format valide'. ","mobile", "cartStepLocation__individual__names__mobile")
        } else {
            errorDisplay("", "mobile", "cartStepLocation__individual__names__mobile", true)
            totalCheck += 1;
        }
        
        // vérification fixe si pas vide
        if (inputs[4].value !== "") {
            if (!inputs[4].value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
                errorDisplay("Le fixe n'a pas un format valide. ","fixe", "cartStepLocation__individual__names__fixe")
            } else {
                errorDisplay("", "fixe", "cartStepLocation__individual__names__fixe", true)
                totalCheck += 1;
            }
        } else {
            totalCheck += 1;
        }      

        let indPro = 0;

        // SI LE CLIENT EST UNE SOCIETE
        if (toggleStatus) {
            
            // verification nom societé
            if(inputs[7].value === "") {
                errorDisplay("La société ne doit pas être vide.","societe", "cartStepLocation__individual__names__societe")
            } else if (!inputs[7].value.match(/^[a-zA-Zé èà0-9\s,.'-]{3,}$/)) {
                errorDisplay("La société n'a pas un format valide'. ","societe", "cartStepLocation__individual__names__societe")
            } else {
                errorDisplay("", "societe", "cartStepLocation__individual__names__societe", true)
                totalCheck += 1;
            }
            
            // verification fax
            if(inputs[8].value !== "") {
                if (!inputs[8].value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
                    errorDisplay("L'adresse n'a pas un format valide. ","fax", "cartStepLocation__individual__names__fax")
                } else {
                    errorDisplay("", "fax", "cartStepLocation__individual__names__fax", true)
                    totalCheck += 1;
                }
            } else {
                totalCheck += 1;
            }
            
            // verification tva
            if(inputs[9].value === "") {
                errorDisplay("Le numéro de tva ne doit pas être vide.","tva", "cartStepLocation__individual__names__tva")
            } else if (!inputs[9].value.match(/^(FR){0,1}[0-9A-Z]{2}\ [0-9]{9}$/)) {
                errorDisplay("Le numéro de tva n'a pas un format valide, n'indiquer pas FR. ","tva", "cartStepLocation__individual__names__tva")
            } else {
                errorDisplay("", "tva", "cartStepLocation__individual__names__tva", true)
                totalCheck += 1;
            }
            
            // verification siret
            if(inputs[10].value === "") {
                errorDisplay("Le siret ne doit pas être vide.","siret", "cartStepLocation__individual__names__siret")
            } else if (!inputs[10].value.match(/^[0-9]{9}$/)) {
                errorDisplay("Le siret n'a pas un format valide. ","siret", "cartStepLocation__individual__names__siret")
            } else {
                errorDisplay("", "siret", "cartStepLocation__individual__names__siret", true)
                totalCheck += 1;
            }


            indPro = 4;
        } else {
            indPro = 0;
        }
        // vérification adresse
        if(inputs[7 + indPro].value === "") {
            errorDisplay("L'adresse ne doit pas être vide.","billAddress", "cartStepLocation__individual__names__billAddress")
        } else if (!inputs[7 + indPro].value.match(/^[a-zA-Zé èà0-9\s,.'-]{3,}$/)) {
            errorDisplay("L'adresse n'a pas un format valide'. ","billAddress", "cartStepLocation__individual__names__billAddress")
        } else {
            errorDisplay("", "billAddress", "cartStepLocation__individual__names__billAddress", true)
            totalCheck += 1;
        }
        
        // vérification complement adresse
        if(inputs[8 + indPro].value !== "") {
            if (!inputs[8 + indPro].value.match(/^[a-zA-Zé èà0-9\s,.'-]{3,}$/)) {
                errorDisplay("Le complément d'adresse n'a pas un format valide'. ","billCompAddress", "cartStepLocation__individual__names__billCompAddress")
            } else {
                errorDisplay("", "billCompAddress", "cartStepLocation__individual__names__billCompAddress", true)
                totalCheck += 1;
            }
        } else {
            totalCheck += 1;
        }
        
        // vérification code postal
        if(inputs[9 + indPro].value === "") {
            errorDisplay("Le code postal ne doit pas être vide.","billZipCode", "cartStepLocation__individual__names__billZipCode")
        } else if (!inputs[9 + indPro].value.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/)) {
            errorDisplay("Le code postal n'a pas un format valide'. ","billZipCode", "cartStepLocation__individual__names__billZipCode")
        } else {
            errorDisplay("", "billZipCode", "cartStepLocation__individual__names__billZipCode", true)
            totalCheck += 1;
        }
        
        // vérification nom ville
        if(inputs[10 + indPro].value === "") {
            errorDisplay("Le ville ne doit pas être vide.","billCity", "cartStepLocation__individual__names__billCity")
        } else if (inputs[10 + indPro].value.length < 3 || inputs[10 + indPro].value.length > 30) {
            errorDisplay("La ville doit avoir entre 2 et 30 caratères.","billCity", "cartStepLocation__individual__names__billCity")
        } else if (!inputs[10 + indPro].value.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
            errorDisplay("La ville n'a pas un format valide'. ","billCity", "cartStepLocation__individual__names__billCity")
        } else {
            errorDisplay("", "billCity", "cartStepLocation__individual__names__billCity", true)
            totalCheck += 1;
        }


        // SI L'ADRESSE DE LIVRAISON N'EST PAS LA MEME QUE LA FACTURATION
        if (togglelocation) {

            // vérification livraison adresse
            if(inputs[12 + indPro].value === "") {
                errorDisplay("L'adresse ne doit pas être vide.","deliveryAddress", "cartStepLocation__individual__names__deliveryAddress")
            } else if (!inputs[12 + indPro].value.match(/^[a-zA-Zé èà0-9\s,.'-]{3,}$/)) {
                errorDisplay("L'adresse n'a pas un format valide'. ","deliveryAddress", "cartStepLocation__individual__names__deliveryAddress")
            } else {
                errorDisplay("", "deliveryAddress", "cartStepLocation__individual__names__deliveryAddress", true)
                totalCheck += 1;
            }
            
            // vérification livraison complement adresse
            if(inputs[13 + indPro].value !== "") {
                if (!inputs[13 + indPro].value.match(/^[a-zA-Zé èà0-9\s,.'-]{3,}$/)) {
                    errorDisplay("Le complément d'adresse n'a pas un format valide'. ","deliveryCompAddress", "cartStepLocation__individual__names__deliveryCompAddress")
                } else {
                    errorDisplay("", "deliveryCompAddress", "cartStepLocation__individual__names__deliveryCompAddress", true)
                    totalCheck += 1;
                }
            } else {
                totalCheck += 1;
            }
            
            // vérification livraison code postal
            if(inputs[14 + indPro].value === "") {
                errorDisplay("Le code postal ne doit pas être vide.","deliveryZipCode", "cartStepLocation__individual__names__deliveryZipCode")
            } else if (!inputs[14 + indPro].value.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/)) {
                errorDisplay("Le code postal n'a pas un format valide'. ","deliveryZipCode", "cartStepLocation__individual__names__deliveryZipCode")
            } else {
                errorDisplay("", "deliveryZipCode", "cartStepLocation__individual__names__deliveryZipCode", true)
                totalCheck += 1;
            }
            
            // vérification livraison nom ville
            if(inputs[15 + indPro].value === "") {
                errorDisplay("Le ville ne doit pas être vide.","deliveryCity", "cartStepLocation__individual__names__deliveryCity")
            } else if (inputs[15 + indPro].value.length < 3 || inputs[15 + indPro].value.length > 30) {
                errorDisplay("La ville doit avoir entre 2 et 30 caratères.","deliveryCity", "cartStepLocation__individual__names__deliveryCity")
            } else if (!inputs[15 + indPro].value.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
                errorDisplay("La ville n'a pas un format valide'. ","deliveryCity", "cartStepLocation__individual__names__deliveryCity")
            } else {
                errorDisplay("", "deliveryCity", "cartStepLocation__individual__names__deliveryCity", true)
                totalCheck += 1;
            }
            
        }
        

        // vérification instructions spéciales
        if(textArea.value !== "") {
            if (textArea.value.length < 3 || textArea.value.length > 200) {
                errorDisplay("Les instructions doivent avoir entre 2 et 200 caratères.","instruction", "cartStepLocation__individual__names__instruction")
            } else if (!textArea.value.match(/^[a-zA-Z0-9 -/'",.!?€$%()éèçà]+$/)) {
                errorDisplay("Les caractères spéciaux ne sont pas admis. ","instruction", "cartStepLocation__individual__names__instruction")
            } else {
                errorDisplay("", "instruction", "cartStepLocation__individual__names__instruction", true)
                totalCheck += 1;
            }
        } 
        else {
            totalCheck += 1;
        }


        // if checked
        if (toggleStatus && togglelocation) {
            if (totalCheck === 18) {
                console.log('1');
                prepareInfos();
            }
        } else if (toggleStatus || togglelocation) {
            if (totalCheck === 14) {
                console.log('2');
                prepareInfos();
            }
        } else {
            if (totalCheck === 10) {
                console.log('3');
                prepareInfos();
            }
        }

    }

    // preparation avant d'envoyer les infos
    const prepareInfos = () => {

        let societe, fax, tva, siret, address, addressComp, zipCode, city

        if (toggleStatus) {
            societe = inputs.societe;
            fax = inputs.fax;
            tva = inputs.tva;
            siret = inputs.siret;
        } else {
            societe = null;
            fax = null;
            tva = null;
            siret = null;
        }
        if (togglelocation) {
            address = inputs.deliveryAddress;
            addressComp = inputs.deliveryAddressComp;
            zipCode = inputs.deliveryZipCode;
            city = inputs.deliveryCity;
        } else {
            address = null;
            addressComp = null;
            zipCode = null;
            city = null;
        }
        
        const infos = {
            civilite: inputs.civilite ,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            mail: inputs.mail,
            mobile: inputs.mobile,
            tel: inputs.tel,
            societe: societe,
            fax: fax,
            tva: tva,
            siret: siret,
            address: inputs.address,
            addressComp: inputs.addressComp,
            zipCode: inputs.zipCode,
            city: inputs.city,
            deliveryAddress: address ,
            deliveryAddressComp: addressComp,
            deliveryZipCode: zipCode,
            deliveryCity: city,
            instruction: inputs.instruction,
            newsLetter: checkBox[0],
            ad: checkBox[1]
        }

        props.sendInfos(infos);
        
        props.next();
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
                                    <label htmlFor="civ">Civilité</label>
                                    <select onChange={(e) => changeInput('civiliteSelect', e.target.value)} defaultValue={"M."} value={inputs.civilite} name="" id="civ">
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
                                    <span className='cartStepLocation__individual__names__lastName__span cartStepLocation__individual__errorSpan'></span>
                                </div>
                            </div>
                            <div className="cartStepLocation__individual__contacts">
                                <div className='cartStepLocation__individual__contacts__mail'>
                                    <label htmlFor="mail">Adress e-mail<span> *</span></label>
                                    <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('mail', e.target.value)} value={inputs.mail} type="mail" name="" id="mail" required/>
                                    <span className='cartStepLocation__individual__names__mail__span cartStepLocation__individual__errorSpan'></span>
                                </div>
                                <div className="cartStepLocation__individual__contacts__phones">
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="mobile">Téléphone portable<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('mobile', e.target.value)} value={inputs.mobile} type="tel" name="" id="mobile" required />
                                        <span className='cartStepLocation__individual__names__mobile__span cartStepLocation__individual__errorSpan'></span>
                                    </div>
                                    <div className='cartStepLocation__individual__contacts__phones__phone'>
                                        <label htmlFor="fixe">Téléphone fixe</label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('tel', e.target.value)}  value={inputs.tel} type="tel" name="" id="fixe" />
                                        <span className='cartStepLocation__individual__names__fixe__span cartStepLocation__individual__errorSpan'></span>
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
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('societe', e.target.value)} value={inputs.societe} type="text" name="" id="societe" />
                                            <span className='cartStepLocation__individual__names__societe__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">Télécopie</label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('fax', e.target.value)} value={inputs.fax} type="tel" name="" id="fax" />
                                            <span className='cartStepLocation__individual__names__fax__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                    </div>
                                    <div className="cartStepLocation__business__row">
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">N° de TVA intra-communautaire<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('tva', e.target.value)} value={inputs.tva} type="text" name="" id="tva" />
                                            <span className='cartStepLocation__individual__names__tva__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                        <div className="cartStepLocation__business__row__infos">
                                            <label htmlFor="">N° SIRET<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('siret', e.target.value)} value={inputs.siret} type="number" name="" id="siret" />
                                            <span className='cartStepLocation__individual__names__siret__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                    </div>
                                </div>
                            }

                            <h2 className='cartStepLocation__title'>Adresse de facturation</h2>

                            <div className="cartStepLocation__individual__billLocation">
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Adresse<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('address', e.target.value)} value={inputs.address} type="text" name="" id="billAddress" required />
                                        <span className='cartStepLocation__individual__names__billAddress__span cartStepLocation__individual__errorSpan'></span>
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Complément d'adresse</label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('addressComp', e.target.value)} value={inputs.addressComp} type="text" name="" id="billCompAddress" />
                                        <span className='cartStepLocation__individual__names__billCompAddress__span cartStepLocation__individual__errorSpan'></span>
                                    </div>
                                </div>
                                <div className='cartStepLocation__individual__billLocation__row'>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Code postal<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('zipCode', e.target.value)} value={inputs.zipCode} type="number" name="" id="billZipCode" required />
                                        <span className='cartStepLocation__individual__names__billZipCode__span cartStepLocation__individual__errorSpan'></span>
                                    </div>
                                    <div className="cartStepLocation__individual__billLocation__row__cont">
                                        <label htmlFor="">Ville<span> *</span></label>
                                        <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('city', e.target.value)} value={inputs.city} type="text" name="" id="billCity" required />
                                        <span className='cartStepLocation__individual__names__billCity__span cartStepLocation__individual__errorSpan'></span>
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
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryAddress', e.target.value)} value={inputs.deliveryAddress} type="text" name="" id="deliveryAddress" required />
                                            <span className='cartStepLocation__individual__names__deliveryAddress__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Complément d'adresse</label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryAddressComp', e.target.value)} value={inputs.deliveryAddressComp} type="text" name="" id="deliveryCompAddress" />
                                            <span className='cartStepLocation__individual__names__deliveryCompAddress__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                    </div>
                                    <div className='cartStepLocation__individual__notSameLocation__row'>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Code postal<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryZipCode', e.target.value)} value={inputs.deliveryZipCode} type="number" name="" id="deliveryZipCode" required />
                                            <span className='cartStepLocation__individual__names__deliveryZipCode__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                        <div className="cartStepLocation__individual__notSameLocation__row__cont">
                                            <label htmlFor="">Ville<span> *</span></label>
                                            <input className="cartStepLocation__individual__inputs" onInput={(e) => changeInput('deliveryCity', e.target.value)} value={inputs.deliveryCity} type="text" name="" id="deliveryCity" required />
                                            <span className='cartStepLocation__individual__names__deliveryCity__span cartStepLocation__individual__errorSpan'></span>
                                        </div>
                                    </div>
                                </div>
                            }

                            <h2 className='cartStepLocation__title'>Divers</h2>
                            
                            <div className='cartStepLocation__individual__divers'>
                                <label htmlFor="">Instructions spéciales</label>
                                <textarea onChange={(e) => changeInput('instruction', e.target.value)} value={inputs.instruction} name="" id="instruction" cols="30" rows="10"></textarea>
                                <span className='cartStepLocation__individual__names__instruction__span cartStepLocation__individual__errorSpan'></span>
                            </div>
                        </form>        


                <div className="cart__articles__orderBtn">
                    <button onClick={() => verifyInfosForm()} className='cart__btns__orderBtn'>continuer</button>
                </div>
            </>
    );
};

export default CartLocation;