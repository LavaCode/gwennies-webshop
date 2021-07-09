
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css'

export default function Profile() {
	const { user } = useContext(AuthContext);



	return (
		<div className="profile-container">
			<p className="profile-welcome">Welkom terug, &nbsp;<strong>{user && user.username}</strong>!</p>
			<br></br>
			<div className="profile-dashboard">
				<ul className="profile-details">
					<li className="profile-details-list"><strong>Gebruikersnaam: </strong>{user && user.username}</li>
					<li className="profile-details-list"><strong>E-mail: </strong>{user && user.email}</li>
					<li className="profile-details-list"><strong>Adres: </strong></li>
					<li className="profile-details-list"><strong>Postcode: </strong></li>
					<li className="profile-details-list"><strong>Land: </strong></li>
				</ul>
				<br/>
				<div className="profile-options">
						<button className="profile-change-details">Change details</button>
						{user.accessLevels === 'ROLE_USER' && <button className="profile-delete">Delete account</button> }
				</div>
			</div>

			<ul className="order-history">
				<li className="client-order-history-title">ordernr. #</li>
				<li className="client-order-history-title">date</li>
				<li className="client-order-history-title">status</li>
			</ul>
		</div>
	);
}