import React from "react";

import './cart-item.styles.css'

export const CartItem = ({item: {imageUrl, price, name, quantity}}) => (
    <div className="cart-item">
        <img src={imageUrl} alt="Collection Item" />
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} x ${price}</span>
        </div>
    </div>
)