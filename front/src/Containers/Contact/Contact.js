import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import { Helmet } from 'react-helmet';

const Contact = () => {

    const dispatch = useDispatch();

    const [contactFormData, setContactFormData] = useState({ firstName: "", lastName: "", email: "", mobile: "", message: "" });

    useEffect(() => {

        window.scrollTo(0, 0);

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    return localStorage.removeItem('token'); 
                };
                dispatch ({
                    type: 'LOG'
                });
                getInfos(token.content);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
        }; 

    },[]);

    /**
     * GET FIRSTNAME, LASTNAME, EMAIL AND MOBILE FROM USER
     * @param {*} userId 
     */
    const getInfos = (userId) => {

        fetch('https://api-e-commerce.julienlenfume.com/api/users/' + userId)
            .then(res => res.json())
            .then(data => {
                let newObj = {
                    ...contactFormData,
                    firstName: data.data.firstName === null ? "" : data.data.firstName ,
                    lastName: data.data.lastName === null ? "" : data.data.lastName,
                    email: data.data.email,
                    mobile: data.data.mobile === null ? "" : data.data.mobile,
                };
                setContactFormData(newObj);
            })
    };

    /**
     * CONTROL INPUTS
     * @param {*} action 
     * @param {*} value 
     */
    const handleInputs = (action, value) => {

        if(action === "firstName") {
            const newObj = {
                ...contactFormData,
                firstName: value
            };
            setContactFormData(newObj);
        } else if(action === "lastName") {
            const newObj = {
                ...contactFormData,
                lastName: value
            };
            setContactFormData(newObj);
        } else if(action === "email") {
            const newObj = {
                ...contactFormData,
                email: value
            };
            setContactFormData(newObj);
        } else if(action === "mobile") {
            const newObj = {
                ...contactFormData,
                mobile: value
            };
            setContactFormData(newObj);
        } else if(action === "message") {
            const newObj = {
                ...contactFormData,
                message: value
            };
            setContactFormData(newObj);
        } 
    };
    
    /**
     * VALIDATE INPUTS
     * @param {*} e 
     * @returns 
     */
    const sendMsg = (e) => {
        e.preventDefault();

        const errorCont = document.querySelector(".contact__errorCont");        
        let error = "";

        // VALIDATE FIRSTNAME
        if(contactFormData.firstName === "") {
            error += `<p>- Le prénom ne doit pas être vide.</p>`;
        } else if (contactFormData.firstName.length < 3 || contactFormData.firstName.length > 25) {
            error += `<p>- Le prénom doit être compris entre 2 et 25 caratères.</p>`;
        } else if (!contactFormData.firstName.match(/^[a-zA-Zé èà]*$/)) {
            error += `<p>- Le prénom ne doit comporter que des lettres.</p>`;
        } 
        
        // VALIDATE LASTNAME
        if(contactFormData.lastName === "") {
            error += `<p>- Le nom ne doit pas être vide.</p>`;
        } else if (contactFormData.lastName.length < 3 || contactFormData.lastName.length > 25) {
            error += `<p>- Le nom doit être compris entre 2 et 25 caratères.</p>`;
        } else if (!contactFormData.lastName.match(/^[a-zA-Zé èà]*$/)) {
            error += `<p>- Le nom ne doit comporter que des lettres.</p>`;
        } 

        // VALIDATE EMAIL
        if(contactFormData.email === "") {
            error += `<p>- Le mail ne doit pas être vide.</p>`;
        } else if (!contactFormData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
            error += `<p>- Le mail n'a pas un format valide. </p>`;
        } 

        // VALIDATE MOBILE
        if(contactFormData.mobile === "") {
        } else if (!contactFormData.mobile.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
            error += `<p>- Le mobile n'a pas un format valide'. </p>`;
        }
     
        // VALIDATE MESSAGE
        if(contactFormData.message !== "") {
            if (contactFormData.message.length < 3 || contactFormData.message.length > 200) {
                error += `<p>- Le message doit avoir entre 2 et 200 caratères.</p>`;
            } else if (!contactFormData.message.match(/^[a-zA-Z0-9 -/'",.!?€$%()éèçà]+$/)) {
                error += `<p>- Les caractères spéciaux ne sont pas admis. </p>`;
            }
        } else {
            error += `<p>- Le message ne doit pas être vide.</p>`;
        }

        if (error !== "") {
            return errorCont.innerHTML = error;
        }
        
        mailSend();

    };

    /**
     * SEND TO BACK-END, MESSAGE AND INFORMATIONS
     */
    const mailSend = () => {

        fetch('https://api-e-commerce.julienlenfume.com/api/contact/send', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method : 'POST',
            body: JSON.stringify( {message : contactFormData.message , firstName: contactFormData.firstName, lastName: contactFormData.lastName, tel: contactFormData.mobile, contactEmail : contactFormData.email} )
       
        })
            .then(res => {
                const errorCont = document.querySelector(".contact__errorCont");
                const successCont = document.querySelector(".contact__success");
                if(res.status === 200) {
                    successCont.innerHTML = `<p>Message bien envoyé.</p>`;
                    errorCont.innerHTML = "";
                    const newObj = {
                        ...contactFormData,
                        message: ""
                    };
                    setContactFormData(newObj);
                } else {
                    successCont.innerHTML = "";
                    errorCont.innerHTML = `<p>- Le message n'a pas pu être envoyé, veuillez réessayer plus tard.</p>`;
                }
            })
    };

    const testCapcha = (value) => {
        console.log(value);
    }

    return (
        <>
        <Helmet>
            <title>Page de contact - React optique shop</title>
            <meta name="title" content="Page de contact - React optique shop" />
            <meta
            name="description"
            content="Besoin de me contacter, n'hésitez pas à utilisé notre formulaire de contact."
            />
        </Helmet>
        <main>
            <section className='contact'>
                <h2>Contactez nous</h2>
                <div className="contact__separator"></div>
                <div className="contact__errorCont"></div>
                <div className="contact__success"></div>
                <form action="" className='contact__form'>
                    <div className="contact__form__row">
                        <div className="contact__form__row__inputCont">
                            <label htmlFor="contactFirstName">Prénom</label>
                            <input onInput={(e) => handleInputs("firstName", e.target.value)} value={contactFormData.firstName} type="text" id="contactFirstName" />
                        </div>
                        <div className="contact__form__row__inputCont">                            
                            <label htmlFor="contactLastName">Nom</label>
                            <input onInput={(e) => handleInputs("lastName", e.target.value)} value={contactFormData.lastName} type="text" id="contactLastName" />
                        </div>
                    </div>
                    <div className="contact__form__row">
                        <div className="contact__form__row__inputCont">
                            <label htmlFor="contactEmail">Email</label>
                            <input onInput={(e) => handleInputs("email", e.target.value)} value={contactFormData.email} type="mail" id="contactEmail" />
                        </div>
                        <div className="contact__form__row__inputCont">                            
                            <label htmlFor="contactMobile">Tel</label>
                            <input onInput={(e) => handleInputs("mobile", e.target.value)} value={contactFormData.mobile} type="number" id="contactMobile" />
                        </div>
                    </div>
                    <div className="contact__form__message">
                        <label htmlFor="contactMsg">Message</label>
                        <textarea onChange={(e) => handleInputs("message", e.target.value)} value={contactFormData.message} id="contactMsg"></textarea>
                    </div>
                    
                    <div className="contact__form__btnCont">
                        <button onClick={sendMsg}>Envoyer</button>
                    </div>
                </form>
            </section>
        </main>
        </>
    );
};

export default Contact;