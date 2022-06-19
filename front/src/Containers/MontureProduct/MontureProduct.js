import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { decodeToken, isExpired } from 'react-jwt';
import ProductCarrousel from '../../Components/ProductCarrousel/ProductCarrousel';
import { useDispatch } from 'react-redux';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal';
import Comment from '../../Components/Comment/Comment';

const MontureProduct = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const [montureData, setMontureData] = useState({});
    const [picturesData, setPicturesData] = useState([]);
    const [mainPicture, setMainPicture] = useState();
    const [toggleCarrousel, setToggleCarrousel] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentsData, setCommentsData] = useState([]);
    const [errorComment, setErrorComment] = useState('');
    const [inputAddCart, setInputAddCart] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [actualUser, setActualUser] = useState({id: '', token: ''});
    let back = '< retour';

    useEffect(() => {

        window.scrollTo(0, 0);

        fetch('http://localhost:3000/api/products/montures/' + params.id)
            .then(res => res.json())
            .then(data => {
                const productId = data.data.id;
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
                        type: data.data.Product_attributes[0].MountType.name,
                        price: (price).toFixed(2),
                        stock: data.data.stock,
                        description1: data.data.description1,
                        description2: data.data.description2,
                        description3: data.data.description3,
                        priceNoPromo: data.data.price,
                        promoValue: data.data.promoValue,
                        promo: data.data.promo,
                        capacity: data.data.Product_attributes[0].capacity,
                        goTo: data.data.Product_attributes[0].goTo,
                        productId: data.data.id
                    };
                    for(let i = 0; i < data.data.pictures.length; i++) {
                        let pict = {
                            img: data.data.pictures[i],
                            id: uuidv4(),
                            ind: i
                        };
                        newArr.push(pict);
                    }
                    if (data.data.stock < 1) {
                        setInputAddCart(0);
                    } else {
                        setInputAddCart(1);
                    }
                    addToLastSeen(item,  data.data.pictures);
                    fetchComment(productId);
                    setPicturesData(newArr);
                    setMontureData(item);
                    setMainPicture(data.data.pictures[0]);
                }
            })

        if (localStorage.getItem('token') !== null) {
            let getToken = localStorage.getItem('token');
            let token = JSON.parse(getToken);
            if (token !== null) {
                let decodedToken = decodeToken(token.version);
                let isTokenExpired = isExpired(token.version);
                let newObj = {
                    id: token.content,
                    token: token.version
                };
                if (decodedToken.userId !== token.content || isTokenExpired === true) {
                    dispatch ({
                        type: 'DISCONNECT'
                    });
                    localStorage.removeItem('token');
                    setActualUser({id: "", token: ""});
                    return setIsLogged(false);
                };
                dispatch ({
                    type: 'LOG'
                });
                setIsLogged(true);
                setActualUser(newObj);
            } else {
                dispatch ({
                    type: 'DISCONNECT'
                });
                setActualUser({id: "", token: ""});
                setIsLogged(false);
            };
        } else {
            dispatch ({
                type: 'DISCONNECT'
            });
            setActualUser({id: "", token: ""});
            setIsLogged(false);
        }; 

    },[]);

    /**
     * ADD TO LASTSEEN IN LOCALSTORAGE
     * @param {*} itemData 
     * @param {*} imgData 
     */
    const addToLastSeen = (itemData, imgData) => {

        let lastSeenArr = [];
        let item = {
            category: "monture",
            id: itemData.id,
            price: itemData.price,
            stock: itemData.stock,
            name: itemData.name,
            promo: itemData.promo,
            promoValue: itemData.promoValue,
            image: imgData
        };
        if (localStorage.getItem('lastSeen') !== null) {
            lastSeenArr = JSON.parse(localStorage.getItem('lastSeen'));
        }
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
            lastSeenArr.unshift(item);
        }
        localStorage.setItem('lastSeen', JSON.stringify(lastSeenArr));
    };
    
    /**
     * GET ALL PRODUCT COMMENTS
     * @param {*} productId 
     */
    const fetchComment = (productId) => {

        fetch("http://localhost:3000/api/comments/" + productId)
            .then(res => res.json())
            .then(data => {
                if(data.data !== undefined) {
                    const arr = data.data;
                    let n1 = arr.map(el => {
                        el.created = Date.parse(el.created);
                        el.updated = Date.parse(el.updated);
                        return el;
                    });
                    n1.sort((a,b) => {
                        return b.updated - a.updated;
                    });
                    setCommentsData(n1);
                } else {
                    setCommentsData("");
                }
            })
            .catch(error => console.error(error));
    };

    /**
     * VALIDATE AND SEND COMMENT TO BACK-END
     * @param {*} e 
     * @returns 
     */
    const sendComment = (e) => {
        e.preventDefault();

        if (isLogged) {

            let commentValueArr = commentValue.split('\n'), commentToSend = "";
            if(commentValue !== "") {
                for (let i = 0;i < commentValueArr.length; i++) {
                    if(!commentValueArr[i].match(/^[a-zA-Zé èà,.'-€:!?]*$/)) {
                        return setErrorComment("Le commentaire ne doit comporter que des lettres.");
                    }
                }
            } else {
                return setErrorComment("Le commentaire ne doit pas etre vide.");
            }
            commentToSend = commentValueArr.join('<br />');

            let loggedUser = localStorage.getItem('token');

            fetch("http://localhost:3000/api/comments", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + JSON.parse(loggedUser).version
            },
            method: 'POST', 
            body: JSON.stringify({category: "monture", productId: montureData.productId, userId: JSON.parse(loggedUser).content, comment: commentToSend})})
                .then(res => {
                    if (res.status === 201) {
                        fetchComment(montureData.productId);
                        setCommentValue('');
                        setErrorComment("");
                    } else {
                        setErrorComment("Un problème est survenu.");
                    } 
                })
                .catch(error => console.error(error));
        }
    };

    /**
     * CHANGE IMAGE 
     */
    const changeImg = (img, ind) => {

        const tinyImgs = document.querySelectorAll('.montureProduct__top__left__tinyImg__cont__cover');
        for (let i = 0; i < tinyImgs.length; i++) {
            if (tinyImgs[i].classList.contains('montureProduct__top__left__tinyImg__cont__cover--active') && i !== parseInt(ind)) {
                tinyImgs[i].classList.remove('montureProduct__top__left__tinyImg__cont__cover--active');
            }
            if(i === parseInt(ind) && !tinyImgs[i].classList.contains('montureProduct__top__left__tinyImg__cont__cover--active')) {
                tinyImgs[i].classList.add('montureProduct__top__left__tinyImg__cont__cover--active');
            }
        }
        let pict =  img;
        setMainPicture(pict);
    };

    /**
     * CHANGE TAB INFORMATIONS
     * @param {*} valArr 
     */
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
                    tabs[i].classList.add('montureInfos__tabsCont__tab--active');
                    infos[i].classList.add('montureInfos__infos--active');
                }
            }
        }
    };

    /**
     * TOGGLE CARROUSEL
     */
    const toggleCarrouselFunc = () => {
        setToggleCarrousel(!toggleCarrousel);
    };

    /**
     * CONTROL COMMENT INPUT
     * @param {*} value 
     */
    const changeCommentValue = (value) => {
        setCommentValue(value);
    };

    /**
     * CONTROL OTHER INPUTS
     * @param {*} action 
     * @param {*} value 
     */
    const changeInputValue = (action, value) => {

        const lessBtn = document.getElementById('montureProduct__lessBtn');
        const addBtn = document.getElementById('montureProduct__addBtn');
        let val = inputAddCart, newVal; 

        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            
            (inputAddCart !== montureData.stock) ? (newVal = val + 1) : (newVal = val);

        } else if(action === 'less') {

            (val > 1) ? (newVal = val -1) : (newVal = val);

        } else if(action === 'change') {
            newVal = parseInt(value);
            
            (newVal >= montureData.stock) && (newVal = montureData.stock);

            if (newVal > 1) {
                lessBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
            }
        }

        if(newVal > 1 && newVal !== montureData.stock) {
            if(lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
            } 
            if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
            }

            if(!lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                lessBtn.classList.add('montureProduct__top__right__addCart__countCont__btn--unselected');
            }
        } else if(newVal === montureData.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                    lessBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
                } 
                if(addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                    addBtn.classList.remove('montureProduct__top__right__addCart__countCont__btn--unselected');
                }
            }
            if(!addBtn.classList.contains('montureProduct__top__right__addCart__countCont__btn--unselected')) {
                addBtn.classList.add('montureProduct__top__right__addCart__countCont__btn--unselected');
            }
        }
        setInputAddCart(newVal);
    };

    /**
     * DELETE COMMENT
     * @param {*} userId 
     * @param {*} token 
     * @param {*} commentId 
     */
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
                fetchComment(montureData.productId);
            })
    };

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
                                        <img className='montureProduct__top__left__tinyImg__cont__img' src={el.img} alt={'photo de ' + montureData.name} />
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
                        <ConfirmationModal isProductPage={true} name={montureData.name} price={montureData.price} count={inputAddCart} stock={montureData.stock} img={picturesData} id={montureData.id} category={"monture"} />
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
                {montureData.imgDesc !== null && <img className='montureInfos__infos__img' src={montureData.imgDesc} alt={"photo de " + montureData.name} />}
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
                    <div className="montureInfos__infos__commentsCont__error">{errorComment}</div>
                    <form onSubmit={sendComment} className='montureInfos__infos__commentsCont__form' action="" method="post">
                        <textarea onInput={(e) => changeCommentValue(e.target.value)} value={commentValue} className="montureInfos__infos__commentsCont__form__textArea"></textarea>
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
                        <p className='montureInfos__infos__commentsCont__status'>PAS ENCORE DE COMMENTAIRES</p>
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

export default MontureProduct;