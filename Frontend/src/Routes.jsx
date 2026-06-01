import React from 'react';

import {useNavigate, useRoutes} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import { useAuth } from './authContext';

const ProjectRoutes = ()=>{
    const {currentUser, setcurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setcurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }
        if(userIdFromStorage && window.location.pathname =="/auth"){
            navigate("/");
        }
    },[currentUser,navigate,setcurrentUser]);

    let element = useRoutes([
        {
            path:"/",
            element: <Dashboard/>
        },
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        {
            path:"/profile",
            element:<Profile/>
        }
      
    ])

    return element;
}

export default ProjectRoutes;