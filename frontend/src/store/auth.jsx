import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem("token", serverToken);
    }
    const storeNameInLS = (name) => {
        return localStorage.setItem("userName", name);
    }
    const removeTokenInLS = () => {
        return localStorage.removeItem("token");
    }
    const removeNameInLS = () => {
        return localStorage.removeItem("userName");
    }
    const getTokenFromLS = () => {
        return localStorage.getItem("token");
    }
    const getNameFromLS = () => {
        return localStorage.getItem("userName");
    }
    // setInterval(() => {
    //     const now = new Date();
    //     if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
    //         clearInterval(intervalId);
    //         localStorage.removeItem("token");
    //     }
    // }, 1000);
    return (
        <AuthContext.Provider value={{ storeTokenInLS, removeTokenInLS, getTokenFromLS, storeNameInLS, removeNameInLS, getNameFromLS }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useAuth must be used within the AuthProvider');
    }
    return authContextValue;
};