import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


const MontureCard = (props) => {
    const dispatch = useDispatch();
    let inputFirstValue;
    
    (props.stock === 0) ? (inputFirstValue = 0): (inputFirstValue = 1);

    const [inputValue, setInputValue] = useState(inputFirstValue);
    const [price, setPrice] = useState();

    useEffect(() => {
        let val;
        if(props.promo === true) {
            let reduction = (props.price / 100) * props.promoValue;
            val = props.price - reduction;
        } else {
            val = props.price;
        }
        setPrice((val).toFixed(2));
    },[]);

    const changeInputValue = (action, value) => {
        const lessBtn = document.getElementById('montureCard__lessBtn' + props.id);
        const addBtn = document.getElementById('montureCard__addBtn' + props.id);
        let val = inputValue, newVal; 

        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            
            (inputValue !== props.stock) ? (newVal = val + 1) : (newVal = val)

        } else if(action === 'less') {

            (val > 1) ? (newVal = val -1) : (newVal = val)

        } else if(action === 'change') {
            newVal = parseInt(value);
            
            (newVal >= props.stock) && (newVal = props.stock)
        }

        if(newVal > 1 && newVal !== props.stock) {
            if(lessBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                lessBtn.classList.remove('montureCard__addCount__btn--unselected')
            } 
            if(addBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                addBtn.classList.remove('montureCard__addCount__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                addBtn.classList.remove('montureCard__addCount__btn--unselected')
            }

            if(!lessBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                lessBtn.classList.add('montureCard__addCount__btn--unselected')
            }
        } else if(newVal === props.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                    lessBtn.classList.remove('montureCard__addCount__btn--unselected')
                } 
                if(addBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                    addBtn.classList.remove('montureCard__addCount__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('montureCard__addCount__btn--unselected')) {
                addBtn.classList.add('montureCard__addCount__btn--unselected')
            }
        }
        setInputValue(newVal);
    }
    
    const addToCart = (value) => {
        if (props.stock !== 0) {

            let item = {
                category: "monture",
                id: props.id,
                count: value,
                price: props.price,
                stock: props.stock,
                name: props.name,
                image: process.env.PUBLIC_URL + props.image[0]
            }
            
            dispatch({
                type: 'ADDTOCART',
                payload : item
            })
        
        } 
    }

    return (
        <li className='montureCard' >
                <NavLink className='montureCard__link' to={'/monture/ref_=' + props.id}>
                    <h3>{props.name}</h3>
                    <img className='montureCard__img' src={process.env.PUBLIC_URL + props.image[0]} alt={"photo de " + props.name} />
                </NavLink>
                <p className='montureCard__price'>{props.promo && <span className='montureCard__price__span'>{'-' + props.promoValue + "%"}</span>}{price} €</p>
                <div className="montureCard__addCount">
                    <button onClick={() => changeInputValue('less')} className='montureCard__addCount__btn montureCard__addCount__btn--unselected' id={'montureCard__lessBtn' + props.id}>-</button>
                    <input onInput={(e) => changeInputValue('change', e.target.value)} className='montureCard__addCount__input' type="number" min='1' max={props.stock} value={inputValue} />
                    <button onClick={() => changeInputValue('add')} className={props.stock < 2 ? 'montureCard__addCount__btn montureCard__addCount__btn--unselected' : 'montureCard__addCount__btn'} id={"montureCard__addBtn" + props.id}>+</button>
                </div>
                <div className="montureCard__buttons">
                    <NavLink to={'/monture/ref_=' + props.id}>
                        <button className='montureCard__buttons__btn montureCard__buttons__btn__infos'>Infos</button>
                    </NavLink>
                    <button onClick={() => addToCart(inputValue)} className='montureCard__buttons__btn montureCard__buttons__btn__buy'>Acheter</button>
                </div>
            </li>
    );
};

export default MontureCard;