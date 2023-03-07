// import { useEffect } from 'react';
// import { getRedirectResult  } from 'firebase/auth';
import {auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentfromAuth } from '../../utils/firebase/firebase.utils';
import '../signin/signin.styles.scss';
import SignUpForm from '../../components/sign-up/sign-up-form.component';

const SignIn =() => {

    // useEffect(() => {
    //     const fetchData = async() => {
    //       const response = await getRedirectResult(auth);
    //       console.log(response);
    //       if(response) {
    //         const userDocRef = await createUserDocumentfromAuth(response.user);
    //       }
    //     }
    //     fetchData();
    //   }, []);

    const logGoogleUser = async () => {
        //const response = await signInWithGooglePopup();
        //Destructured
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentfromAuth(user);
    }

    return (<div>
    <h2>I already have an account</h2>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
    <SignUpForm/>
    </div>);
}

export default SignIn;