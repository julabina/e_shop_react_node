const INITIAL_STATE = {
    cart : []
}

function cartReducer(state= INITIAL_STATE, action) {

    switch(action.type){
        case 'LOADCART': {
            return {
                ...state,
                cart: action.payload
            }
        }
        case 'ADDTOCART': {
            const cartArr = [...state.cart];
            const actPay = action.payload
            
            let newArr = cartArr.filter(el => el.category === actPay.category)
            let newArrFiltered = cartArr.filter(el => el.category !== actPay.category)
            
            if (newArr.length > 0) {
                let exist = false;
                for(let i = 0; i < newArr.length; i++) {
                    if (newArr[i].id === actPay.id) {
                        newArr[i].stock = actPay.stock;
                        let val = newArr[i].count + actPay.count;
                        if (val >= newArr[i].stock) {
                            val = newArr[i].stock;
                        }
                        newArr[i].count = val;
                        exist = true
                    } 
                }
                if (exist === false) {
                    newArr.push(actPay);
                }
            } else {
                newArr.push(actPay);
            }            

            const finalArr = [].concat(newArr, newArrFiltered);

            return {
                cart : finalArr
            }
        }
        case 'UPDATECART' : {
            const newArr = action.payload;
            return {
                cart : newArr
            }
        }
    }

    return state;

}

export default cartReducer;