import { cartActionTypes } from "./cart-types";
import { filterCartItems } from "./car-utils";

const INIT_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state=INIT_STATE, action) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden // Exclamation '!': Always return opposite of state.hidden. state.hidden is boolean 'true/false'
            }
        case cartActionTypes.ADD_CART_ITEM:
            return {
                ...state,
                // cartItems: [...state.cartItems, action.payload]
                cartItems: filterCartItems(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default cartReducer;