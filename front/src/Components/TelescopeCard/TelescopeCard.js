import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

const TelescopeCard = (props) => {

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
        const lessBtn = document.getElementById('telescopeCard__lessBtn' + props.id);
        const addBtn = document.getElementById('telescopeCard__addBtn' + props.id);
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
        console.log(newVal);

        if(newVal > 1 && newVal !== props.stock) {
            if(lessBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                lessBtn.classList.remove('telescopeCard__addCount__btn--unselected')
            } 
            if(addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                addBtn.classList.remove('telescopeCard__addCount__btn--unselected')
            }
        } else if(newVal === 1) {
            if(addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                addBtn.classList.remove('telescopeCard__addCount__btn--unselected')
            }

            if(!lessBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                lessBtn.classList.add('telescopeCard__addCount__btn--unselected')
            }
        } else if(newVal === props.stock) {
            if (newVal === 2) {
                if(lessBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                    lessBtn.classList.remove('telescopeCard__addCount__btn--unselected')
                } 
                if(addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                    addBtn.classList.remove('telescopeCard__addCount__btn--unselected')
                }
            }
            if(!addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                addBtn.classList.add('telescopeCard__addCount__btn--unselected')
            }
        }
        setInputValue(newVal);
    }

    return (
            <li className='telescopeCard' >
                <NavLink className='telescopeCard__link' to={'/telescope/ref_=' + props.id}>
                    <h3>{props.name}</h3>
                    <img className='telescopeCard__img' src={process.env.PUBLIC_URL + props.image} alt={"photo de " + props.name} />
                </NavLink>
                <p className='telescopeCard__price'>{props.promo && <span className='telescopeCard__price__span'>{'-' + props.promoValue + "%"}</span>}{price} €</p>
                <div className="telescopeCard__addCount">
                    <button onClick={() => changeInputValue('less')} className='telescopeCard__addCount__btn telescopeCard__addCount__btn--unselected' id={"telescopeCard__lessBtn" + props.id}>-</button>
                    <input onInput={(e) => changeInputValue('change', e.target.value)} className='telescopeCard__addCount__input' type="number" min='1' max={props.stock} value={inputValue} />
                    <button onClick={() => changeInputValue('add')} className={props.stock < 2 ? 'telescopeCard__addCount__btn telescopeCard__addCount__btn--unselected' : 'telescopeCard__addCount__btn'} id={"telescopeCard__addBtn" + props.id}>+</button>
                </div>
                <div className="telescopeCard__buttons">
                    <NavLink to={'/telescope/ref_=' + props.id}>
                        <button className='telescopeCard__buttons__btn telescopeCard__buttons__btn__infos'>Infos</button>
                    </NavLink>
                    <ConfirmationModal name={props.name} price={price} count={inputValue} stock={props.stock} img={props.image} id={props.id} category={"telescope"} />
                </div>
            </li>
    );
};

export default TelescopeCard;