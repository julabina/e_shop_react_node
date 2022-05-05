import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import ProductCarrousel from '../../Components/ProductCarrousel/ProductCarrousel';
import { useDispatch } from 'react-redux';

const TelescopeProduct = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const [telescopeData, setTelescopeData] = useState({});
    const [picturesData, setPicturesData] = useState([]);
    const [mainPicture, setMainPicture] = useState();
    const [toggleCarrousel, setToggleCarrousel] = useState(false);
    const [commentData, setCommentData] = useState("");
    const [inputAddCart, setInputAddCart] = useState("");
    let back = '< retour'

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/telescopes/' + params.id)
        .then(res => res.json())
        .then(data => {
            let price;
            let newArr = [];
            if (data.data !== undefined){
                if (data.data.promo) {
                    let reduction = (data.data.price / 100) * data.data.promoValue;
                    price = data.data.price - reduction;
                } else {
                    price = data.data.price;
                }
                let item = {
                    id: data.data.id,
                    imgDesc: data.data.descriptionPicture,
                    name: data.data.name,
                    price: (price).toFixed(2),
                    stock: data.data.stock,
                    description1: data.data.description1,
                    description2: data.data.description2,
                    description3: data.data.description3,
                    diameter: data.data.diameter,
                    focal: data.data.focal,
                    fd: data.data.fd,
                    mount: data.data.mount,
                    type: data.data.type,
                    priceNoPromo: data.data.price,
                    promoValue: data.data.promoValue,
                    promo: data.data.promo
                }
                for(let i = 0; i < data.data.pictures.length; i++) {
                    let pict = {
                        img: data.data.pictures[i],
                        id: uuidv4(),
                        ind: i
                    }
                    newArr.push(pict);
                }
                if (data.data.stock < 1) {
                    setInputAddCart(0);
                } else {
                    setInputAddCart(1);
                }
                setPicturesData(newArr);
                setTelescopeData(item);
                setMainPicture(process.env.PUBLIC_URL + data.data.pictures[0])
            }
        })
    },[])

    const addToCart = (value) => {
        if(telescopeData.stock !== 0) {
            let item = {
                category: "telescope",
                id: telescopeData.id,
                count: value,
                price: telescopeData.price,
                stock: telescopeData.stock,
                name: telescopeData.name,
                image: process.env.PUBLIC_URL + picturesData[0].img
            }
            
            dispatch({
                type: 'ADDTOCART',
                payload: item
            })
        }
    }

    const changeImg = (img, ind) => {
        const tinyImgs = document.querySelectorAll('.telescopeProduct__top__left__tinyImg__cont__cover');
        for (let i = 0; i < tinyImgs.length; i++) {
            if (tinyImgs[i].classList.contains('telescopeProduct__top__left__tinyImg__cont__cover--active') && i !== parseInt(ind)) {
                tinyImgs[i].classList.remove('telescopeProduct__top__left__tinyImg__cont__cover--active');
            }
            if(i === parseInt(ind) && !tinyImgs[i].classList.contains('telescopeProduct__top__left__tinyImg__cont__cover--active')) {
                tinyImgs[i].classList.add('telescopeProduct__top__left__tinyImg__cont__cover--active')
            }
        }
        let pict =  process.env.PUBLIC_URL + img;
        setMainPicture(pict);
    }

    const changeTab = (valArr) => {
        const tabs = document.querySelectorAll('.telescopeInfos__tabsCont__tab');
        const infos = document.querySelectorAll('.telescopeInfos__infos');

        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('telescopeInfos__tabsCont__tab--active') && i !== parseInt(valArr)) {
                tabs[i].classList.remove('telescopeInfos__tabsCont__tab--active');
                infos[i].classList.remove('telescopeInfos__infos--active');
            }
            
            if(i === parseInt(valArr)) {
                if(!tabs[i].classList.contains('telescopeInfos__tabsCont__tab--active')) {
                    tabs[i].classList.add('telescopeInfos__tabsCont__tab--active')
                    infos[i].classList.add('telescopeInfos__infos--active');
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
        const lessBtn = document.getElementById('telescopeProduct__lessBtn');
        const addBtn = document.getElementById('telescopeProduct__addBtn');
        let val = inputAddCart, newVal; 

        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            
            (inputAddCart !== telescopeData.stock) ? (newVal = val + 1) : (newVal = val)

        } else if(action === 'less') {

            (val > 1) ? (newVal = val -1) : (newVal = val)

        } else if(action === 'change') {
            newVal = parseInt(value);
            
            (newVal >= telescopeData.stock) && (newVal = telescopeData.stock)
        }

        if(newVal > 1 && newVal !== telescopeData.stock) {
            if(lessBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.remove('telescopeProduct__top__right__addCart__countCont__btn--unselected')
            } 
            if(addBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('telescopeProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('telescopeProduct__top__right__addCart__countCont__btn--unselected')
            }

            if(!lessBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.add('telescopeProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === telescopeData.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                    lessBtn.classList.remove('telescopeProduct__top__right__addCart__countCont__btn--unselected')
                } 
                if(addBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                    addBtn.classList.remove('telescopeProduct__top__right__addCart__countCont__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('telescopeProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.add('telescopeProduct__top__right__addCart__countCont__btn--unselected')
            }
        }
        setInputAddCart(newVal);
    }

    return (
        <main>
        <section className='telescopeProduct'>
            <NavLink to={"/telescope"}>
                <p className='telescopeProduct__back'>{back}</p>
            </NavLink>
            <div className="telescopeProduct__top">
                <div className="telescopeProduct__top__left">
                <div className="telescopeProduct__top__left__mainImg">
                    <img onClick={toggleCarrouselFunc} className='telescopeProduct__top__left__mainImg__img' src={mainPicture} alt={'photo de ' + telescopeData.name} />
                    {toggleCarrousel && <ProductCarrousel mainImg={mainPicture} images={picturesData} func={toggleCarrouselFunc} />}
                </div>
                    <div className="telescopeProduct__top__left__tinyImg">
                        {picturesData.map(el => {
                            if (picturesData.length > 1) {
                                return (
                                    <div key={el.id} className="telescopeProduct__top__left__tinyImg__cont">
                                        <div onClick={() => changeImg(el.img, el.ind)} className={el.ind === 0 ? "telescopeProduct__top__left__tinyImg__cont__cover telescopeProduct__top__left__tinyImg__cont__cover--active" : "telescopeProduct__top__left__tinyImg__cont__cover" }></div>
                                        <img className='telescopeProduct__top__left__tinyImg__cont__img' src={process.env.PUBLIC_URL + el.img} alt={'photo de ' + telescopeData.name} />
                                    </div>
                                ) 
                            }
                        })}
                    </div>
                </div>
                <div className="telescopeProduct__top__right">
                    <h2>{telescopeData.name}</h2>
                    <p className='telescopeProduct__top__right__price'>{telescopeData.price} € {telescopeData.promo && <span className='telescopeProduct__top__right__price__span'>{(telescopeData.priceNoPromo).toFixed(2)} €</span>}</p>
                    {(telescopeData.stock === 0) ? <p className="telescopeProduct__top__right__stock telescopeProduct__top__right__stock--out">Rupture</p> : <p className="telescopeProduct__top__right__stock">En Stock</p> }
                    <div className="telescopeProduct__top__right__addCart">
                        <div className="telescopeProduct__top__right__addCart__countCont">
                            <button onClick={() => changeInputValue('less')} id="telescopeProduct__lessBtn" className="telescopeProduct__top__right__addCart__countCont__btn telescopeProduct__top__right__addCart__countCont__btn--unselected">-</button>
                            <input onChange={(e) => changeInputValue('change', e.target.value)} type="number" className="telescopeProduct__top__right__addCart__countCont__input" value={inputAddCart} min='1' max={telescopeData.stock} />
                            <button onClick={() => changeInputValue('add')} id="telescopeProduct__addBtn" className={telescopeData.stock < 2 ? 'telescopeProduct__top__right__addCart__countCont__btn telescopeProduct__top__right__addCart__countCont__btn--unselected' : 'telescopeProduct__top__right__addCart__countCont__btn'}>+</button>
                        </div>
                        <button onClick={() => addToCart(inputAddCart)} className='telescopeProduct__top__right__addCart__addBtn'><FontAwesomeIcon className='telescopeProduct__top__right__addCart__addBtn__cart' icon={faShoppingCart} /> Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="telescopeInfos">
            <div className="telescopeInfos__tabsCont">
                <div onClick={() => changeTab(0)} className="telescopeInfos__tabsCont__tab telescopeInfos__tabsCont__tab--active">Description</div>
                <div onClick={() => changeTab(1)} className="telescopeInfos__tabsCont__tab">Caractéristiques</div>
                <div onClick={() => changeTab(2)} className="telescopeInfos__tabsCont__tab">Commentaire</div>
            </div>
            <div className="telescopeInfos__infos telescopeInfos__infos--active">
                <h3>Tout savoir sur {telescopeData.name}</h3>
                <p className='telescopeInfos__infos__description'>{telescopeData.description1}</p>
                {telescopeData.description2 !== null && <p className='telescopeInfos__infos__description'>{telescopeData.description2}</p>}
                {telescopeData.imgDesc !== null && <img className='telescopeInfos__infos__img' src={process.env.PUBLIC_URL + telescopeData.imgDesc} alt={"photo de " + telescopeData.name} />}
                {telescopeData.description3 !== null && <p className='telescopeInfos__infos__description'>{telescopeData.description3}</p>}
            </div>
            <div className="telescopeInfos__infos">
                <div className="telescopeInfos__infos__caractCont">
                    <div className="telescopeInfos__infos__caractCont__caract telescopeInfos__infos__caractCont__caract__title">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Caractéristiques</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.name}</p>
                    </div>
                    <div className="telescopeInfos__infos__caractCont__caract">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Formule optique</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.type}</p>
                    </div>
                    <div className="telescopeInfos__infos__caractCont__caract telescopeInfos__infos__caractCont__caract--even">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Diamètre</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.diameter}mm</p>
                    </div>
                    <div className="telescopeInfos__infos__caractCont__caract">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Longueur focale</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.focal}mm</p>
                    </div>
                    <div className="telescopeInfos__infos__caractCont__caract telescopeInfos__infos__caractCont__caract--even">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Rapport F/D</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.fd}</p>
                    </div>
                    <div className="telescopeInfos__infos__caractCont__caract">
                        <p className="telescopeInfos__infos__caractCont__caract__type">Monture</p>
                        <p className="telescopeInfos__infos__caractCont__caract__value">{telescopeData.mount === null ? 'aucune' : telescopeData.mount}</p>
                    </div>
                </div>
            </div>
            <div className="telescopeInfos__infos">
                <div className="telescopeInfos__infos__commentsCont">
                    <form className='telescopeInfos__infos__commentsCont__form' action="" method="post">
                        <textarea onInput={(e) => changeCommentValue(e.target.value)} value={commentData} className="telescopeInfos__infos__commentsCont__form__textArea"></textarea>
                        <button className='telescopeInfos__infos__commentsCont__form__btn'>Envoyer</button>
                    </form>
                    <p className='telescopeInfos__infos__commentsCont__status'>PAS ENCORE DE COMMENTAIRES</p>
                </div>
            </div>
        </section>
        </main>
    );
};

export default TelescopeProduct;
