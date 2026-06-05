// This provide context to every component about User so that they stay Logged in while moving from component to component

import React , {createContext,useState, useEffect,useContext} from 'react';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext)                         //tells about the state of user whether login or not
}

// Wrapper
export const AuthProvider = ({children})=>{
    const [currentUser , setCurrentUser] = useState(null);
    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        if(userId){
            setCurrentUser(userId);
        }
    },[]);

    const value = {
        currentUser, setCurrentUser
    }

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>      // value is passed to all the children of AuthProvider
}