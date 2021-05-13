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
        status: 'pending',
    });

    async function fetchData(jwtToken) {
        const decoded = jwt_decode(jwtToken);

        //NOT USED, in case of specific userId to GET specific user Data(to be made in backend)
        const userId = decoded.sub

        //debug: decoded JWT 
        // console.log(`Decoded JWT: ${decoded}`)

        try {
            const result = await axios.get('http://localhost:8090/api/test/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                } 
            })
            // debug: result
            // console.log(`result: ${result}`)
            // setAuthState({
            //     user: {
            //         username: result.data.username,
            //         // email: result.data.email,
            //     },
            //     status: 'pending',
            // });
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('Login-token');

        if (token !== null && authState.user === null) {
            console.log(`token: ${token}`)
            console.log(`user: ${authState.user}`)
            fetchData(token)
            console.log('help, ik ben uitgevoerd')
            // console.log(decoded.sub);
            // console.log('Token present');
        } else if (token === null) {
            console.log('ah, fijn. ik ben uitgevoerd')
            setAuthState({
                user: null, 
                status: 'done',
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(jwtToken) {
        //Token
        // console.log(jwtToken)

        localStorage.setItem('Login-token', jwtToken);

        fetchData(jwtToken);

        history.push('/');
    }

    function logout() {
        localStorage.clear();
        setAuthState({
            user: null
        });
    }

    const data = {
        ...authState,
        login: login, 
        logout: logout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
            {/* {authState.status === 'done' 
                ? children
                :  <p> Loading data... </p> //knap maken? 
            } */}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
