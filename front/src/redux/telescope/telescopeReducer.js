const INITIAL_STATE = {
    telescopes: []
}

function telescopeReducer(state = INITIAL_STATE, action) {

    switch(action.type){
        case 'LOADTELESCOPE': {
            return {
                ...state,
                telescopes: action.payload
            }
        }
    }

    return state;
}

export default telescopeReducer;

export const getTelescopes = () => dispatch => {
    fetch('http://localhost:3000/api/telescopes')
    .then(res => res.json())
    .then(data => {
        console.log(data.data);
        dispatch({
            type: 'LOADTELESCOPE',
            payload: data.data
        })
    })
}