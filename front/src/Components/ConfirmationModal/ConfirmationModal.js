import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

const ConfirmationModal = (props) => {

    const dispatch = useDispatch();

    const [toggleModal, setToggleModal] = useState(false);
    const [isProductPage, setIsProductPage] = useState(false);

    useEffect(() => {
        if (props.isProductPage) {
            setIsProductPage(true)
        }
    },[])

    const modalToggle = () => {
        setToggleModal(!toggleModal);
    }

    const addToCart = () => {
        if(props.stock !== 0) {
            let item;

            if(props.category === "monture") {
                item = {
                    category: "monture",
                    id: props.id,
                    count: props.count,
                    price: props.price,
                    stock: props.stock,
                    name: props.name,
                    image: process.env.PUBLIC_URL + props.img[0].img
                }
            } else if(props.category === "telescope") {
                item = {
                    category: "telescope",
                    id: props.id,
                    count: props.count,
                    price: props.price,
                    stock: props.stock,
                    name: props.name,
                    image: process.env.PUBLIC_URL + props.img[0].img
                }
            } else if (props.category === "oculaire") {
                item = {
                    category: "oculaire",
                    id: props.id,
                    count: props.count,
                    price: props.price,
                    stock: props.stock,
                    name: props.name,
                    image: props.img
                }
            }
            console.log(props.price);
            dispatch({
                type: 'ADDTOCART',
                payload: item
            })

            modalToggle();
        }
    }

    return (
        <>
        {
            isProductPage ?
            <button onClick={addToCart} className='telescopeProduct__top__right__addCart__addBtn'><FontAwesomeIcon className='telescopeProduct__top__right__addCart__addBtn__cart' icon={faShoppingCart} /> Ajouter au panier</button>
            :
            <button onClick={addToCart} className='telescopeCard__buttons__btn telescopeCard__buttons__btn__buy'>Acheter</button>
        }
        {
            toggleModal &&
            <div className="confirmModal">
                <div className="confirmModal__modal">
                    <div className="confirmModal__modal__top">
                        <p>{props.count} article{props.count > 1 && "s"} ajouté{props.count > 1 && "s"} au panier </p>
                    </div>
                    <h2>{props.name}</h2>
                    <p>Prix unitaire: <span>{props.price} €</span></p>
                    <div className="confirmModal__modal__separator"></div>
                    <p className="confirmModal__modal__result">Prix total: <span>{(parseFloat(props.price) * parseInt(props.count)).toFixed(2)} €</span></p>
                    <div className="confirmModal__modal__btnCont">
                        <button className='confirmModal__modal__btnCont__continueBtn' onClick={modalToggle}>Continuer les achats</button>
                        <NavLink to="/cart">
                            <button className='confirmModal__modal__btnCont__toCartBtn' onClick={modalToggle} >Votre panier</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        }
        </>
    );
};

export default ConfirmationModal;