import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode'; 
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) { 
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });
    const [ isAuth, setIsAuth ] = useState(false);

    async function fetchData(jwtToken, username, email) {

        try {
            const result = await axios.get(`http://localhost:8090/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                } 
            })
            // debug: result
            // console.log(result);
            setIsAuth(true);
            console.log(isAuth);
            setAuthState({
                user: {
                    username: username,
                    email: email,
                },
                status: 'done',
            });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('Login-token');
        if (token !== null && authState.user === null) {
            fetchData(token)
        } else if (token === null) {
            setIsAuth(false);
            console.log(isAuth);
            setAuthState({
                user: null, 
                status: 'done',
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(jwtToken, username, email) {
        localStorage.setItem('Login-token', jwtToken);
        try {
            fetchData(jwtToken, username, email);
            history.push('/profile');
        } catch (e) {
            console.error(e);
        }
    }

    function logout() {
        localStorage.clear();
        setIsAuth(false);
        console.log(isAuth);
        setAuthState({
            user: null,
            status: 'done'
        });
    }

    const data = {
        ...authState,
        ...isAuth,
        login: login, 
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'done' 
                ? children
                :   <>
                        <p>Loading data...<br/><br/> If you see this page for longer then 10 seconds something went wrong at our side.</p> 
                        <p>Please come back later, while we solve the problem.</p>
                    </>
            }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
