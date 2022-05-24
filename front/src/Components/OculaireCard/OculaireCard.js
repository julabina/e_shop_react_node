import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const OculaireCard = (props) => {

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
        const lessBtn = document.getElementById('oculaireCard__lessBtn' + props.id);
        const addBtn = document.getElementById('oculaireCard__addBtn' + props.id);
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
            if(lessBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                lessBtn.classList.remove('oculaireCard__addCount__btn--unselected')
            } 
            if(addBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                addBtn.classList.remove('oculaireCard__addCount__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                addBtn.classList.remove('oculaireCard__addCount__btn--unselected')
            }

            if(!lessBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                lessBtn.classList.add('oculaireCard__addCount__btn--unselected')
            }
        } else if(newVal === props.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                    lessBtn.classList.remove('oculaireCard__addCount__btn--unselected')
                } 
                if(addBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                    addBtn.classList.remove('oculaireCard__addCount__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('oculaireCard__addCount__btn--unselected')) {
                addBtn.classList.add('oculaireCard__addCount__btn--unselected')
            }
        }
        setInputValue(newVal);
    }

    return (
        <li className='oculaireCard' >
                <NavLink className='oculaireCard__link' to={'/oculaire/ref_=' + props.id}>
                    <h3>{props.name}</h3>
                    <img className='oculaireCard__img' src={process.env.PUBLIC_URL + props.image} alt={"photo de " + props.name} />
                </NavLink>
                <p className='oculaireCard__price'>{props.promo && <span className='oculaireCard__price__span'>{'-' + props.promoValue + "%"}</span>}{price} €</p>
                <div className="oculaireCard__addCount">
                    <button onClick={() => changeInputValue('less')} className='oculaireCard__addCount__btn oculaireCard__addCount__btn--unselected' id={'oculaireCard__lessBtn' + props.id}>-</button>
                    <input onInput={(e) => changeInputValue('change', e.target.value)} className='oculaireCard__addCount__input' type="number" min='1' max={props.stock} value={inputValue} />
                    <button onClick={() => changeInputValue('add')} className={props.stock < 2 ? 'oculaireCard__addCount__btn oculaireCard__addCount__btn--unselected' : 'oculaireCard__addCount__btn'} id={"oculaireCard__addBtn" + props.id}>+</button>
                </div>
                <div className="oculaireCard__buttons">
                    <NavLink to={'/oculaire/ref_=' + props.id}>
                        <button className='oculaireCard__buttons__btn oculaireCard__buttons__btn__infos'>Infos</button>
                    </NavLink>
                    <ConfirmationModal name={props.name} price={price} count={inputValue} stock={props.stock} img={props.image} id={props.id} category={"oculaire"} />
                </div>
            </li>
    );
};

export default OculaireCard;