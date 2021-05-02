import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './RegisterModal.css';

function RegisterModal({ toggleModal, closeModal }) {
    const [ submitted, toggleSubmitted ] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onBlur' });

    // 1. installeer axios
    // 2. importeer axios 
    // 3. asynchrone functies
    // 3a try/catch block
    // 4. post request maken naar endpoint
    // 5. axios post request krijgt url en data-object mee
    // 6. terugkoppeling aan de gebruiker geven
    // 7. gebruiker doorsturen


    function onSubmit(data) {
        toggleSubmitted(true);
        console.log(data);
        setTimeout(() => {
            toggleSubmitted(false)
        }, 3000);
      };

    return (
        <>
            <div id="registerModal" className="modal-wrapper" onClick={e => closeModal(e)} >
                <div className="register-modal-inner">
                    <span className="register-close" onClick={toggleModal}>x</span>
                    <h2 className="modal-header">REGISTER</h2>
                    <p className="modal-subline">Glad to have you with us!</p>
                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" {
                        ...register("name", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your name",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.name?.message}</p>

                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"  {
                        ...register("userName", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your username",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                <p className="error-message">{errors.userName?.message}</p>

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

                <label htmlFor="password">Password:</label>
                <input
                    type="password" 
                    id="password" {
                    ...register("password", 
                    {
                        required: {
                            value: true,
                            message: "Please enter your password",
                        }, 
                        maxLength: {
                            value: 20,
                            message: "You've exceeded the maximum length of 20 characters",
                        }, 
                        minLength: {
                            value: 6,
                            message: "You must use at least 6 characters"
                        },
                    }
                )}
            />
                        <p className="error-message">{errors.password?.message}</p>

                <label htmlFor="password">Confirm password:</label>
                <input 
                    type="password" 
                    id="password" {
                    ...register("password", 
                    {
                        required: {
                            value: true,
                            message: "Please enter your password",
                        }, 
                        maxLength: {
                            value: 20,
                            message: "You've exceeded the maximum length of 20 characters",
                        }, 
                        minLength: {
                            value: 6,
                            message: "You must use at least 6 characters"
                        },
                    }
                )}
            />
                        <p className="error-message">{errors.password?.message}</p>

                        <button type="submit" className="submit-register">SUBMIT</button>
                        {submitted && (<div className="success">Message sent. Thanks! </div>)}
                    </form>
                </div>
            </div>
        </>
      );
    }

export default RegisterModal
