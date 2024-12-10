import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [isUser, setUser] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setLogin(true);
        }
    }, []);

    const login = () => setLogin(true);
    const logout = () => {
        setLogin(false);
        setUser(false);
        localStorage.clear();
    }

    return (
        <AuthContext.Provider value={{ isLogin, login, logout, isUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
