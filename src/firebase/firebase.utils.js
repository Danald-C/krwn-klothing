// Import the functions you need from the SDKs you need
// import { Firestore, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
// import Firestore from 'firebase/firestore'

// import {useEffect, useState} from "react";
// import { loggedIn, firebaseObserver } from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvu_VqxwvIqoM5hI7JFersbaClXfCCMU4",
  authDomain: "krwn-klothing.firebaseapp.com",
  projectId: "krwn-klothing",
  storageBucket: "krwn-klothing.appspot.com",
  messagingSenderId: "1020533501040",
  appId: "1:1020533501040:web:f525e81b79bb09479ed8b5",
  measurementId: "G-QCH3WSFDCH"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


const provider = new GoogleAuthProvider(); // Use google's provider. There're varieties from various providers eg. Twitter, Facebook etc.
// provider.setCustomParameters({prompt: 'select_account'})
// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});
provider.addScope('profile');
provider.addScope('email');

export const firebaseAuth = getAuth();

// export const SignInWithGoogle = auth.SignInWithPopup(provider);
export const SignInWithGoogle = () => {
  signInWithPopup(firebaseAuth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    // console.log("SignInWithGoogle")
    // console.log(user)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}

// On the page to receive SignInWithGoogle, you can perform logGoogleUser
// export const SignInWithGoogle = () => signInWithPopup(auth, provider);
/* const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }
    return (
        <div>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}
SignIn can be exported or used internally */

/* // Sign in using a popup.
const result = await signInWithPopup(firebaseAuth, provider);
// This gives you a Google Access Token.
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
// The signed-in user info.
export const user = result.user; */

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const dbRef = collection(db, "users");
  
  // const userRef = firestore.doc('/users/02081631_u')
  // const userRef = db.doc(`/users/${userAuth.uid}`)
  // const userRef = doc(dbRef, userAuth.uid)
  const userRef = doc(db, "users", userAuth.uid);
  // const userRef = doc(`/users/${userAuth.uid}`);
  // const snapShot = await userRef.get()
  const snapShot = await getDoc(userRef);
  
    // console.log(userRef)
    // console.log(snapShot)
  
  if(!snapShot.exists()){
    const {displayName, email} = userAuth
    const dateCreated = new Date()

    try{
      // Add a new document in collection "cities"
      // await setDoc(doc(db, "users", userAuth.uid), {
      await setDoc(userRef, {
        displayName, email, dateCreated, ...additionalData
      });
    }catch(error){
      console.log('Error creating user.', error.message)
    }
  }

  return userRef;
} 


/* signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  }); */

