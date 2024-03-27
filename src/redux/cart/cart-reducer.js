import { cartActionTypes } from "./cart-types";

const INIT_STATE = {
    hidden: true
};

const cartReducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden // Exclamation '!': Always return opposite of state.hidden. state.hidden is boolean 'true/false'
            }
        default:
            return state;
    }
}

export default cartReducer;