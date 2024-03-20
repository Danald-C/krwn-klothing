import React from 'react'
import './sign-in.styles.css'
import FormInputs from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithEmailAndPassword  } from "firebase/auth";
import { firebaseAuth, SignInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        /* signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        }); */

        try{
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            this.setState({email: '', password: ''})
        }catch(error){
            console.log(error)
        }
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render(){
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInputs name='email' type='email' handleChange={this.handleChange} value={this.state.email} label='email' required />
                    <FormInputs name='password' type='password' handleChange={this.handleChange} value={this.state.password} label='password' required />

                    <div className='buttons'>
                        <CustomButton type='submit'>Sign Up</CustomButton>
                        <CustomButton onClick={SignInWithGoogle} isGoogleBtn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;