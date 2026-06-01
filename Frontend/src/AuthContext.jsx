// This provide context to every component about User so that they stay Logged in while moving from component to component

import React , {createContext,useState, useEffect,useContext} from 'react';

const AuthContext = createContext();

export const useAuth = ()=>{
    return useContext(AuthContext)
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

    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}