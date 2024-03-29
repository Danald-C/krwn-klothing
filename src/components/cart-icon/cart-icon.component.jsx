import React from "react";

import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg.svg'
import './cart-icon.styles.css'

import { connect } from 'react-redux'
import { toggleCartHidden } from '../../redux/cart/cart-actions'
import { getCartItemsCount } from "../../redux/cart/cart-selectors";

const CartIcon = ({toggleCartState, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartState}>
        <ShoppingIcon className="shopping-icon" />
        <span className="item-count">{itemCount}</span>
    </div>
)

// mapDispatchToProps is the ideal name to use
const sendDataToReducer = setData => ({
  toggleCartState: () => setData(toggleCartHidden()) // This whole line is a function. cartData is incoming arg data. Whenever we call toggleCartState (call it as toggleCartState(data) because it points to a function), cartData is passed in it as an argument. In that function we also call setData() (provided by connect()) which also passes toggleCartHidden (which returns an object) as an arg which also expects cartData
})

/* const getDataFromReducer = ({cart: {cartItems}}) => ({
  itemCount: cartItems.reduce((accumQuant, cartItem) => accumQuant+cartItem.quantity, 0) // .reduce is a native array method in JavaScript
}) */
const getDataFromReducer = state => ({
  itemCount: getCartItemsCount(state) // .reduce is a native array method in JavaScript
})

export default connect(getDataFromReducer, sendDataToReducer)(CartIcon);