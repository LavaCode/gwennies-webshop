import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import jwt_decode from 'jwt-decode'; 
import axios from 'axios';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) { 
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState();
	const [userState, setUserState] = useState({
		user: null,
		status: 'pending',
	});
    
    async function fetchData(jwtToken, username, email) {
		if (!jwtToken) {
            console.log(`background info: close fetch`)
			return;
		}
		const decoded = jwt_decode(jwtToken);
		const userId = decoded.sub;

        try {
            const result = await axios.get(`http://localhost:8090/users/${userId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                } 
            })
            setUserState({
				user: {
					username: result.data.username,
					email: result.data.email,
					id: result.data.id,
					accessLevels: result.data.roles[0].name,
					token: jwtToken
				},
				status: 'done',
			});
            setRole(result.data.roles[0].name);
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        let mounted = true;
        const token = localStorage.getItem('Login-token');
        if (token !== null && userState.user === null) {
            if (mounted) {
				fetchData(token);
			}
        } else {
			setUserState({
				user: null,
				status: 'done',
			});
        }
        return () => (mounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function login(jwtToken, username, email) {
        localStorage.setItem('Login-token', jwtToken);
        fetchData(jwtToken, username, email);
        history.push('/profile');
    }

    function logout() {
        localStorage.clear();
		setUserState({
			user: null,
			status: 'done',
		});
		history.push('/');
    }

    const data = {
        ...userState,
        login,
        logout,
        isLoading
    }

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
