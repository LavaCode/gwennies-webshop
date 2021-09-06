import React, { useContext } from 'react';
import axios from 'axios';
import { LanguageContext } from '../../../context/LanguageContext';
import data from '../../../content/data.json'
import './ConfirmDelete.css';

function ConfirmDelete({ toggleDeleteModal, closeDeleteModal, deleteType, productName, accountName, id }) {
    const { language } = useContext(LanguageContext);

    async function performDelete(deleteType, id) {
        const token = localStorage.getItem('Login-token');

        if (deleteType === 'product') {
                try {
                    axios.delete(
                        `http://localhost:8090/delete/${id}`, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                        },
                })
                toggleDeleteModal();
            } catch (e) {
                console.error(e);
                }
            }
        else if (deleteType === 'account') {
                try {
                    axios.delete(
                        `http://localhost:8090/users/${id}`, 
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                    },
                })
            } catch (e) {
                console.error(e);
                }
            }
        }
    

    return (
        <div id="deleteModal" className="modal-wrapper" onClick={e => closeDeleteModal(e)} >
            <div className="modal-inner">
                <span className="delete-close" onClick={toggleDeleteModal}>x</span>
                <h2 className="delete-modal-header">{data.deleteProduct[language].title}</h2>
                <br/>
                {deleteType === 'product' ? 
                    <div>
                        {language === 'nl' ?
                            <p>Je gaat <strong>{productName}</strong> verwijderen, weet je het zeker?</p>   
                        :
                            <p>You are about to delete <strong>{productName}</strong>, are you sure?</p>    
                        }            
                    </div>
                :
                <div>
                    {language === 'nl' ?
                        <p>Je gaat je account verwijderen, weet je het zeker? </p> 
                    :
                        <p>You are about to delete your account, are you sure? </p>
                    }
                </div>
                }
                <div className="delete-modal-buttons">
                    <button className="delete-modal-option" onClick={()=> {performDelete(deleteType, id)}}>{data.deleteProduct[language].yesButton}</button>
                    <button className="delete-modal-option" onClick={toggleDeleteModal}>{data.deleteProduct[language].noButton}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
