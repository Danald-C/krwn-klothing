import React from 'react'
import {Link} from 'react-router-dom'
import './header.styles.css'
import {ReactComponent as Logo} from '../../assets/crown.svg.svg'
import { firebaseAuth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = ({currUser}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                currUser ? (<div className='option' onClick={() => firebaseAuth.signOut()}>SIGN OUT</div>) : (<Link className='option' to='/signin'>SIGN IN</Link>)
            }
        </div>
    </div>
)

const mapStateToProps = state => ({
    currUser: state.user.currUser
})

// export default Header;
export default connect(mapStateToProps, null)(Header);