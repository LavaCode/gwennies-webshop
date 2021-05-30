import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';

const PrivateRoute = ({redirect}, {component: Component, ...rest}) => {
        const token = localStorage.getItem("Login-token");


    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            token ?
                <Profile />
            : <Redirect to={redirect} />
        )} />
    );
};

export default PrivateRoute;