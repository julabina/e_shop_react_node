import React, { useEffect } from 'react';

const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
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