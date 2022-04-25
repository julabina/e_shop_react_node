import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

const TelescopeProduct = () => {

    const params = useParams();
    const [telescopeData, setTelescopeData] = useState({});
    const [picturesData, setPicturesData] = useState([]);
    const [mainPicture, setMainPicture] = useState();
    let back = '< retour'

    useEffect(() => {
        fetch('http://localhost:3000/api/telescopes/' + params.id)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let price = (data.data.price).toFixed(2);
            let newArr = [];
            let item = {
                imgDesc: data.data.descriptionPicture,
                name: data.data.name,
                price: price,
                stock: data.data.stock,
                description1: data.data.description1,
                description2: data.data.description2,
                description3: data.data.description3
            }
            for(let i = 0; i < data.data.pictures.length; i++) {
                let pict = {
                    img: data.data.pictures[i],
                    id: uuidv4()
                }
                newArr.push(pict);
            }
            setPicturesData(newArr);
            setTelescopeData(item);
            setMainPicture(process.env.PUBLIC_URL + data.data.pictures[0])
        })
    },[])

    const changeImg = (img) => {

        let test =  process.env.PUBLIC_URL + img;
        setMainPicture(test);
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
                    <img className='telescopeProduct__top__left__mainImg__img' src={mainPicture} alt={'photo de ' + telescopeData.name} />
                </div>
                    <div className="telescopeProduct__top__left__tinyImg">
                        {picturesData.map(el => {
                            if (picturesData.length > 1) {
                                return (
                                    <div className="telescopeProduct__top__left__tinyImg__cont">
                                        <div onClick={() => changeImg(el.img)} className="telescopeProduct__top__left__tinyImg__cont__cover"></div>
                                        <img key={el.id} className='telescopeProduct__top__left__tinyImg__cont__img' src={process.env.PUBLIC_URL + el.img} alt={'photo de ' + telescopeData.name} />
                                    </div>
                                ) 
                            }
                        })}
                    </div>
                </div>
                <div className="telescopeProduct__top__right">
                    <h2>{telescopeData.name}</h2>
                    <p className='telescopeProduct__top__right__price'>{telescopeData.price} €</p>
                    {(telescopeData.stock === 0) ? <p className="telescopeProduct__top__right__stock telescopeProduct__top__right__stock--out">Rupture</p> : <p className="telescopeProduct__top__right__stock">En Stock</p> }
                    <div className="telescopeProduct__top__right__addCart">
                        <div className="telescopeProduct__top__right__addCart__countCont">
                            <button className="telescopeProduct__top__right__addCart__countCont__btn">-</button>
                            <input type="number" className="telescopeProduct__top__right__addCart__countCont__input" />
                            <button className="telescopeProduct__top__right__addCart__countCont__btn">+</button>
                        </div>
                        <button className='telescopeProduct__top__right__addCart__addBtn'><FontAwesomeIcon className='telescopeProduct__top__right__addCart__addBtn__cart' icon={faShoppingCart} /> Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </section>
        <section className="telescopeInfos">
            <div className="telescopeInfos__tabsCont">
                <div className="telescopeInfos__tabsCont__tab">Desciption</div>
                <div className="telescopeInfos__tabsCont__tab">Caractéristiques</div>
                <div className="telescopeInfos__tabsCont__tab">Commentaire</div>
            </div>
            <div className="">
                <h3>Tout savoir sur {telescopeData.name}</h3>
                <p className='telescopeInfos__infos__description'>{telescopeData.description1}</p>
                {telescopeData.description2 !== null && <p className='telescopeInfos__infos__description'>{telescopeData.description2}</p>}
                {telescopeData.imgDesc !== null && <img src={process.env.PUBLIC_URL + telescopeData.imgDesc} alt={"photo de " + telescopeData.name} />}
                {telescopeData.description3 !== null && <p className='telescopeInfos__infos__description'>{telescopeData.description3}</p>}
            </div>
        </section>
        </main>
    );
};
{/* <img src={process.env.PUBLIC_URL + telescopeData.img} alt={'photo de ' + telescopeData.name} /> */}

export default TelescopeProduct;

/* DESCRIPTION :
description title : Tout savoir sur ${nom du téléscope}

*/