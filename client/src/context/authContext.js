import {createContext, useEffect, useState} from "react";
import axios from "axios";


export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async(input)=>{
        const res = await axios.post("api/auth/login",input);
        setCurrentUser(res.data)
    }

    const logout = async(input)=>{
       await axios.post("api/auth/logout");
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser]);

    return (
    <AuthContext.Provider value={{login,logout,currentUser}}>
        {children}
    </AuthContext.Provider>

    )
}   