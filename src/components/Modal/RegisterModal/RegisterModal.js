import React, { useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from '../../../context/LanguageContext';
import data from '../../../content/data.json';
import axios from 'axios';
import './RegisterModal.css';

function RegisterModal({ toggleModal, closeModal }) {
    const [ registerSuccess, toggleRegisterSuccess] = useState(false);
    const [ registerError, toggleRegisterError] = useState(false);
    const { language } = useContext(LanguageContext);
    const { register, handleSubmit, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const password = useRef({});
    const history = useHistory();
    password.current = watch("password", "");


    async function onSubmit(data) {
        try {
            await axios.post('http://localhost:8090/api/auth/signup', {
                country: data.country,
                username: data.username,
                email: data.email,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                streetname: data.streetname,
                zipcode: data.zipcode,
                city: data.city,
                role: ["user"]
            });
            toggleRegisterError(false)
            toggleRegisterSuccess(true)
            setTimeout(() => {
                toggleModal();
                history.push('/login');
            }, 2000);
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
                    <h2 className="modal-header">{data.register[language].title}</h2>
                    <p className="modal-subline">{data.register[language].subline}</p>

                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="username">{data.register[language].username}</label>
                    <input 
                        type="text" 
                        id="username" {
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
                        }
                    )} 
                    />
                    <p className="error-message">{errors.username?.message}</p>

                    <label htmlFor="email">{data.register[language].firstname}</label>
                    <input 
                        type="text" 
                        id="firstname" {
                        ...register("firstname", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your firstname",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.firstname?.message}</p>

                    <label htmlFor="lastname">{data.register[language].lastname}</label>
                    <input 
                        type="text" 
                        id="lastname" {
                        ...register("lastname", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your lastname",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            },  
                        }
                    )} 
                    />
                    <p className="error-message">{errors.lastname?.message}</p>

                    <label htmlFor="email">{data.register[language].email}</label>
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

                    <label htmlFor="streetname">{data.register[language].address}</label>
                    <input 
                        type="text" 
                        id="streetenter" {
                        ...register("streetname", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your adress",
                            }, 
                            maxLength: {
                                value: 50,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.streetname?.message}</p>

                    <label htmlFor="zipcode">{data.register[language].zipcode}</label>
                    <input 
                        type="text" 
                        id="zipcode" {
                        ...register("zipcode", 
                        {
                            required: {
                                value: true,
                                message: `Please enter like this: 1234AB`,
                            }, 
                            maxLength: {
                                value: 6,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <label htmlFor="city">{data.register[language].city}</label>
                    <input 
                        type="text" 
                        id="city" {
                        ...register("city", 
                        {
                            required: {
                                value: true,
                                message: `Please enter your city`,
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.zipcode?.message}</p>

                    <label htmlFor="country">{data.register[language].country}</label>
                    <input 
                        type="text" 
                        id="country" {
                        ...register("country", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your country",
                            }, 
                            maxLength: {
                                value: 50,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.country?.message}</p>

                

                <label htmlFor="password">{data.register[language].password}</label>
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

                <label htmlFor="confirm-password">{data.register[language].passwordConfirmation}</label>
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

                        <button type="submit" className="submit-register">{data.register[language].submit}</button>
                        {registerSuccess && (<span className="register-success">{data.register[language].success}</span> )}
                        {registerError && (<span className="register-error">{data.register[language].error}</span> )}
                    </form> 
                </div>
            </div>
        </>
      );
    }

export default RegisterModal;
