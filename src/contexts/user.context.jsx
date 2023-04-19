import { createContext, useState, useEffect } from "react";
import { OnAuthStateChangedListener, createUserDocumentfromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
 currentUser: null,
 setCurrentUser:() => null
});

export const UserProvider = ({children}) => {
    useEffect(() => {
      const unsubscribe =  OnAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentfromAuth(user);
        }
        setCurrentUser(user);
      });
      return unsubscribe;
    },[])
    const [currentUser, setCurrentUser ] = useState(null);
    const value = { currentUser, setCurrentUser }
 return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}