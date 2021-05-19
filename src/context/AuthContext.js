// eslint-disable-next-line no-unused-vars
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

    async function fetchData(jwtToken, username, email) {
        const decoded = jwt_decode(jwtToken);
        const userId = decoded.sub 
        console.log(decoded) 

        //debug: log userId
        // console.log(userId) <-- temp not used

        try {
            const result = await axios.get('http://localhost:8090/api/test/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                } 
            })
            // debug: result
            console.log(result)
            setAuthState({
                user: {
                    // username: result.data.username, <-- oorspronkelijke code, echter krijg geen userdata
                    // email: result.data.email, <-- oorspronkelijke code, echter krijg geen userdata
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
        // fetchData(jwtToken); <-- oorspronkelijke code, echter krijg geen userdata
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
                :  <p> Loading data... </p> //knap maken? 
            }
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
