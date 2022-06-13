import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { decodeToken, isExpired } from 'react-jwt';
import OculaireZoom from '../../Components/OculaireZoom/OculaireZoom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';
import Comment from '../../Components/Comment/Comment';

const OculaireProduct = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const [oculaireData, setOculaireData] = useState({});
    const [mainPicture, setMainPicture] = useState();
    const [toggleCarrousel, setToggleCarrousel] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentsData, setCommentsData] = useState([]);
    const [errorComment, setErrorComment] = useState('');
    const [inputAddCart, setInputAddCart] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [actualUser, setActualUser] = useState({id: '', token: ''});
    let back = '< retour'

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('http://localhost:3000/api/products/oculaires/' + params.id)
        .then(res => res.json())
        .then(data => {
            console.log(data.data);
            let price;
            const productId = data.data.id;
            if (data.data !== undefined) {
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
                    focal: data.data.Product_attributes[0].focal,
                    priceNoPromo: data.data.price,
                    promoValue: data.data.promoValue,
                    promo: data.data.promo,
                    fov: data.data.Product_attributes[0].fov,
                    eyeRelief: data.data.Product_attributes[0].eyeRelief,
                    model: data.data.Product_attributes[0].OculaireModel.name,
                    brand: data.data.Product_attributes[0].Brand.name,
                    coulant: data.data.Product_attributes[0].coulant,
                    productId: data.data.id
                }
                  console.log(item);  
                if (data.data.stock < 1) {
                    setInputAddCart("0");
                } else {
                    setInputAddCart("1");
                }
                addToLastSeen(item, process.env.PUBLIC_URL + data.data.pictures[0]);
                fetchComment(productId);
                setOculaireData(item);
                setMainPicture(process.env.PUBLIC_URL + data.data.pictures)
            }
        });

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                let newObj = {
                    id: token.content,
                    token: token.version
                }
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    })
                    localStorage.removeItem('token');
                    setActualUser({id: "", token: ""})
                    return setIsLogged(false);
                };
                dispatch ({
                    type: 'LOG'
                })
                setActualUser({id: "", token: ""})
                setIsLogged(true);
                setActualUser(newObj);
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
            setActualUser({id: "", token: ""})
            setIsLogged(false);
        }; 

    },[]);

    const addToLastSeen = (itemData, imgData) => {
        let lastSeenArr = [];
        let item = {
            category: "oculaire",
            id: itemData.id,
            price: itemData.price,
            stock: itemData.stock,
            name: itemData.name,
            promo: itemData.promo,
            promoValue: itemData.promoValue,
            image: imgData
        }
        if (localStorage.getItem('lastSeen') !== null) {
            lastSeenArr = JSON.parse(localStorage.getItem('lastSeen'));
        }
        console.log(lastSeenArr);
        for(let i = 0; i < lastSeenArr.length;i++) {
            if(lastSeenArr[i].id === item.id) {
                let newArr = lastSeenArr.filter(el => el.id !== item.id);
                lastSeenArr = newArr;
            }
        }
        if(lastSeenArr.length > 0) {
            if(lastSeenArr.length < 4) {
                lastSeenArr.unshift(item);
            } else {
                lastSeenArr.pop();
                lastSeenArr.unshift(item);
            }
        } else {
            lastSeenArr.unshift(item)
        }
        console.log(lastSeenArr);
        localStorage.setItem('lastSeen', JSON.stringify(lastSeenArr));
    }

    const fetchComment = (productId) => {
        fetch("http://localhost:3000/api/comments/" + productId)
        .then(res => res.json())
        .then(data => {
            if(data.data !== undefined) {
                const arr = data.data;
                let n1 = arr.map(el => {
                    el.created = Date.parse(el.created);
                    el.updated = Date.parse(el.updated);
                   return el
                })
                n1.sort((a,b) => {
                    return b.updated - a.updated
                })
                setCommentsData(n1);
            } else {
                setCommentsData("");
            }
        })
        .catch(error => console.error(error));
    };

    const sendComment = (e) => {
        e.preventDefault();

        if (isLogged) {

            if (commentValue === "") {
                return setErrorComment("Le commentaire ne doit pas etre vide.");
            } else if(!commentValue.match(/^[a-zA-Zé èà,.'-€:!?]*$/)) {
                return setErrorComment("Le commentaire ne doit comporter que des lettres");
            } 

            let loggedUser = localStorage.getItem('token');

            fetch("http://localhost:3000/api/comments", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + JSON.parse(loggedUser).version
            },
            method: 'POST', 
            body: JSON.stringify({category: "oculaire", productId: oculaireData.productId, userId: JSON.parse(loggedUser).content, comment: commentValue})})
                .then(res => {
                    if (res.status === 201) {
                        fetchComment(oculaireData.productId);
                        setCommentValue('');
                        setErrorComment("");
                    } else {
                        setErrorComment("Un problème est survenu.");
                    } 
                })
                .catch(error => console.error(error));
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
        setCommentValue(value);
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

            if (newVal > 1) {
                lessBtn.classList.remove('oculaireProduct__top__right__addCart__countCont__btn--unselected')
            }
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
    };

    const deleteComment = (userId, token, commentId) => {

        fetch('http://localhost:3000/api/comments/' + commentId , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            method : 'DELETE',
            body: JSON.stringify({ userId : userId })
        })
            .then(res => res.json())
            .then(data => {
                fetchComment(oculaireData.productId);
            })
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
                        <ConfirmationModal isProductPage={true} name={oculaireData.name} price={oculaireData.price} count={inputAddCart} stock={oculaireData.stock} img={mainPicture} id={oculaireData.id} category={"oculaire"} />
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
                    <div className="oculaireInfos__infos__commentsCont__error">{errorComment}</div>
                    <form onSubmit={sendComment} className='oculaireInfos__infos__commentsCont__form' action="" method="post">
                        <textarea onInput={(e) => changeCommentValue(e.target.value)} value={commentValue} className="oculaireInfos__infos__commentsCont__form__textArea"></textarea>
                        {
                            isLogged ?
                            <button className='montureInfos__infos__commentsCont__form__btn'>Envoyer</button>
                            :
                            <p className='montureInfos__infos__commentsCont__form__notLoggedMsg'>Vous devez etre connecté pour envoyer un commentaire.</p>
                        }
                    </form>
                    <div className="montureInfos__infos__commentsCont__separator"></div>
                    {
                        (commentsData.length === 0) ?
                        <p className='oculaireInfos__infos__commentsCont__status'>PAS ENCORE DE COMMENTAIRES</p>
                        :
                        <>
                            {
                                commentsData.map(el => {
                                    return <Comment comment={el.comment} key={el.id} productId={el.productId} commentId={el.id} userId={el.userId} productCat={el.productCat} created={el.created} updated={el.updated} actualUserId={actualUser.id} actualUserToken={actualUser.token} fetchFunc={fetchComment} deleteFunc={deleteComment} />
                                })
                            }
                        </>
                    }
                </div>
            </div>
        </section>
        </main>
    );
};

export default OculaireProduct;