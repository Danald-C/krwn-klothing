import React from 'react'
import './custom-button.styles.css'

const CustomButton = ({children, isGoogleBtn, ...otherProps}) => (
    <button className={`${isGoogleBtn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;