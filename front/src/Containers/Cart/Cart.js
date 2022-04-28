import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {

    const { cart } = useSelector(state => ({
        ...state.cartReducer
    }))

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(cart);
    },[cart])

    return (
        <div>
            
        </div>
    );
};

export default Cart;