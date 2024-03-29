import React from "react";
import {connect} from 'react-redux'

import CustomButton from "../custom-button/custom-button.component";
import { CartItem } from "../cart-item/cart-item.component";
import './cart-dropdown.styles.css'

const CartDropdown = ({cartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(crtItem => (
                    <CartItem key={crtItem.id} item={crtItem} />
                ))
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

const getReducerData = ({cart: {cartItems}}) => ({
    cartItems
})

export default connect(getReducerData)(CartDropdown);