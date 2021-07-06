import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Profile from '../pages/Profile/Profile';

function PrivateRoute({ isAuth: isAuth, component: Component, ...rest }) {
    return (
        <Route {...rest} render={(props) => {
            if(isAuth) {
                return <Component />
            } else {
                return (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                    );
                }
            }}
        />
    );
}

export default PrivateRoute;
// const PrivateRoute = ({redirect}, {component: Component, ...rest}) => {
//         const token = localStorage.getItem("Login-token");


//     return (

//         // Show the component only when the user is logged in
//         // Otherwise, redirect the user to /signin page
//         <Route {...rest} render={props => (
//             token ?
//                 <Profile />
//             : <Redirect to={redirect} />
//         )} />
//     );
// };

// export default PrivateRoute;