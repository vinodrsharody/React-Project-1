import { signInWithGooglePopup, createUserDocumentfromAuth } from '../../utils/firebase/firebase.utils';
import '../signin/signin.styles.scss';

const SignIn =() => {

    const logGoogleUser = async () => {
        //const response = await signInWithGooglePopup();
        //Destructured
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentfromAuth(user);
    }

    return (<div>
    <h1>Sign in Page</h1>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>);
}

export default SignIn;