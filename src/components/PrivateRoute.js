import React, { useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const PrivateRoute = ({redirect}, {component: Component, ...rest}) => {
    console.log(redirect);
    const { user } = useContext(AuthContext);
    
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to {redirect} page
        <Route {...rest} render={props => (
            user ?
                <Component {...props} />
            : 
            <Redirect to={redirect} />
        )} />
    );
};

export default PrivateRoute;