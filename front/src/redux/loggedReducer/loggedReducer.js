const INITIAL_STATE = {
    logged : false
};

function loggedReducer(state= INITIAL_STATE, action) {
    
    switch (action.type) {
        case 'LOG' : {
            return {
                logged : true   
            }
        }
        case 'DISCONNECT': {
            return {
                logged : false   
            }
        }
    }

    return state;

};

export default loggedReducer;