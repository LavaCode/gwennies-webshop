
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import DeleteModal from '../../components/Modal/ConfirmDelete/ConfirmDelete';
import data from '../../content/data.json'
import './Profile.css'

export default function Profile() {
	const { user } = useContext(AuthContext);
	const [accountDetails, setAccountDetails] = useState([])
	const [showDeleteModal, setShowDeleteModal] = useState();
	const token = localStorage.getItem('Login-token');
	const { language } = useContext(LanguageContext);

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

	const toggleDeleteModal = () => {
		if(showDeleteModal) {
			setShowDeleteModal(false);
		} else {
			setShowDeleteModal(true);
		}
	  }
  
	  const closeDeleteModal = e => {
		if(e.target.id === "deleteModal") {
		  toggleDeleteModal();
		  setShowDeleteModal(false);
		}
	  }

	return (
		<div className="profile-container">
			<div className="profile-welcome">
				{language === 'nl' ? 
					<p>Welkom terug, &nbsp;<strong>{user && accountDetails.username}</strong>!</p>
				:
					<p>Welcome back, &nbsp;<strong>{user && accountDetails.username}</strong>!</p>
				}
			</div>
			<br></br>
			<div className="profile-dashboard">
				<ul className="profile-details">
					<li className="profile-details-list"><strong>{data.profile[language].clientnr} </strong>{user && accountDetails.id}</li>
					<li className="profile-details-list"><strong>{data.profile[language].username} </strong>{user && accountDetails.username}</li>
					<li className="profile-details-list"><strong>{data.profile[language].email} </strong>{user && accountDetails.email}</li>
					<li className="profile-details-list"><strong>{data.profile[language].firstname} </strong>{user && accountDetails.firstname}</li>
					<li className="profile-details-list"><strong>{data.profile[language].lastname} </strong>{user && accountDetails.lastname}</li>
					<li className="profile-details-list"><strong>{data.profile[language].address} </strong>{user && accountDetails.streetname}</li>
					<li className="profile-details-list"><strong>{data.profile[language].zipcode} </strong>{user && accountDetails.zipcode}</li>
					<li className="profile-details-list"><strong>{data.profile[language].city} </strong>{user && accountDetails.city}</li>
					<li className="profile-details-list"><strong>{data.profile[language].country} </strong>{user && accountDetails.country}</li>
				</ul>
				<br/>
				<div className="profile-options">
						{user.accessLevels === 'ROLE_USER' && 
							<div>
								<button className="profile-delete" onClick={toggleDeleteModal}>{data.profile[language].delete}</button> 
								<button className="profile-change-details">{data.profile[language].edit}</button>
							</div>
						}
				</div>
			</div>
				{user.accessLevels === 'ROLE_ADMIN' &&
					<div className="admin-options">
						<button className="profile-delete">Create discount code</button> 
						<button className="profile-change-details">view all users</button>
					</div>
				}
			<ul className="order-history">
				<li className="client-order-history-title">{data.profile[language].ordernr}</li>
				<li className="client-order-history-title">{data.profile[language].date}</li>
				<li className="client-order-history-title">{data.profile[language].status}</li>
			</ul>
			{ showDeleteModal && (<DeleteModal toggleDeleteModal={toggleDeleteModal} closeDeleteModal={closeDeleteModal} deleteType='account' id={accountDetails.id}/> )} 
		</div>
	);
}