import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ children, ...rest }) {
	const { user, isLoading } = useContext(AuthContext);

	return (
		<Route {...rest}>
			{!isLoading ? (
				user !== null ? (
					children
				) : (
					<Redirect to={'/shop'} />
				)
			) : (
				<Redirect to={'/'} />
			)}
		</Route>
	);
}

export default PrivateRoute;