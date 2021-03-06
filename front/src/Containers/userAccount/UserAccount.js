import React, { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faLock, faTruckRampBox, faAt } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';

const UserAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [toggleBusiness, setToggleBusiness] = useState(false);
    const [profilUpdateInputs, setProfilUpdateInputs] = useState({firstName: "", lastName: "", address: "", addressComp: "", zip: "", city: "", mobile: "", fixe: "", companyName: "", fax: "", siret: "", tva: "", deliveryAddress: "", deliveryAddressComp: "", deliveryZip: "", deliveryCity: "", newsletter: false, pub: false});
    const [passwordUpdateInputs, setPasswordUpdateInputs] = useState({password : "", newPassword: "", confirmNewPassword: ""});
    const [emailUpdateInputs, setEmailUpdateInputs] = useState({email: "", new: ""});
    const [successMsg, setSuccessMsg] = useState("");
    const [orderData, setOrderData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [deleteResModal, setDeleteResModal] = useState(false);

    useEffect(() => {

        let userIdToSend = "", tokenToSend = "";

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            tokenToSend = token;
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    return navigate('/login', { replace: true });
                };
                userIdToSend = decodedToken.userId;
                dispatch ({
                    type: 'LOG'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            return navigate('/login', { replace: true });
        }; 

        fetch('https://api-e-commerce.julienlenfume.com/api/users', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + tokenToSend.version
            },
            method : 'POST',
            body: JSON.stringify({ userId : userIdToSend })
        })
                .then(res => res.json())
                .then(data => {
                    
                    if (data.data.company) {
                        setToggleBusiness(true);
                    }
                    let newObj = {
                        address: data.data.address === null ? "" : data.data.address,
                        addressComp: data.data.addressComp === null ? "" : data.data.addressComp,
                        city: data.data.city === null ? "" : data.data.city,
                        companyName: data.data.companyName === null ? "" : data.data.companyName,
                        deliveryAddress: data.data.deliveryAddress === null ? "" : data.data.deliveryAddress,
                        deliveryAddressComp: data.data.deliveryAddressComp === null ? "" : data.data.deliveryAddressComp,
                        deliveryCity: data.data.deliveryCity === null ? "" : data.data.city,
                        deliveryZip: data.data.deliveryZip === null ? "" : (data.data.deliveryZip).toString(),
                        fax: data.data.fax === null ? "" : data.data.fax,
                        firstName: data.data.firstName === null ? "" : data.data.firstName,
                        fixe: data.data.fixe === null ? "" : data.data.fixe,
                        lastName: data.data.lastName === null ? "" : data.data.lastName,
                        mobile: data.data.mobile === null ? "" : data.data.mobile,
                        newsletter: data.data.newsletter === null ? false : data.data.newsletter,
                        pub: data.data.pub === null ? false : data.data.pub,
                        siret: data.data.siret === null ? "" : (data.data.siret).toString(),
                        tva: data.data.tva === null ? "" : (data.data.tva).toString(),
                        zip: data.data.zip === null ? "" : (data.data.zip).toString()
                    };
                    setProfilUpdateInputs(newObj);
                    getUserOrders(userIdToSend, tokenToSend.version);
                })
               
    },[]);
    
    /**
     * DISCONNECT USER
     */
    const logOut = () => {
        dispatch ({
            type: 'DISCONNECT'
        });
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    /**
     * GET USER ORDERS
     * @param {*} userId 
     * @param {*} token 
     */
    const getUserOrders = (userId, token) => {
        fetch('https://api-e-commerce.julienlenfume.com/api/orders/' + userId,  {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }})
                .then(res => res.json())
                .then(data => {
                    const newArr = data.data;
                    setOrderData(newArr);
                })
    };

    /**
     * TOGGLE ISCOMPANY
     */
    const isBusinessToggle = () => {
        setToggleBusiness(!toggleBusiness);
    };

    /**
     * CONTROL UPDATE PROFIL INPUTS
     * @param {*} action 
     * @param {*} value 
     */
    const ctrlInputsProfilUpdate = (action, value) => {

        if (action === "address") {
            const newObj = {
                ...profilUpdateInputs,
                address : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "addressComp") {
            const newObj = {
                ...profilUpdateInputs,
                addressComp : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "zip") {
            const newObj = {
                ...profilUpdateInputs,
                zip : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "city") {
            const newObj = {
                ...profilUpdateInputs,
                city : value
            };
            setProfilUpdateInputs(newObj);        
        } else if (action === "mobile") {
            const newObj = {
                ...profilUpdateInputs,
                mobile : value
            };
            setProfilUpdateInputs(newObj);       
        } else if (action === "fixe") {
            const newObj = {
                ...profilUpdateInputs,
                fixe : value
            };
            setProfilUpdateInputs(newObj);   
        } else if (action === "firstName") {
            const newObj = {
                ...profilUpdateInputs,
                firstName : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "lastName") {
            const newObj = {
                ...profilUpdateInputs,
                lastName : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "companyName") {
            const newObj = {
                ...profilUpdateInputs,
                companyName : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "fax") {
            const newObj = {
                ...profilUpdateInputs,
                fax : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "siret") {
            const newObj = {
                ...profilUpdateInputs,
                siret : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "tva") {
            const newObj = {
                ...profilUpdateInputs,
                tva : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "deliveryAddress") {
            const newObj = {
                ...profilUpdateInputs,
                deliveryAddress : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "deliveryAddressComp") {
            const newObj = {
                ...profilUpdateInputs,
                deliveryAddressComp : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "deliveryZip") {
            const newObj = {
                ...profilUpdateInputs,
                deliveryZip : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "deliveryCity") {
            const newObj = {
                ...profilUpdateInputs,
                deliveryCity : value
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "newsletter") {
            const newObj = {
                ...profilUpdateInputs,
                newsletter : !profilUpdateInputs.newsletter
            };
            setProfilUpdateInputs(newObj);
        } else if (action === "pub") {
            const newObj = {
                ...profilUpdateInputs,
                pub: !profilUpdateInputs.pub
            };
            setProfilUpdateInputs(newObj);
        } 
    };

    /**
     * CONTROL PASSWORD INPUT
     * @param {*} action 
     * @param {*} value 
     */
    const ctrlPasswordInputs = (action, value) => {
        if (action === "actual") {
            const newObj = {
                ...passwordUpdateInputs,
                password : value
            };
            setPasswordUpdateInputs(newObj);
        } else if (action === "new") {
            const newObj = {
                ...passwordUpdateInputs,
                newPassword : value
            };
            setPasswordUpdateInputs(newObj);
        } else if (action === "confirm") {
            const newObj = {
                ...passwordUpdateInputs,
                confirmNewPassword : value
            };
            setPasswordUpdateInputs(newObj);
        }
    };

    /**
     * CONTROL EMAIL INPUT
     * @param {*} action 
     * @param {*} value 
     */
    const ctrlEmailInputs = (action, value) => {
        if (action === "actual") {
            const newObj = {
                ...emailUpdateInputs,
                email : value
            };
            setEmailUpdateInputs(newObj);
        } else if (action === "new") {
            const newObj = {
                ...emailUpdateInputs,
                new : value
            };
            setEmailUpdateInputs(newObj);
        }
    };

    /**
     * VALIDATE AND SEND UPDATE PROFIL INFORMATIONS
     * @param {*} e 
     * @returns 
     */
    const sendProfilUpdated = (e) => {
        e.preventDefault();

        const errorCont = document.querySelector(".profilUpdate__userProfil__errorCont");
        let error = "";

        if (profilUpdateInputs.firstName !== "") {
            if(profilUpdateInputs.firstName.length < 3 || profilUpdateInputs.firstName.length > 25) {
                error += `<p>- Le pr??nom doit ??tre compris entre 2 et 25 carat??res.</p>`;
            } else if (!profilUpdateInputs.firstName.match(/^[a-zA-Z?? ????]*$/)) {
                error += `<p>- Le pr??nom ne doit comporter que des lettres.</p>`;
            }
        } 

        if (profilUpdateInputs.lastName !== "") {
            if(profilUpdateInputs.lastName.length < 3 || profilUpdateInputs.lastName.length > 25) {
                error += `<p>- Le nom doit ??tre compris entre 2 et 25 carat??res.</p>`;
            } else if (!profilUpdateInputs.lastName.match(/^[a-zA-Z?? ????]*$/)) {
                error += `<p>- Le nom ne doit comporter que des lettres.</p>`;
            }
        } 
        
        if (profilUpdateInputs.mobile !== "") {
            if (!profilUpdateInputs.mobile.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
                error += `<p>- Le mobile n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.fixe !== "") {
            if (!profilUpdateInputs.fixe.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
                error += `<p>- Le fixe n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.address !== "") {
            if (!profilUpdateInputs.address.match(/^[a-zA-Z?? ????0-9\s,.'-]{3,}$/)) {
                error += `<p>- L'adresse n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.addressComp !== "") {
            if (!profilUpdateInputs.addressComp.match(/^[a-zA-Z?? ????0-9\s,.'-]{3,}$/)) {
                error += `<p>- Le compl??ment d'adresse n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.zip !== "") {
            if (!profilUpdateInputs.zip.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/)) {
                error += `<p>- Le code postal n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.city !== "") {
            if (profilUpdateInputs.city.length < 3 || profilUpdateInputs.city.length > 25) {
                error += `<p>- La ville doit ??tre comprise entre 2 et 25 carat??res.</p>`;
            } else if (!profilUpdateInputs.city.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
                error += `<p>- La ville n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.deliveryAddress !== "") {
            if (!profilUpdateInputs.deliveryAddress.match(/^[a-zA-Z?? ????0-9\s,.'-]{3,}$/)) {
                error += `<p>- L'adresse de livraison n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.deliveryAddressComp !== "") {
            if (!profilUpdateInputs.deliveryAddressComp.match(/^[a-zA-Z?? ????0-9\s,.'-]{3,}$/)) {
                error += `<p>- Le compl??ment d'adresse de livraison n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.deliveryZip !== "") {
            if (!profilUpdateInputs.deliveryZip.match(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/)) {
                error += `<p>- Le code postal de livraison n'a pas un format valide.</p>`;
            }
        } 
        
        if (profilUpdateInputs.deliveryCity !== "") {
            if (profilUpdateInputs.deliveryCity.length < 3 || profilUpdateInputs.deliveryCity.length > 25) {
                error += `<p>- La ville doit ??tre comprise entre 2 et 25 carat??res.</p>`;
            } else if (!profilUpdateInputs.deliveryCity.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
                error += `<p>- La ville de livraison n'a pas un format valide.</p>`;
            }
        } 
        
       if(toggleBusiness) {            
                if (profilUpdateInputs.companyName !== "") {
                    if (profilUpdateInputs.companyName.length < 3 || profilUpdateInputs.companyName.length > 25) {
                        error += `<p>- Le nom de la soci??t?? doit ??tre comprise entre 2 et 25 carat??res.</p>`;
                    } else if (!profilUpdateInputs.companyName.match(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/)) {
                        error += `<p>- Le nom de la soci??t?? n'a pas un format valide.</p>`;
                    }
                } 

                if (profilUpdateInputs.fax !== "") {
                    if (!profilUpdateInputs.fax.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
                        error += `<p>- Le fax n'a pas un format valide.</p>`;
                    }
                } 

                if (profilUpdateInputs.siret !== "") {
                    if (!profilUpdateInputs.siret.match(/^[0-9]{9}$/)) {
                        error += `<p>- Le siret n'a pas un format valide.</p>`;
                    }
                } 

                if (profilUpdateInputs.tva !== "") {
                    if (!profilUpdateInputs.tva.match(/^(FR){0,1}[0-9A-Z]{2}\ [0-9]{9}$/)) {
                        error += `<p>- La tva n'a pas un format valide.</p>`;
                    }
                } 
        }

        if (error !== "") {
            window.scrollTo(0,0);
            return errorCont.innerHTML = error;
        }

        let newObj = {
            address: profilUpdateInputs.address === "" ? null : profilUpdateInputs.address,
            addressComp: profilUpdateInputs.addressComp === "" ? null : profilUpdateInputs.addressComp,
            city: profilUpdateInputs.city === "" ? null : profilUpdateInputs.city,
            companyName: profilUpdateInputs.companyName === "" ? null : profilUpdateInputs.companyName,
            deliveryAddress: profilUpdateInputs.deliveryAddress === "" ? null : profilUpdateInputs.deliveryAddress,
            deliveryAddressComp: profilUpdateInputs.deliveryAddressComp === "" ? null : profilUpdateInputs.deliveryAddressComp,
            deliveryCity: profilUpdateInputs.deliveryCity === "" ? null : profilUpdateInputs.deliveryCity,
            deliveryZip: profilUpdateInputs.deliveryZip === "" ? null : profilUpdateInputs.deliveryZip,
            fax: profilUpdateInputs.fax === "" ? null : profilUpdateInputs.fax,
            firstName: profilUpdateInputs.firstName === "" ? null : profilUpdateInputs.firstName,
            fixe: profilUpdateInputs.fixe === "" ? null : profilUpdateInputs.fixe,
            lastName: profilUpdateInputs.lastName === "" ? null : profilUpdateInputs.lastName,
            mobile: profilUpdateInputs.mobile === "" ? null : profilUpdateInputs.mobile,
            newsletter: profilUpdateInputs.newsletter === "" ? false : profilUpdateInputs.newsletter,
            pub: profilUpdateInputs.pub === "" ? false : profilUpdateInputs.pub,
            siret: profilUpdateInputs.siret === "" ? null : profilUpdateInputs.siret,
            tva: profilUpdateInputs.tva === "" ? null : profilUpdateInputs.tva,
            zip: profilUpdateInputs.zip === "" ? null : profilUpdateInputs.zip
        };

        let userIdToSend = "", tokenToSend = "";

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            tokenToSend = token;
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    return navigate('/login', { replace: true });
                };
                userIdToSend = decodedToken.userId;
                dispatch ({
                    type: 'LOG'
                });
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            return navigate('/login', { replace: true });
        }; 

        fetch('https://api-e-commerce.julienlenfume.com/api/users/' + userIdToSend, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + tokenToSend.version
            },
            method : 'PUT',
            body: JSON.stringify( newObj )
        })
              .then(res => {
               if (res.status === 200) {
                    setSuccessMsg("Infos personnelles bien modifi??es !");
                    errorCont.innerHTML = "";
                    closeSectionToModify();
                    
                    window.scrollTo(0,0);
                } 
            })
            .catch(error => {
                return errorCont.innerHTML = error;
            }) 
        
    };  

    /**
     * CLOSE MODIFY SECTION
     */
    const closeSectionToModify = () => {

        const modifySections = document.querySelectorAll('.profilUpdate__part');
        const btns = document.querySelectorAll('.profil__options__row__link');
    
        for (let i = 0; i < modifySections.length; i++) {
            modifySections[i].classList.remove('profilUpdate__part--visible');
            btns[i].classList.remove('profil__options__row__link--active');
        }
    };

    /**
     * OPEN MODIFY TAB
     * @param {*} tab 
     */
    const openModifyTab = (tab) => {

        const modifySections = document.querySelectorAll('.profilUpdate__part');
        const btns = document.querySelectorAll('.profil__options__row__link');

        closeSectionToModify();
        
        if(tab === "infos") {
            modifySections[0].classList.add('profilUpdate__part--visible');
            btns[0].classList.add('profil__options__row__link--active');
        } else if(tab === "order") {
            modifySections[1].classList.add('profilUpdate__part--visible');
            btns[1].classList.add('profil__options__row__link--active');      
        } else if(tab === "password") {
            modifySections[2].classList.add('profilUpdate__part--visible');
            btns[2].classList.add('profil__options__row__link--active');     
        } else if(tab === "email") {
            modifySections[3].classList.add('profilUpdate__part--visible');
            btns[3].classList.add('profil__options__row__link--active');
        }

        setSuccessMsg('');
    };

    /**
     * VALIDATE AND SEND PASSWORD TO BACK-END
     * @param {*} e 
     * @returns 
     */
    const updatePassword = (e) => {
        e.preventDefault();

        const errorCont = document.querySelector('.profilUpdate__password__errorCont');

        errorCont.innerHTML = '';

        if(passwordUpdateInputs.newPassword === "" || passwordUpdateInputs.password === "" || passwordUpdateInputs.confirmNewPassword === "") {
            return errorCont.innerHTML = `<p>- Tous les champs sont requis.</p>`;
        }
        
        if (!passwordUpdateInputs.newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)) {
            return errorCont.innerHTML = `<p>- Le nouveau mot de passe doit contenir minimun 1 lettre 1 chiffre 1 lettre majuscule et 8 caract??res.</p>`;
        }
        if(passwordUpdateInputs.newPassword !== passwordUpdateInputs.confirmNewPassword) {
            return errorCont.innerHTML = `<p>- Le nouveau mot de passe doit etre identique au mot de passe de confirmation.</p>`;
        }
        if(passwordUpdateInputs.password === passwordUpdateInputs.newPassword) {
            return errorCont.innerHTML = `<p>- Le nouveau mot de passe ne doit pas ??tre identique ?? l'ancien.</p>`;
        }

       let userIdToSend = "", tokenToSend = "";

       if (localStorage.getItem('token') !== null) {
        let getToken = localStorage.getItem('token');
        let token = JSON.parse(getToken);
        tokenToSend = token;
        if (token !== null) {
            let decodedToken = decodeToken(token.version);
            let isTokenExpired = isExpired(token.version);
            if (decodedToken.userId !== token.content || isTokenExpired === true) {
                dispatch ({
                    type: 'DISCONNECT'
                });
                localStorage.removeItem('token');
                return navigate('/login', { replace: true });
            };
            userIdToSend = decodedToken.userId;
            dispatch ({
                type: 'LOG'
            });
        };
    } else {
        dispatch ({
            type: 'DISCONNECT'
        });
        return navigate('/login', { replace: true });
    }; 


        fetch('https://api-e-commerce.julienlenfume.com/api/users/password/' + userIdToSend, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + tokenToSend.version
            },
            method : 'PUT',
            body: JSON.stringify( {password : passwordUpdateInputs.newPassword} )
        })
            .then(res => {
                 if (res.status === 200) {
                    setSuccessMsg("Mot de passe modifi?? !");
            
                    closeSectionToModify();
                    const newObj = {
                        password : "",
                        newPassword: "", 
                        confirmNewPassword: ""
                    };
                    setPasswordUpdateInputs(newObj);
                    window.scrollTo(0,0);
                } 
            })
            .catch(error => {
                return errorCont.innerHTML = '';
            }) 

            
    };
        
    /**
     * VALIDATE AND SEND NEW EMAIL TO BACK-END
     * @param {*} e 
     * @returns 
     */
    const updateMail = (e) => {
        e.preventDefault();

        const errorCont = document.querySelector('.profilUpdate__email__errorCont');

        errorCont.innerHTML = '';
        
        if (emailUpdateInputs.email === "" || emailUpdateInputs.new === "") {
            return errorCont.innerHTML = `<p>- Tous les champs sont requis.</p>`;
        }
        if (!emailUpdateInputs.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i) || !emailUpdateInputs.new.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i)) {
            return errorCont.innerHTML = `<p>- Mauvais format d'email.</p>`;         
        }
        if (emailUpdateInputs.email === emailUpdateInputs.new) {
            return errorCont.innerHTML = `<p>- L'ancien email ne doit pas ??tre identique au nouveau.</p>`;
        }

        let userIdToSend = "", tokenToSend = "";

       if (localStorage.getItem('token') !== null) {
        let getToken = localStorage.getItem('token');
        let token = JSON.parse(getToken);
        tokenToSend = token;
        if (token !== null) {
            let decodedToken = decodeToken(token.version);
            let isTokenExpired = isExpired(token.version);
            if (decodedToken.userId !== token.content || isTokenExpired === true) {
                dispatch ({
                    type: 'DISCONNECT'
                });
                localStorage.removeItem('token');
                return navigate('/login', { replace: true });
            };
            userIdToSend = decodedToken.userId;
            dispatch ({
                type: 'LOG'
            });
        };
    } else {
        dispatch ({
            type: 'DISCONNECT'
        });
        return navigate('/login', { replace: true });
    }; 
        fetch('https://api-e-commerce.julienlenfume.com/api/users/email/' + userIdToSend, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + tokenToSend.version
            },
            method : 'PUT',
            body: JSON.stringify({email: emailUpdateInputs.email , new: emailUpdateInputs.new})
        })
            .then(res => {
                 if (res.status === 200) {
                    setSuccessMsg("Adresse email modifi?? !");
                    let newObj = {
                        email: "", 
                        new: ""
                    };
                    setEmailUpdateInputs(newObj);
                    closeSectionToModify();
                    
                    window.scrollTo(0,0);
                } else if(res.status === 401) {
                    errorCont.innerHTML = "- L'email ne correspond pas.";
                } else {
                    errorCont.innerHTML = "- Un probleme est survenu.";
                }
            })
            .catch(error => {
                return errorCont.innerHTML = '';
            }) 
    };

    /**
     * IF  LOGGED DELETE ACCOUNT
     * @returns 
     */
    const handleDeleteAccount = () => {

        let userIdToSend = "", tokenToSend = "";

       if (localStorage.getItem('token') !== null) {
        let getToken = localStorage.getItem('token');
        let token = JSON.parse(getToken);
        tokenToSend = token;
        if (token !== null) {
            let decodedToken = decodeToken(token.version);
            let isTokenExpired = isExpired(token.version);
            if (decodedToken.userId !== token.content || isTokenExpired === true) {
                dispatch ({
                    type: 'DISCONNECT'
                });
                localStorage.removeItem('token');
                return navigate('/login', { replace: true });
            };
            userIdToSend = decodedToken.userId;
            dispatch ({
                type: 'LOG'
            }) ;
        };
    } else {
        dispatch ({
            type: 'DISCONNECT'
        });
        return navigate('/login', { replace: true });
    }; 

        fetch('https://api-e-commerce.julienlenfume.com/api/users/delete/' + userIdToSend, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + tokenToSend.version
            },
            method : 'PUT'
        })
            .then(res => {
                if(res.status === 200) {
                    toggleMsgModal('Utilisateur supprimer');
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    navigate('/login', { replace: true });
                } else {
                    toggleDeleteModal();
                    toggleMsgModal('Un probleme est survenu.');
                }
            })


    };
  
    /**
     * TOGGLE DELETE ACCOUNT CONFIRMATION MODAL
     */
    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    /**
     * TOGGLE MESSAGE MODAL
     * @param {*} message 
     */
    const toggleMsgModal = (message) => {
        if(message) {
            setModalMsg(message);
        }
        setDeleteResModal(!deleteResModal);
    };

    return (
        <>
        <Helmet>
            <title>Profil - React optique shop</title>
            <meta name="title" content="Profil - React optique shop" />
            <meta
            name="description"
            content="Vous pouvez via cette page modifier les informations de votre profil, voir les commandes que vous avez valid??es ou bien supprimer votre compte."
            />
        </Helmet>
        <main>
            <section className='profil'>
                <h2>Votre compte</h2>
                <button onClick={logOut}>Se deconnecter</button>
                <div className="profil__options">
                    <div className="profil__options__row">
                        <div onClick={() => openModifyTab("infos")} className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faAddressBook} />
                            <h3>Modifier vos donn??es personnelles</h3>
                        </div>
                        <div onClick={() => openModifyTab("order")} className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faTruckRampBox} />
                            <h3>Vos commandes</h3>
                        </div>
                    </div>
                    <div className="profil__options__row">
                        <div onClick={() => openModifyTab("password")} className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faLock} />
                            <h3>Modifier votre mot de passe</h3>
                        </div>
                        <div onClick={() => openModifyTab("email")} className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faAt} />
                            <h3>Modifier votre adresse email</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profilDelete">
                <button className='profilDelete__btn' onClick={toggleDeleteModal}>Supprimer le compte</button>
                {
                    deleteModal &&
                    <div className="profilDelete__modalCont">
                        <div className="profilDelete__modalCont__modal">
                            <h2>Voulez vous vraiment supprimer votre compte ?</h2> 
                            <p>Cette action est d??finitive !</p>
                            <div className="profilDelete__modalCont__modal__btnCont">
                                <button onClick={toggleDeleteModal} className='profilDelete__modalCont__modal__btnCont--no'>Non</button>
                                <button onClick={handleDeleteAccount} className='profilDelete__modalCont__modal__btnCont--yes'>Oui</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    deleteResModal && 
                    <div className="profilDelete__modalMsgCont">
                        <div className="profilDelete__modalMsgCont__modal">
                            <h2>{modalMsg}</h2> 
                            <div className="profilDelete__modalMsgCont__modal__btnCont">
                                <button onClick={toggleMsgModal} className='profilDelete__modalMsgCont__modal__btnCont--no'>Ok</button>
                            </div>
                        </div>
                    </div>
                }
            </section>

            <section className="profilUpdate">
                <p className='profilUpdate__success'>{successMsg}</p>
                
                {/* Modifier donn??es perso */}
                <form className="profilUpdate__userProfil profilUpdate__part">
                    <h2>Modifier vos infos personnelles</h2>
                    <div className="profilUpdate__userProfil__errorCont"></div>
                    <h3>Vos coordonn??es :</h3>
                    <div className="profilUpdate__userProfil__basicsInfos">
                        <div className="profilUpdate__userProfil__basicsInfos__row profilUpdate__userProfil__basicsInfos__names">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__names__last">
                                <label htmlFor="profilLastName">Nom</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("lastName", e.target.value)} type="text" value={profilUpdateInputs.lastName} id="profilLastName" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__names__first">
                                <label htmlFor="profilFirstName">Pr??nom</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("firstName", e.target.value)} type="text" value={profilUpdateInputs.firstName} id="profilFirstName" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__row profilUpdate__userProfil__basicsInfos__address">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__address__main">
                                <label htmlFor="profilAddress">Adresse</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("address", e.target.value)} type="text" value={profilUpdateInputs.address} id="profilAddress" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__address__comp">
                                <label htmlFor="profilAddressComp">Compl??ment d'adresse</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("addressComp", e.target.value)} type="text" value={profilUpdateInputs.addressComp} id="profilAddressComp" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__row profilUpdate__userProfil__basicsInfos__zip">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__zip__zip">
                                <label htmlFor="profilZip">Code postal</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("zip", e.target.value)} type="text" value={profilUpdateInputs.zip} id="profilZip" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__zip__city">
                                <label htmlFor="profilCity">Ville</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("city", e.target.value)} type="text" value={profilUpdateInputs.city} id="profilCity" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__row profilUpdate__userProfil__basicsInfos__phones">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__phones__mobile">
                                <label htmlFor="profilMobile">Mobile</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("mobile", e.target.value)} type="text" value={profilUpdateInputs.mobile} id="profilMobile" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont profilUpdate__userProfil__basicsInfos__phones__fixe">
                                <label htmlFor="profilFixe">Fixe</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("fixe", e.target.value)} type="text" value={profilUpdateInputs.fixe} id="profilFixe" />
                            </div>
                        </div>
                    </div>

                    <div className="profilUpdate__userProfil__separator"></div>

                    <h3>Votre status :</h3>
                    <div className="profilUpdate__userProfil__companyCheck">
                        <input onChange={isBusinessToggle} type="checkbox" id="profilIsCompany" checked={toggleBusiness && true} />
                        <label htmlFor="profilIsCompany">Vous ??tes un professionnel. </label>
                    </div>

                    {
                        toggleBusiness &&
                        <div className="profilUpdate__userProfil__company">
                            <div className=" profilUpdate__userProfil__basicsInfos__row">
                                <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                    <label htmlFor="profilCompanyName">Nom de la soci??t??</label>
                                    <input onInput={(e) => ctrlInputsProfilUpdate("companyName", e.target.value)} type="text" value={profilUpdateInputs.companyName} id="profilCompanyName" />
                                </div>
                                <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                    <label htmlFor="profilFax">T??l??copie</label>
                                    <input onInput={(e) => ctrlInputsProfilUpdate("fax", e.target.value)} type="text" value={profilUpdateInputs.fax} id="profilFax" />
                                </div>
                            </div>
                            <div className=" profilUpdate__userProfil__basicsInfos__row">
                                <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                    <label htmlFor="profilSiret">N?? de SIRET</label>
                                    <input onInput={(e) => ctrlInputsProfilUpdate("siret", e.target.value)} type="text" value={profilUpdateInputs.siret} id="profilSiret" />
                                </div>
                                <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                    <label htmlFor="profilTva">N?? de TVA intra-communautaire</label>
                                    <input onInput={(e) => ctrlInputsProfilUpdate("tva", e.target.value)} type="text" value={profilUpdateInputs.tva} id="profilTva" />
                                </div>
                            </div>
                        </div>
                    }

                    <div className="profilUpdate__userProfil__separator"></div>

                    <h3>Adresse de livraison :</h3>
                    <div className="profilUpdate__userProfil__delivery">
                        <div className="profilUpdate__userProfil__basicsInfos__row">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="profilDeliveryAddress">Adresse</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("deliveryAddress", e.target.value)} type="text" value={profilUpdateInputs.deliveryAddress} id="profilDeliveryAddress" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="profilDeliveryAddressComp">Compl??ment d'adresse</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("deliveryAddressComp", e.target.value)} type="text" value={profilUpdateInputs.deliveryAddressComp} id="profilDeliveryAddressComp" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__row">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="profilDeliveryZip">Code postal</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("deliveryZip", e.target.value)} type="text" value={profilUpdateInputs.deliveryZip} id="profilDeliveryZip" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="profilDeliveryCity">Ville</label>
                                <input onInput={(e) => ctrlInputsProfilUpdate("deliveryCity", e.target.value)} type="text" value={profilUpdateInputs.deliveryCity} id="profilDeliveryCity" />
                            </div>
                        </div>
                    </div>

                    <div className="profilUpdate__userProfil__separator"></div>

                    <h3>Options :</h3>
                    <div className="profilUpdate__userProfil__options">
                        <div className="profilUpdate__userProfil__options__check">
                            <input onInput={() => ctrlInputsProfilUpdate("newsletter")} type="checkbox" id="profilNewsletter" checked={profilUpdateInputs.newsletter && true} />
                            <label htmlFor="profilNewsletter">Abonnement ?? la newsletter</label>
                        </div>
                        <div className="profilUpdate__userProfil__options__check">
                            <input onInput={() => ctrlInputsProfilUpdate("pub")} type="checkbox" id="profilPub" checked={profilUpdateInputs.pub && true}/>
                            <label htmlFor="profilPub">Reception d'offres promotionnelles</label>
                        </div>
                    </div>

                    <div className="profilUpdate__userProfil__btnCont">
                        <button onClick={sendProfilUpdated}>Modifier</button>
                    </div>
                </form>


                {/* voir les commandes */}
                <div className="profilUpdate__orders profilUpdate__part">
                    
                    {
                        orderData.length > 0 ?
                        <>
                            <h2>Vos commandes</h2>
                            {orderData.map(el => {
                                let dateTS = Date.parse(el.created);
                                let createdDate = new Date(dateTS);
                                let timeOptions = { hh: 'numeric', mm: 'numeric', ss: 'numeric' };
                                let createTimes = createdDate.toLocaleString("fr-FR", timeOptions);
                                let products = el.products.split(',');
                                let articlesCount = el.count.split(',');
                                let articlesName = el.names.split(',');
                                let articles = [];
                                for(let i = 0; i < products.length; i++) {
                                    let item = {
                                        names : articlesName[i],
                                        count: articlesCount[i]
                                    }
                                    articles.push(item);
                                }
                                
                                return <div key={el.order} className="profilUpdate__orders__order">
                                    <h3>Commande N?? {el.order}</h3>
                                    <p className='profilUpdate__orders__order__date'>Le {createTimes}</p>
                                    {
                                        articles.map(ele => {
                                            return (
                                                <div className="profilUpdate__orders__order__elements">
                                                    <p>{ele.names}</p>
                                                    <p>nbr: {ele.count}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            })}
                        </>
                        :   <h2>Aucune commandes ?? afficher</h2>
                    }

                </div>


                {/* Modifier password */}
                <form className="profilUpdate__part profilUpdate__password">
                    <h2>Modifier votre mot de passe</h2>
                    <div className="profilUpdate__password__errorCont"></div>
                    <div className="profilUpdate__userProfil__basicsInfos">
                        <div className="profilUpdate__userProfil__basicsInfos__row">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="actualPassword">Votre mot de passe actuel</label>
                                <input onInput={(e) => ctrlPasswordInputs("actual", e.target.value)} type="password" value={passwordUpdateInputs.password} id="actualPassword" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="newPassword">Votre nouveau mot de passe</label>
                                <input onInput={(e) => ctrlPasswordInputs("new", e.target.value)} type="password" value={passwordUpdateInputs.newPassword} id="newPassword" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="confirmNewPassword">Confirmer votre nouveau mot de passe</label>
                                <input onInput={(e) => ctrlPasswordInputs("confirm", e.target.value)} type="password" value={passwordUpdateInputs.confirmNewPassword} id="confirmNewPassword" />
                            </div>
                        </div>
                        </div>
                    <div className="profilUpdate__userProfil__btnCont">
                        <button onClick={updatePassword}>Modifier</button>
                    </div>
                </form>


                {/* Modifier adresse email */}
                <form className="profilUpdate__email profilUpdate__part">
                    <h2>Modifier votre adresse email</h2>
                    <div className="profilUpdate__email__errorCont"></div>
                    <div className="profilUpdate__userProfil__basicsInfos">
                        <div className="profilUpdate__userProfil__basicsInfos__row">
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont">
                                <label htmlFor="actualEmail">Votre adresse email actuel</label>
                                <input onInput={(e) => ctrlEmailInputs("actual", e.target.value)} type="email" value={emailUpdateInputs.email} id="actualEmail" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__row__inputCont" id='profilUpdate__email__lastChildFix'>
                                <label htmlFor="newEmail">Votre nouvelle adresse email</label>
                                <input onInput={(e) => ctrlEmailInputs("new", e.target.value)} type="email" value={emailUpdateInputs.new} id="newEmail" />
                            </div>
                        </div>    
                    </div>    

                    <div className="profilUpdate__userProfil__btnCont">
                        <button onClick={updateMail}>Modifier</button>
                    </div>
                </form>
            </section>
        </main>
        </>
    );
};

export default UserAccount;