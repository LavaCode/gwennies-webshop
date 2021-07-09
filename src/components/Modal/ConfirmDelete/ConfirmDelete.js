import React, { useState } from 'react';
import axios from 'axios';
import './ConfirmDelete.css';

function ConfirmDelete({ toggleDeleteModal, closeDeleteModal, deleteType, productName, accountName, id }) {
    const [ success, toggleSuccess ] = useState(false);

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
                toggleSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
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
                            Authorization: `Bearer ${token}`,
                    },
                })
            } catch (e) {
                console.error(e);
                toggleSuccess(false);
                }
            }
        }
    

    return (
        <div id="deleteModal" className="modal-wrapper" onClick={e => closeDeleteModal(e)} >
            <div className="modal-inner">
                <span className="delete-close" onClick={toggleDeleteModal}>x</span>
                <h2 className="delete-modal-header">Are you sure?</h2>
                <br/>
                {deleteType === 'product' ? 
                <p>You are about to delete {productName}, are you sure?</p>   
                :
                <p>You are about to delete your account, are you sure? </p> 
                }

                <div className="delete-modal-buttons">
                    <button className="delete-modal-option" onClick={()=> {performDelete(deleteType, id)}}>YES</button>
                    <button className="delete-modal-option" onClick={toggleDeleteModal}>NO</button>
                </div>
                {success && <p className="delete-product-success">Product deleted! Refreshing the page...</p>}
            </div>
        </div>
    )
}

export default ConfirmDelete;
