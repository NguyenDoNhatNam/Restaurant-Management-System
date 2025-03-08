import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = useState(() => {
        const storedTokens = localStorage.getItem('auth_tokens');
        return storedTokens ? JSON.parse(storedTokens) : null;
    });

    useEffect(() => {
        if (tokens) {
            localStorage.setItem('auth_tokens', JSON.stringify(tokens));
        } else {
            localStorage.removeItem('auth_tokens');
        }
    }, [tokens]);

    const login = (newTokens) => {
        setTokens(newTokens);
    };

    const logout = () => {
        setTokens(null);
    };

    return (
        <AuthContext.Provider value={{ tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
