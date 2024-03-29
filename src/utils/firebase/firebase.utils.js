import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt:'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments= async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocument = async() => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const {title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
}

export const createUserDocumentfromAuth = async(userAuth, additonalFields) => {
   if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);
    if(!userSnapShot.exists()) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additonalFields
        })
      }
      catch(error){
        console.log('Error creating the user', error.message)
      }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password);
}

export const SignOutUser = async () => await signOut(auth);

export const OnAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}