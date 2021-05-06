// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) { 
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null
    });

    async function login(jwtToken) {
        const decoded = jwt_decode(jwtToken);
        console.log(decoded);

        // try {
        //     const result = await axios.get('http://localhost:8090/users', {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: `Bearer ${jwtToken}`,
        //         } 
        //     })
        //     console.log(result)
        //     setAuthState({
        //         username: result.data.username,
        //         email: result.data.email,
        //     })
        // } catch (e) {
        //     console.error(e);
        // }

        // localStorage.setItem('Login-token', jwtToken);
        history.push('/');
    }

    function logout() {
        console.log('Logout!');
    }

    const data = {
        ...authState,
        login: login, 
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
