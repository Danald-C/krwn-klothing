import React from 'react'
import {Link} from 'react-router-dom'
import './header.styles.css'
import {ReactComponent as Logo} from '../../assets/crown.svg.svg'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { firebaseAuth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

const Header = ({thisUser, cartState}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                thisUser ? (<div className='option' onClick={() => firebaseAuth.signOut()}>SIGN OUT</div>) : (<Link className='option' to='/signin'>SIGN IN</Link>)
            }
            <CartIcon />
        </div>
        { cartState ? null : <CartDropdown /> }
    </div>
)

// mapStateToProps is the ideal name to use
// const getDataFromReducer = state => ({
const getDataFromReducer = ({user: { currUser }, cart: { hidden }}) => ({
    // thisUser is the same property passed into the header as an argument
    // thisUser: state.user.currUser, // Connect() will pass this prop thisUser to the specified component
    thisUser: currUser, // Connect() will pass this prop thisUser to the specified component
    // thisUser: state.cart.hidden, // Connect() will pass this prop thisUser to the specified component
    cartState: hidden
})

// export default Header;
// Go up the Reducer, get the property (on its state) needed to be passed into the header as an argument
// Now we can cut the original supply in App.js and get it directly from the Reducer
export default connect(getDataFromReducer, null)(Header); // Arg 1 is getting data, Arg 2 is setting