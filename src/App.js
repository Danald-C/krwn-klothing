import './App.css';
import {Routes, Route, Redirect} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { firebaseAuth, createUserProfileDoc } from './firebase/firebase.utils';
import { onSnapshot, getDoc } from "firebase/firestore";
import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';


/* const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
) */

class App extends React.Component{
  /* constructor(){
    super();

    this.state = {
      currentUser: null
    }
  } */

  unsubscribeFromAuth = null;

  componentDidMount(){
    // const { setCurrentUser } = this.props;
    const { newUser } = this.props;
    
    this.unsubscribeFromAuth = firebaseAuth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: userAuth});
      // console.log(userAuth)
      
      if(userAuth){
        const userRef = await createUserProfileDoc(userAuth)
        
        /* const snapShot = await getDoc(userRef);
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          }
        }) */
        onSnapshot(userRef, (snapshot) => {
          /* this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state.currentUser)
          }) */
          newUser({
            id: snapshot.id,
            ...snapshot.data()
          })
        })
      }

      // this.setState({currentUser: userAuth}) // When userAuth not set, it returns null
      newUser(userAuth) // When userAuth not set, it returns null
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
  render(){
    return (
      <div>
        {/* <HomePage /> */}
        {/* This stays here because we need it to always show regardless of what page is active by the Routes */}
        {/* <Header currUser={this.state.currentUser} /> */}
        <Header />
        <Routes>
            {/* exact, exact={true/false} or completely taken off */}
            <Route exact path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            {/* <Route path='/signin' element={<SignInAndSignUp />} /> */}
            <Route exact path='/signin' render={() => this.props.thisUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />
            {/* <Route path='/hats' element={<HatsPage />} /> */}
        </Routes>
      </div>
    );
  }
}

// mapStateToProps is the ideal name to use
const getDataFromReducer = ({ user }) => ({
  thisUser: user.currUser // Connect() will pass this prop thisUser to the specified component
})

// mapDispatchToProps is the ideal name to use
// const sendDataToReducer = dispatch => ({
const sendDataToReducer = setData => ({
  // setCurrentUser: user => dispatch(setCurrentUser(user))
  newUser: uData => setData(setCurrentUser(uData)) // This whole line is a function. uData is incoming arg data. Whenever we call newUser (call it as newUser(data) because it points to a function), uData is passed in it as an argument. In that function we also call setData() (provided by connect()) which also passes setCurrentUser (which returns an object) as an arg which also expects uData
})

// export default App;
// connect() after processing Reducer puts results into newUser prop & then hands it over to the State's props 'this.props.newUser'
// Because it point to a function, we always call it as a function newUser(data)
// Connect() is telling sendDataToReducer to always listen to App because App will call a property 'newUser' it contains
export default connect(getDataFromReducer, sendDataToReducer)(App);
