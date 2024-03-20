import './App.css';
import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { firebaseAuth, createUserProfileDoc } from './firebase/firebase.utils';
import { onSnapshot, getDoc } from "firebase/firestore";
import React from 'react';


/* const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
) */

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
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
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state.currentUser)
          })
        })
      }

      this.setState({currentUser: userAuth}) // When userAuth not set, it returns null
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
        <Header currUser={this.state.currentUser} />
        <Routes>
            {/* exact, exact={true/false} or completely taken off */}
            <Route exact path='/' element={<HomePage />} />
            <Route path='/shop' element={<ShopPage />} />
            <Route path='/signin' element={<SignInAndSignUp />} />
            {/* <Route path='/hats' element={<HatsPage />} /> */}
        </Routes>
      </div>
    );
  }
}

export default App;
