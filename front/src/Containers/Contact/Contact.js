import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';

const Contact = () => {

    const dispatch = useDispatch();

    const [isLogged, setIsLogged] = useState(false);

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
                    })
                    localStorage.removeItem('token');
                    return setIsLogged(false);
                };
                dispatch ({
                    type: 'LOG'
                })
                setIsLogged(true);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                })
                setIsLogged(false);
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            })
            setIsLogged(false);
        }; 

    },[])
    
    return (
        <main>
            <section className='contact'>
                <h2>Contactez nous</h2>
                <div className="contact__separator"></div>
                <form action="" className='contact__form'>
                    <div className="contact__form__row">
                        <div className="contact__form__row__inputCont">
                            <label htmlFor="">Prénom</label>
                            <input type="text" name="" id="" />
                        </div>
                        <div className="contact__form__row__inputCont">                            
                            <label htmlFor="">Nom</label>
                            <input type="text" name="" id="" />
                        </div>
                    </div>
                    <div className="contact__form__row">
                        <div className="contact__form__row__inputCont">
                            <label htmlFor="">Email</label>
                            <input type="mail" name="" id="" />
                        </div>
                        <div className="contact__form__row__inputCont">                            
                            <label htmlFor="">Tel</label>
                            <input type="number" name="" id="" />
                        </div>
                    </div>
                    <div className="contact__form__message">
                        <label htmlFor="">Message</label>
                        <textarea name="" id=""></textarea>
                    </div>
                    <div className="contact__form__btnCont">
                        <button>Envoyer</button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Contact;