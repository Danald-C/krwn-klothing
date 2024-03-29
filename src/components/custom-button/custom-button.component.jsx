import React from 'react'
import './custom-button.styles.css'

const CustomButton = ({children, isGoogleBtn, inverted, ...otherProps}) => (
    <button className={`${isGoogleBtn ? 'google-sign-in' : ''} ${inverted ? 'inverted' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;