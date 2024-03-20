import React from 'react'
import FormInputs from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, createUserProfileDoc } from '../../firebase/firebase.utils';
import './sign-up.styles.css'

class SignUp extends React.Component{
    constructor(){
        super()

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmpassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmpassword} = this.state;
        
        if(password !== confirmpassword){
            alert("Passwords don't match.")
            return
        }

        /* createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            createUserProfileDoc(user, {displayName})
            // ...
          }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          }); */

        try{
            // const {user} = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            const {user} = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            createUserProfileDoc(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmpassword: ''
            })
        }catch(error){
            console.error(error)
        }
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmpassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account.</h2>
                <span>Sign up with your email & password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInputs type='text' name='displayName' value={displayName} label='Display Name' onChange={this.handleChange} required />
                    <FormInputs type='email' name='email' value={email} label='Email' onChange={this.handleChange} required />
                    <FormInputs type='password' name='password' value={password} label='Password' onChange={this.handleChange} required />
                    <FormInputs type='password' name='confirmpassword' value={confirmpassword} label='ConfirmPassword' onChange={this.handleChange} required />
                    {/* <input className='form-input' type='text' /> */}
                    
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;