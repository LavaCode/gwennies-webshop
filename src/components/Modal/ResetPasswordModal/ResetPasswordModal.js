import React from 'react';
import { useForm } from "react-hook-form";
import './ResetPasswordModal.css';

function ResetPasswordModal({ toggleResetModal, closeResetModal }) {
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onBlur' });

    const onSubmit = (data) => {
        console.log(data);
      };

    return (
        <>
            <div id="resetModal" className="modal-wrapper" onClick={e => closeResetModal(e)} >
                <div className="modal-inner">
                    <span className="close" onClick={toggleResetModal}>x</span>
                    <h2 className="modal-header">RESET PASSWORD</h2>
                    <p className="modal-subline">Oops! Please let us help you!</p>
                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>


                    <label htmlFor="mail">E-mail address:</label>
                    <input 
                        type="text" 
                        id="mail" {
                        ...register("mail", 
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
                    <p className="error-message">{errors.mail?.message}</p>


                        <button type="submit" className="submit-reset">SUBMIT</button>
                    </form>
                </div>
            </div>
        </>
      );
    }

export default ResetPasswordModal
