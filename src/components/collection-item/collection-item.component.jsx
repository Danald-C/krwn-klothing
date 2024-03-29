import React from 'react'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import { addCartItem } from '../../redux/cart/cart-actions';
import './collection-item.styles.css'

// const CollectionItem = ({id, name, price, imageUrl}) => (
const CollectionItem = ({item, thisCartItem}) => {
    const {name, price, imageUrl} = item;
    return (
    <div className='collection-item'>
        <div className='image' style={{backgroundImage: `url(${imageUrl})`}} />
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
        </div>
        <CustomButton onClick={() => thisCartItem(item)} inverted>Add to cart</CustomButton>
    </div>
    )
}

const sendDataToReducer = reduxProcessor => ({
    thisCartItem: argData => reduxProcessor(addCartItem(argData))
})

export default connect(null, sendDataToReducer)(CollectionItem);