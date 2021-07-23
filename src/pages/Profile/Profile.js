
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './Profile.css'

export default function Profile() {
	const { user } = useContext(AuthContext);
	const [accountDetails, setAccountDetails] = useState([])
	const token = localStorage.getItem('Login-token');

	useEffect(() => {
		try {
			getProfile();
		} catch(e) {
			console.error(e);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getProfile() {
		const result = await axios.get(`http://localhost:8090/users/${user.username}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			} 
		})
		setAccountDetails(result.data)
	}

	async function deleteProfile() {
		axios.delete(`http://localhost:8090/users/${user.id}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			} 
		})
	}

	return (
		<div className="profile-container">
			<p className="profile-welcome">Welkom terug, &nbsp;<strong>{user && accountDetails.username}</strong>!</p>
			<br></br>
			<div className="profile-dashboard">
				<ul className="profile-details">
					<li className="profile-details-list"><strong>ID: </strong>{user && accountDetails.id}</li>
					<li className="profile-details-list"><strong>Gebruikersnaam: </strong>{user && accountDetails.username}</li>
					<li className="profile-details-list"><strong>E-mail: </strong>{user && accountDetails.email}</li>
					<li className="profile-details-list"><strong>Voornaam: </strong>{user && accountDetails.firstname}</li>
					<li className="profile-details-list"><strong>Achternaam: </strong>{user && accountDetails.lastname}</li>
					<li className="profile-details-list"><strong>Adres: </strong>{user && accountDetails.streetname}</li>
					<li className="profile-details-list"><strong>Postcode: </strong>{user && accountDetails.zipcode}</li>
					<li className="profile-details-list"><strong>Plaats: </strong>info: Mist nog in database</li>
					<li className="profile-details-list"><strong>Land: </strong>{user && accountDetails.country}</li>
				</ul>
				<br/>
				<div className="profile-options">
						<button className="profile-change-details">Change details</button>
						{user.accessLevels === 'ROLE_USER' && 
							<button className="profile-delete">Delete account</button> 
						}
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