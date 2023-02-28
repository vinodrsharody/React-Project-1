import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCk1CbKsaLYozOtGk_ixAmVqznTP0ZIhQg",
  authDomain: "crwn-clothing-db-83f23.firebaseapp.com",
  projectId: "crwn-clothing-db-83f23",
  storageBucket: "crwn-clothing-db-83f23.appspot.com",
  messagingSenderId: "789652085794",
  appId: "1:789652085794:web:e38a1a051b904c2f5ffe7b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentfromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()) {
      const {displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        })
      }
      catch(error){
        console.log('Error creating the user', error.message)
      }
    }
    return userDocRef;
}
