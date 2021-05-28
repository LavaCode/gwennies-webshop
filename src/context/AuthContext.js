import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
// import jwt_decode from 'jwt-decode'; 
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) { 
    const history = useHistory();
    const [authState, setAuthState] = useState({
        user: null,
        status: "pending",
    });

    async function fetchData(jwtToken, username, email) {

        try {
            await axios.get(`http://localhost:8090/api/user`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                } 
            })
            // debug: result
            // console.log(result);
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
            setAuthState({
                user: null, 
                status: 'done',
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(jwtToken, username, email) {
        localStorage.setItem('Login-token', jwtToken);
        fetchData(jwtToken, username, email)
        history.push('/profile');
    }

    function logout() {
        localStorage.clear();
        setAuthState({
            user: null,
            status: 'done'
        });
    }

    const data = {
        ...authState,
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
