import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const TelescopeCard = (props) => {

    const dispatch = useDispatch();
    let inputFirstValue;
    
    (props.stock === 0) ? (inputFirstValue = 0): (inputFirstValue = 1);

    const [inputValue, setInputValue] = useState(inputFirstValue)


    const changeInputValue = (action, value) => {
        const lessBtn = document.getElementById('telescopeCard__lessBtn');
        const addBtn = document.getElementById('telescopeCard__addBtn');
        let val = inputValue, newVal; 

        console.log(props.stock);
        if (isNaN(val)) {
            val = 1;
        }

        if(action === 'add') {
            if(inputValue !== props.stock) {
                newVal = val + 1;
            } else {
                newVal = val;
            }
        } else if(action === 'less') {
            if(val > 1) {
                newVal =  val - 1;
            } else {
                newVal = val
            }
        } else if(action === 'change') {
            newVal = parseInt(value);
            if (newVal >= props.stock) {
                newVal = props.stock
            }
        }

        if(newVal > 1 && newVal !== props.stock) {
            if(lessBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                lessBtn.classList.remove('telescopeCard__addCount__btn--unselected')
            } 
            if(addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                addBtn.classList.remove('telescopeCard__addCount__btn--unselected')
            }
        } else if(newVal === 1) {
            if(!lessBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                lessBtn.classList.add('telescopeCard__addCount__btn--unselected')
            }
        } else if(newVal === props.stock) {
            if(!addBtn.classList.contains('telescopeCard__addCount__btn--unselected')) {
                addBtn.classList.add('telescopeCard__addCount__btn--unselected')
            }
        }
        setInputValue(newVal);
    }
    
    const addToCart = (value) => {
        if (props.stock !== 0) {

            let item = {
                id: props.id,
                count: value,
                price: props.price,
                stock: props.stock
            }
            
            dispatch({
                type: 'ADDTOCART',
                payload : item
            })
        
        } 
    }

    return (
            <li className='telescopeCard'>
                <NavLink className='telescopeCard__link' to={'/telescope/' + props.id}>
                    <h3>{props.name}</h3>
                    <img className='telescopeCard__img' src={process.env.PUBLIC_URL + props.image} alt={"photo de " + props.name} />
                </NavLink>
                <p className='telescopeCard__price'>{(props.price).toFixed(2)} €</p>
                <div className="telescopeCard__addCount">
                    <button onClick={() => changeInputValue('less')} className='telescopeCard__addCount__btn telescopeCard__addCount__btn--unselected' id='telescopeCard__lessBtn'>-</button>
                    <input onInput={(e) => changeInputValue('change', e.target.value)} className='telescopeCard__addCount__input' type="number" name="" min='1' max={props.stock} value={inputValue} />
                    <button onClick={() => changeInputValue('add')} className={props.stock === 0 ? 'telescopeCard__addCount__btn telescopeCard__addCount__btn--unselected' : 'telescopeCard__addCount__btn'} id='telescopeCard__addBtn'>+</button>
                </div>
                <div className="telescopeCard__buttons">
                    <NavLink to={'/telescope/' + props.id}>
                        <button className='telescopeCard__buttons__btn telescopeCard__buttons__btn__1'>Infos</button>
                    </NavLink>
                    <button onClick={() => addToCart(inputValue)} className='telescopeCard__buttons__btn telescopeCard__buttons__btn__2'>Acheter</button>
                </div>
            </li>
    );
};

export default TelescopeCard;