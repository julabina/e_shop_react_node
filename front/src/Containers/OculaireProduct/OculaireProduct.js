import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import OculaireZoom from '../../Components/OculaireZoom/OculaireZoom';

const OculaireProduct = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const [oculaireData, setOculaireData] = useState({});
    const [mainPicture, setMainPicture] = useState();
    const [toggleCarrousel, setToggleCarrousel] = useState(false);
    const [commentData, setCommentData] = useState("");
    const [inputAddCart, setInputAddCart] = useState("");
    let back = '< retour'

    useEffect(() => {
        fetch('http://localhost:3000/api/oculaires/' + params.id)
        .then(res => res.json())
        .then(data => {
            let price;
            if (data.data.promo) {
                let reduction = (data.data.price / 100) * data.data.promoValue;
                price = data.data.price - reduction;
            } else {
                price = data.data.price;
            }
            let item = {
                imgDesc: data.data.descriptionPicture,
                name: data.data.name,
                price: (price).toFixed(2),
                stock: data.data.stock,
                description1: data.data.description1,
                description2: data.data.description2,
                description3: data.data.description3,
                focal: data.data.focal,
                mount: data.data.mount,
                priceNoPromo: data.data.price,
                promoValue: data.data.promoValue,
                promo: data.data.promo,
                fov: data.data.fov,
                eyeRelief: data.data.eyeRelief,
                model: data.data.model,
                brand: data.data.brand,
                coulant: data.data.coulant
            }

            if (data.data.stock < 1) {
                setInputAddCart("0");
            } else {
                setInputAddCart("1");
            }
            setOculaireData(item);
            setMainPicture(process.env.PUBLIC_URL + data.data.pictures)
        })
    },[])

    const addToCart = (value) => {
        if(oculaireData.stock !== 0) {
            let item = {
                category: "oculaire",
                id: oculaireData.id,
                count: value,
                stock: oculaireData.stock,
                name: oculaireData.name,
                image: mainPicture
            }

            dispatch({
                type: 'ADDTOCART',
                payload: item
            })
        }
    }

    const changeTab = (valArr) => {
        const tabs = document.querySelectorAll('.oculaireInfos__tabsCont__tab');
        const infos = document.querySelectorAll('.oculaireInfos__infos');

        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('oculaireInfos__tabsCont__tab--active') && i !== parseInt(valArr)) {
                tabs[i].classList.remove('oculaireInfos__tabsCont__tab--active');
                infos[i].classList.remove('oculaireInfos__infos--active');
            }
            
            if(i === parseInt(valArr)) {
                if(!tabs[i].classList.contains('oculaireInfos__tabsCont__tab--active')) {
                    tabs[i].classList.add('oculaireInfos__tabsCont__tab--active')
                    infos[i].classList.add('oculaireInfos__infos--active');
                }
            }
        }
    }

    const toggleCarrouselFunc = () => {
        setToggleCarrousel(!toggleCarrousel);
    }

    const changeCommentValue = (value) => {
        setCommentData(value);
    }

    const changeInputValue = (action, value) => {
        const lessBtn = document.getElementById('oculaireProduct__lessBtn');
        const addBtn = document.getElementById('oculaireProduct__addBtn');
        let val = parseInt(inputAddCart), newVal; 

        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            
            (inputAddCart !== oculaireData.stock) ? (newVal = val + 1) : (newVal = val)

        } else if(action === 'less') {

            (val > 1) ? (newVal = val -1) : (newVal = val)

        } else if(action === 'change') {
            newVal = parseInt(value);
            
            (newVal >= oculaireData.stock) && (newVal = oculaireData.stock)
        }

        if(newVal > 1 && newVal !== oculaireData.stock) {
            if(lessBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            } 
            if(addBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            }

            if(!lessBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.add('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === oculaireData.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                    lessBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
                } 
                if(addBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                    addBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('oculaireProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.add('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            }
        }
        let valueString = newVal.toString();
        setInputAddCart(valueString);
    }

    return (
        <main>
        <section className='oculaireProduct'>
            <NavLink to={"/oculaire"}>
                <p className='oculaireProduct__back'>{back}</p>
            </NavLink>
            <div className="oculaireProduct__top">
                <div className="oculaireProduct__top__left">
                <div className="oculaireProduct__top__left__mainImg">
                    <img onClick={toggleCarrouselFunc} className='oculaireProduct__top__left__mainImg__img' src={mainPicture} alt={'photo de ' + oculaireData.name} />
                    {toggleCarrousel && <OculaireZoom mainImg={mainPicture} func={toggleCarrouselFunc} />}
                </div>
                </div>
                <div className="oculaireProduct__top__right">
                    <h2>{oculaireData.name}</h2>
                    <p className='oculaireProduct__top__right__price'>{oculaireData.price} € {oculaireData.promo && <span className='oculaireProduct__top__right__price__span'>{(oculaireData.priceNoPromo).toFixed(2)} €</span>}</p>
                    {(oculaireData.stock === 0) ? <p className="oculaireProduct__top__right__stock oculaireProduct__top__right__stock--out">Rupture</p> : <p className="oculaireProduct__top__right__stock">En Stock</p> }
                    <div className="oculaireProduct__top__right__addCart">
                        <div className="oculaireProduct__top__right__addCart__countCont">
                            <button onClick={() => changeInputValue('less')} id="oculaireProduct__lessBtn" className="oculaireProduct__top__right__addCart__countCont__btn oculaireProduct__top__right__addCart__countCont__btn--unselected">-</button>
                            <input onChange={(e) => changeInputValue('change',e.target.value)} type="number" className="oculaireProduct__top__right__addCart__countCont__input" value={inputAddCart} min='1' max={oculaireData.stock} />
                            <button onClick={() => changeInputValue('add')} id="oculaireProduct__addBtn" className={oculaireData.stock < 2 ? 'oculaireProduct__top__right__addCart__countCont__btn oculaireProduct__top__right__addCart__countCont__btn--unselected' : 'oculaireProduct__top__right__addCart__countCont__btn'}>+</button>
                        </div>
                        <button onClick={() => addToCart(inputAddCart)} className='oculaireProduct__top__right__addCart__addBtn'><FontAwesomeIcon className='oculaireProduct__top__right__addCart__addBtn__cart' icon={faShoppingCart} /> Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="oculaireInfos">
            <div className="oculaireInfos__tabsCont">
                <div onClick={() => changeTab(0)} className="oculaireInfos__tabsCont__tab oculaireInfos__tabsCont__tab--active">Description</div>
                <div onClick={() => changeTab(1)} className="oculaireInfos__tabsCont__tab">Caractéristiques</div>
                <div onClick={() => changeTab(2)} className="oculaireInfos__tabsCont__tab">Commentaire</div>
            </div>
            <div className="oculaireInfos__infos oculaireInfos__infos--active">
                <h3>Tout savoir sur {oculaireData.name}</h3>
                <p className='oculaireInfos__infos__description'>{oculaireData.description1}</p>
                {oculaireData.description2 !== null && <p className='oculaireInfos__infos__description'>{oculaireData.description2}</p>}
                {oculaireData.imgDesc !== null && <img className='oculaireInfos__infos__img' src={process.env.PUBLIC_URL + oculaireData.imgDesc} alt={"photo de " + oculaireData.name} />}
                {oculaireData.description3 !== null && <p className='oculaireInfos__infos__description'>{oculaireData.description3}</p>}
            </div>
            <div className="oculaireInfos__infos">
                <div className="oculaireInfos__infos__caractCont">
                    <div className="oculaireInfos__infos__caractCont__caract oculaireInfos__infos__caractCont__caract__title">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Caractéristiques</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.name}</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Marque</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.brand}</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract oculaireInfos__infos__caractCont__caract--even">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Modèle</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.model}</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Longueur focal</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.focal}mm</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract oculaireInfos__infos__caractCont__caract--even">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Champs apparent</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.fov}°</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Distance de l'oeil</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.eyeRelief}mm</p>
                    </div>
                    <div className="oculaireInfos__infos__caractCont__caract oculaireInfos__infos__caractCont__caract--even">
                        <p className="oculaireInfos__infos__caractCont__caract__type">Coulant</p>
                        <p className="oculaireInfos__infos__caractCont__caract__value">{oculaireData.coulant}</p>
                    </div>
                </div>
            </div>
            <div className="oculaireInfos__infos">
                <div className="oculaireInfos__infos__commentsCont">
                    <form className='oculaireInfos__infos__commentsCont__form' action="" method="post">
                        <textarea onInput={(e) => changeCommentValue(e.target.value)} value={commentData} className="oculaireInfos__infos__commentsCont__form__textArea"></textarea>
                        <button className='oculaireInfos__infos__commentsCont__form__btn'>Envoyer</button>
                    </form>
                    <p className='oculaireInfos__infos__commentsCont__status'>PAS ENCORE DE COMMENTAIRES</p>
                </div>
            </div>
        </section>
        </main>
    );
};

export default OculaireProduct;