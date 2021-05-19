
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css'

export default function Profile() {
	const { user } = useContext(AuthContext);

	return (
		<div className="profile-container">
			<p>Welkom terug, <strong>{user && user.username}</strong>!</p>
			<br></br>
			<ul className="profile-details">
				<li className="profile-details-list"><strong>Gebruikersnaam: </strong>{user && user.username}</li>
				<li className="profile-details-list"><strong>E-mail: </strong>{user && user.email}</li>
				<div className="profile-address">
					<li className="profile-details-list"><strong>Adres: </strong></li>
					<li className="profile-details-list"><strong>Postcode: </strong></li>
					<li className="profile-details-list"><strong>Land: </strong></li>
				</div>
			</ul>
			<br/>
			<button className="profile-change-details">Change details</button>

			<table className="order-history">
				<tr>
					<th>ordernr. #</th>
					<th>date</th>
					<th>status</th>
				</tr>
			</table>
			

		</div>
	);
}