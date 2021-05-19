import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './RegisterModal.css';

function RegisterModal({ toggleModal, closeModal }) {
    const [ registerSuccess, toggleRegisterSuccess] = useState(false);
    const [ registerError, toggleRegisterError] = useState(false);
    const { register, handleSubmit, formState:{ errors }, watch } = useForm( { mode: 'onSubmit' });
    const password = useRef({});
    password.current = watch("password", "");

    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8090/api/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password,
                role: ["user"]
            });
            toggleRegisterError(false)
            toggleRegisterSuccess(true)
            setTimeout(() => {
                toggleModal();
            }, 2500);
        } catch(e) {
            console.error(e);
            toggleRegisterError(true);
        }
      }

    return (
        <>
            <div id="registerModal" className="modal-wrapper" onClick={e => closeModal(e)} >
                <div className="register-modal-inner">
                    <span className="register-close" onClick={toggleModal}>x</span>
                    <h2 className="modal-header">REGISTER</h2>
                    <p className="modal-subline">Glad to have you with us!</p>

                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text"  {
                        ...register("username", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your username",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                            pattern: {
                                value: /[A-Za-z0-9]/
                            }
                        }
                    )} 
                    />
                <p className="error-message">{errors.username?.message}</p>

                    <label htmlFor="email">E-mail address:</label>
                    <input 
                        type="text" 
                        id="email" {
                        ...register("email", 
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
                                value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "invalid email",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.email?.message}</p>

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

                <label htmlFor="confirm-password">Confirm password:</label>
                <input 
                    type="password" 
                    id="confirm-password" {
                    ...register("confirmPassword", 
                    {
                        required: {
                            value: true,
                            message: "Please re-enter your password",
                        }, 
                        validate: {
                            value: value => value === password.current || "The passwords do not match"
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
                        <p className="error-message">{errors.confirmPassword?.message}</p>

                        <button type="submit" className="submit-register">SUBMIT</button>
                        {registerSuccess && (<span className="register-success">Registered succesfully!</span> )}
                        {registerError && (<span className="register-error">Existing credentials!</span> )}
                    </form> 
                </div>
            </div>
        </>
      );
    }

export default RegisterModal;
