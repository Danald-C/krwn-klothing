import React from 'react'
import './menu-item.styles.css'

const MenuItem = ({title, imgUrl, size}) => (
    <div className={`${size} menu-item`}>
        <div className='background-image' style={{backgroundImage: `url(${imgUrl})` }} />
        <div className='content background-image'>
            <h2>{title.toUpperCase()}</h2>
            <span>SHOP NOW</span>
        </div>
    </div>
)

export default MenuItem;