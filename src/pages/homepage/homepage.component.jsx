import React from 'react'
import './homepage.styles.css';
import '../../components/directory/directory.component'
import Directory from '../../components/directory/directory.component';

const HomePage = () => (
    <div className='homepage'>
        <Directory />
    </div>
)


export default HomePage;