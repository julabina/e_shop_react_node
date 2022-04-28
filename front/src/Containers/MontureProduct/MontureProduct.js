import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import ProductCarrousel from '../../Components/ProductCarrousel/ProductCarrousel';
import { useDispatch } from 'react-redux';

const MontureProduct = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [montureData, setMontureData] = useState({});
    const [picturesData, setPicturesData] = useState([]);
    const [mainPicture, setMainPicture] = useState();
    const [toggleCarrousel, setToggleCarrousel] = useState(false);
    const [commentData, setCommentData] = useState("");
    const [inputAddCart, setInputAddCart] = useState("");
    let back = '< retour'

    useEffect(() => {
        fetch('http://localhost:3000/api/montures/' + params.id)
        .then(res => res.json())
        .then(data => {
            let price;
            let newArr = [];
            if (data.data.promo) {
                let reduction = (data.data.price / 100) * data.data.promoValue;
                price = data.data.price - reduction;
            } else {
                price = data.data.price;
            }
            let item = {
                imgDesc: data.data.descriptionPicture,
                name: data.data.name,
                type: data.data.type,
                price: (price).toFixed(2),
                stock: data.data.stock,
                description1: data.data.description1,
                description2: data.data.description2,
                description3: data.data.description3,
                priceNoPromo: data.data.price,
                promoValue: data.data.promoValue,
                promo: data.data.promo,
                capacity: data.data.capacity,
                goTo: data.data.goTo
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
            setMontureData(item);
            setMainPicture(process.env.PUBLIC_URL + data.data.pictures[0])
        })
    },[])

    const addToCart = (value) => {
        if(montureData.stock < 1) {
            let item = {
                id: montureData.id,
                count: value,
                price: montureData.price,
                stock: montureData.stock
            }

            dispatch({
                type: 'ADDTOCART',
                payload: item
            })
        }
    }

    const changeImg = (img, ind) => {
        const tinyImgs = document.querySelectorAll('.montureProduct__top__left__tinyImg__cont__cover');
        for (let i = 0; i < tinyImgs.length; i++) {
            if (tinyImgs[i].classList.contains('montureProduct__top__left__tinyImg__cont__cover--active') && i !== parseInt(ind)) {
                tinyImgs[i].classList.remove('montureProduct__top__left__tinyImg__cont__cover--active');
            }
            if(i === parseInt(ind) && !tinyImgs[i].classList.contains('montureProduct__top__left__tinyImg__cont__cover--active')) {
                tinyImgs[i].classList.add('montureProduct__top__left__tinyImg__cont__cover--active')
            }
        }
        let pict =  process.env.PUBLIC_URL + img;
        setMainPicture(pict);
    }

    const changeTab = (valArr) => {
        const tabs = document.querySelectorAll('.montureInfos__tabsCont__tab');
        const infos = document.querySelectorAll('.montureInfos__infos');

        for(let i = 0; i < tabs.length; i++) {
            if(tabs[i].classList.contains('montureInfos__tabsCont__tab--active') && i !== parseInt(valArr)) {
                tabs[i].classList.remove('montureInfos__tabsCont__tab--active');
                infos[i].classList.remove('montureInfos__infos--active');
            }
            
            if(i === parseInt(valArr)) {
                if(!tabs[i].classList.contains('montureInfos__tabsCont__tab--active')) {
                    tabs[i].classList.add('montureInfos__tabsCont__tab--active')
                    infos[i].classList.add('montureInfos__infos--active');
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
        const lessBtn = document.getElementById('montureProduct__lessBtn');
        const addBtn = document.getElementById('montureProduct__addBtn');
        let val = inputAddCart, newVal; 

        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            
            (inputAddCart !== montureData.stock) ? (newVal = val + 1) : (newVal = val)

        } else if(action === 'less') {

            (val > 1) ? (newVal = val -1) : (newVal = val)

        } else if(action === 'change') {
            newVal = parseInt(value);
            
            (newVal >= montureData.stock) && (newVal = montureData.stock)
        }

        if(newVal > 1 && newVal !== montureData.stock) {
            if(lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected')
            } 
            if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected')
            }

            if(!lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.add('montureProduct__top__right__addCart__countCont__btn--unselected')
            }
        } else if(newVal === montureData.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                    lessBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected')
                } 
                if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                    addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.add('montureProduct__top__right__addCart__countCont__btn--unselected')
            }
        }
        setInputAddCart(newVal);
    }

    return (
        <main>
        <section className='montureProduct'>
            <NavLink to={"/monture"}>
                <p className='montureProduct__back'>{back}</p>
            </NavLink>
            <div className="montureProduct__top">
                <div className="montureProduct__top__left">
                <div className="montureProduct__top__left__mainImg">
                    <img onClick={toggleCarrouselFunc} className='montureProduct__top__left__mainImg__img' src={mainPicture} alt={'photo de ' + montureData.name} />
                    {toggleCarrousel && <ProductCarrousel mainImg={mainPicture} images={picturesData} func={toggleCarrouselFunc} />}
                </div>
                    <div className="montureProduct__top__left__tinyImg">
                        {picturesData.map(el => {
                            if (picturesData.length > 1) {
                                return (
                                    <div key={el.id} className="montureProduct__top__left__tinyImg__cont">
                                        <div onClick={() => changeImg(el.img, el.ind)} className={el.ind === 0 ? "montureProduct__top__left__tinyImg__cont__cover montureProduct__top__left__tinyImg__cont__cover--active" : "montureProduct__top__left__tinyImg__cont__cover" }></div>
                                        <img className='montureProduct__top__left__tinyImg__cont__img' src={process.env.PUBLIC_URL + el.img} alt={'photo de ' + montureData.name} />
                                    </div>
                                ) 
                            }
                        })}
                    </div>
                </div>
                <div className="montureProduct__top__right">
                    <h2>{montureData.name}</h2>
                    <p className='montureProduct__top__right__price'>{montureData.price} € {montureData.promo && <span className='montureProduct__top__right__price__span'>{(montureData.priceNoPromo).toFixed(2)} €</span>}</p>
                    {(montureData.stock === 0) ? <p className="montureProduct__top__right__stock montureProduct__top__right__stock--out">Rupture</p> : <p className="montureProduct__top__right__stock">En Stock</p> }
                    <div className="montureProduct__top__right__addCart">
                        <div className="montureProduct__top__right__addCart__countCont">
                            <button onClick={() => changeInputValue('less')} id="montureProduct__lessBtn" className="montureProduct__top__right__addCart__countCont__btn montureProduct__top__right__addCart__countCont__btn--unselected">-</button>
                            <input onChange={(e) => changeInputValue('change', e.target.value)} type="number" className="montureProduct__top__right__addCart__countCont__input" value={inputAddCart} min='1' max={montureData.stock} />
                            <button onClick={() => changeInputValue('add')} id="montureProduct__addBtn" className={montureData.stock < 2 ? 'montureProduct__top__right__addCart__countCont__btn montureProduct__top__right__addCart__countCont__btn--unselected' : 'montureProduct__top__right__addCart__countCont__btn'}>+</button>
                        </div>
                        <button onClick={() => addToCart(inputAddCart)} className='montureProduct__top__right__addCart__addBtn'><FontAwesomeIcon className='montureProduct__top__right__addCart__addBtn__cart' icon={faShoppingCart} /> Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="montureInfos">
            <div className="montureInfos__tabsCont">
                <div onClick={() => changeTab(0)} className="montureInfos__tabsCont__tab montureInfos__tabsCont__tab--active">Description</div>
                <div onClick={() => changeTab(1)} className="montureInfos__tabsCont__tab">Caractéristiques</div>
                <div onClick={() => changeTab(2)} className="montureInfos__tabsCont__tab">Commentaire</div>
            </div>
            <div className="montureInfos__infos montureInfos__infos--active">
                <h3>Tout savoir sur {montureData.name}</h3>
                <p className='montureInfos__infos__description'>{montureData.description1}</p>
                {montureData.description2 !== null && <p className='montureInfos__infos__description'>{montureData.description2}</p>}
                {montureData.imgDesc !== null && <img className='montureInfos__infos__img' src={process.env.PUBLIC_URL + montureData.imgDesc} alt={"photo de " + montureData.name} />}
                {montureData.description3 !== null && <p className='montureInfos__infos__description'>{montureData.description3}</p>}
            </div>
            <div className="montureInfos__infos">
                <div className="montureInfos__infos__caractCont">
                    <div className="montureInfos__infos__caractCont__caract montureInfos__infos__caractCont__caract__title">
                        <p className="montureInfos__infos__caractCont__caract__type">Caractéristiques</p>
                        <p className="montureInfos__infos__caractCont__caract__value">{montureData.name}</p>
                    </div>
                    <div className="montureInfos__infos__caractCont__caract">
                        <p className="montureInfos__infos__caractCont__caract__type">Type</p>
                        <p className="montureInfos__infos__caractCont__caract__value">{montureData.type}</p>
                    </div>
                    <div className="montureInfos__infos__caractCont__caract montureInfos__infos__caractCont__caract--even">
                        <p className="montureInfos__infos__caractCont__caract__type">Capacité de charge</p>
                        <p className="montureInfos__infos__caractCont__caract__value">{montureData.capacity}kg</p>
                    </div>
                    <div className="montureInfos__infos__caractCont__caract">
                        <p className="montureInfos__infos__caractCont__caract__type">GoTo</p>
                        <p className="montureInfos__infos__caractCont__caract__value">{montureData.goTo ? "Oui" : "Non"}</p>
                    </div>
                </div>
            </div>
            <div className="montureInfos__infos">
                <div className="montureInfos__infos__commentsCont">
                    <form className='montureInfos__infos__commentsCont__form' action="" method="post">
                        <textarea onInput={(e) => changeCommentValue(e.target.value)} value={commentData} className="montureInfos__infos__commentsCont__form__textArea"></textarea>
                        <button className='montureInfos__infos__commentsCont__form__btn'>Envoyer</button>
                    </form>
                    <p className='montureInfos__infos__commentsCont__status'>PAS ENCORE DE COMMENTAIRES</p>
                </div>
            </div>
        </section>
        </main>
    );
};

export default MontureProduct;