import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './ResetPasswordModal.css';

function ResetPasswordModal({ toggleResetModal, closeResetModal }) {
    const [ submitted, toggleSubmitted ] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onSubmit' });

    async function onSubmit(data) {
        toggleSubmitted(true);
        console.log(data);
        setTimeout(() => {
            toggleSubmitted(false)
        }, 3000);
      }

    return (
        <>
            <div id="resetModal" className="modal-wrapper" onClick={e => closeResetModal(e)} >
                <div className="modal-inner">
                    <span className="reset-close" onClick={toggleResetModal}>x</span>
                    <h2 className="modal-header">RESET PASSWORD</h2>
                    <p className="modal-subline">Oops! Please let us help you!</p>

                    <form className="reset-form" onSubmit={handleSubmit(onSubmit)}>

                    <input 
                        type="text" 
                        id="resetEmail" 
                        placeholder="Enter your emailaddress" {
                        ...register("resetEmail", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your e-mail",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                            pattern: {
                                value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "invalid email",
                            }, 
                        }
                    )} 
                    />
                <p className="error-message">{errors.resetEmail?.message}</p>
                
                        <button type="submit" className="submit-reset">SUBMIT</button>
                        {submitted && (<div className="success">We've sent you an email with instructions</div>)}
                    </form>
                </div>
            </div>
        </>
      );
    }

export default ResetPasswordModal;
