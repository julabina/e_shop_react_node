import React, { useEffect, useState } from 'react';
import { decodeToken, isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faLock, faTruckRampBox, faAt } from '@fortawesome/free-solid-svg-icons';

const UserAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { logged } = useSelector(state => ({
        ...state.loggedReducer
    }));

    const [userData, setUserData] = useState({});

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
                    })
                    localStorage.removeItem('token');
                    return navigate('/login', { replace: true });
                };
                userIdToSend = decodedToken.userId;
                dispatch ({
                    type: 'LOG'
                })
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            })
            return navigate('/login', { replace: true });
        }; 
        console.log(userIdToSend);

        fetch('http://localhost:3000/api/users/' + userIdToSend, {
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
                    console.log(data);
                    let newObj = {
                        userId: data.data.userId,
                        address: data.data.address,
                        addressComp: data.data.addressComp,
                        city: data.data.city,
                        civ: data.data.civ,
                        company: data.data.company,
                        companyName: data.data.companyName,
                        deliveryAddress: data.data.deliveryAddress,
                        deliveryAddressComp: data.data.deliveryAddressComp,
                        deliveryCity: data.data.deliveryCity,
                        deliveryZip: data.data.deliveryZip,
                        email: data.data.email,
                        fax: data.data.fax,
                        firstName: data.data.firstName,
                        fixe: data.data.fixe,
                        lastName: data.data.lastName,
                        mobile: data.data.mobile,
                        newsletter: data.data.newsletter,
                        password: data.data.password,
                        pub: data.data.pub,
                        siret: data.data.siret,
                        tva: data.data.tva,
                        zip: data.data.zip

                    };
                    setUserData(newObj);
                })
               
    },[]);
    
    const logOut = () => {
        dispatch ({
            type: 'DISCONNECT'
        })
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <main>
            <section className='profil'>
                <h2>Votre compte</h2>
                <button onClick={logOut}>Se deconnecter</button>
                <div className="profil__options">
                    <div className="profil__options__row">
                        <div className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faAddressBook} />
                            <h3>Modifier vos données personnelles</h3>
                        </div>
                        <div className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faTruckRampBox} />
                            <h3>Vos commandes</h3>
                        </div>
                    </div>
                    <div className="profil__options__row">
                        <div className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faLock} />
                            <h3>Modifier votre mot de passe</h3>
                        </div>
                        <div className="profil__options__row__link">
                            <FontAwesomeIcon className='profil__options__row__link__icon' icon={faAt} />
                            <h3>Modifier votre adresse email</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section className="profilUpdate">

                {/* Modifier données perso */}
                <div className="profilUpdate__userProfil">
                    <div className="profilUpdate__userProfil__basicsInfos">
                        <div className="profilUpdate__userProfil__basicsInfos__names">
                            <div className="profilUpdate__userProfil__basicsInfos__names__last">
                                <label htmlFor="profilLastName">Nom</label>
                                <input type="text" id="profilLastName" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__names__first">
                                <label htmlFor="profilFirstName">Prénom</label>
                                <input type="text" id="profilFirstName" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__address">
                            <div className="profilUpdate__userProfil__basicsInfos__address__main">
                                <label htmlFor="profilAddress">Adresse</label>
                                <input type="text" id="profilAddress" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__address__comp">
                                <label htmlFor="profilAddressComp">Complément d'adresse</label>
                                <input type="text" id="profilAddressComp" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__zip">
                            <div className="profilUpdate__userProfil__basicsInfos__zip__zip">
                                <label htmlFor="profilZip">Code postal</label>
                                <input type="number" id="profilZip" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__zip__city">
                                <label htmlFor="profilCity">Ville</label>
                                <input type="text" id="profilCity" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__basicsInfos__phones">
                            <div className="profilUpdate__userProfil__basicsInfos__phones__mobile">
                                <label htmlFor="profilMobile">Mobile</label>
                                <input type="number" id="profilMobile" />
                            </div>
                            <div className="profilUpdate__userProfil__basicsInfos__phones__fixe">
                                <label htmlFor="profilFixe">Fixe</label>
                                <input type="number" id="profilFixe" />
                            </div>
                        </div>
                    </div>

                    {
                        userData.company &&
                        <div className="profilUpdate__userProfil__company">
                            <div className="profilUpdate__userProfil__company__row">
                                <div className="profilUpdate__userProfil__company__row__name">
                                    <label htmlFor="profilCompanyName">Nom de la société</label>
                                    <input type="text" id="profilCompanyName" />
                                </div>
                                <div className="profilUpdate__userProfil__company__row__fax">
                                    <label htmlFor="profilFax">Télécopie</label>
                                    <input type="text" id="profilFax" />
                                </div>
                            </div>
                            <div className="profilUpdate__userProfil__company__row">
                                <div className="profilUpdate__userProfil__company__row__siret">
                                    <label htmlFor="profilSiret">N° de SIRET</label>
                                    <input type="text" id="profilSiret" />
                                </div>
                                <div className="profilUpdate__userProfil__company__row__tva">
                                    <label htmlFor="profilTva">N° de TVA intra-communautaire</label>
                                    <input type="text" id="profilTva" />
                                </div>
                            </div>
                        </div>
                    }

                    <div className="profilUpdate__userProfil__delivery">
                        <div className="profilUpdate__userProfil__delivery__address">
                            <div className="profilUpdate__userProfil__delivery__address__main">
                                <label htmlFor="profilDeliveryAddress">Adresse</label>
                                <input type="text" id="profilDeliveryAddress" />
                            </div>
                            <div className="profilUpdate__userProfil__delivery__address__comp">
                                <label htmlFor="profilDeliveryAddressComp">Complément d'adresse</label>
                                <input type="text" id="profilDeliveryAddressComp" />
                            </div>
                        </div>
                        <div className="profilUpdate__userProfil__delivery__zip">
                            <div className="profilUpdate__userProfil__delivery__zip__zip">
                                <label htmlFor="profilDeliveryZip">Code postal</label>
                                <input type="number" id="profilDeliveryZip" />
                            </div>
                            <div className="profilUpdate__userProfil__delivery__zip__city">
                                <label htmlFor="profilDeliveryCity">Ville</label>
                                <input type="text" id="profilDeliveryCity" />
                            </div>
                        </div>
                    </div>

                    <div className="profilUpdate__userProfil__options">
                        <div className="profilUpdate__userProfil__options__newsletter">
                            <input type="checkbox" id="profilNewsletter" />
                            <label htmlFor="profilNewsletter">Abonnement à la newsletter</label>
                        </div>
                        <div className="profilUpdate__userProfil__options__pub">
                            <input type="checkbox" id="profilPub" />
                            <label htmlFor="profilPub">Reception d'offres promotionnelles</label>
                        </div>
                    </div>
                </div>


                {/* voir les commandes */}
                <div className=""></div>


                {/* Modifier password */}
                <div className=""></div>


                {/* Modifier adresse email */}
                <div className=""></div>
            </section>
        </main>
    );
};

export default UserAccount;