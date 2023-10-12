import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthProvider({ children }) {

    const [Token, setToken] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState('')
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token)
            setEmail(localStorage.getItem('email'))
            setPhone(localStorage.getItem('phone'))
        }
    }, [])  

    return (
        <authContext.Provider value={{ Token, setToken,email,setEmail,phone,setPhone }}>
            {children}
        </authContext.Provider>
    );
}