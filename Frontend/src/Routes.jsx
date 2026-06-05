import React from 'react';

import {useNavigate, useRoutes} from 'react-router-dom';
import { useEffect } from 'react';

import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/user/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import CreateRepository from './components/repo/CreateRepository';
import RepositoryPage from './components/repo/RepositoryPage';
import { useAuth } from './AuthContext.jsx';

const ProjectRoutes = ()=>{
    const {currentUser, setCurrentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        const userIdFromStorage = localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }
        if(userIdFromStorage && window.location.pathname =="/auth"){
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);

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
            path:"/profile/:id",
            element:<Profile/>
        },
        {
            path:"/repo/create",
            element:<CreateRepository/>
        },{
            path:"/repo/:id",
            element : <RepositoryPage/>
        }
        

      
    ])

    return element;
}

export default ProjectRoutes;