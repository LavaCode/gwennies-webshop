import React from 'react';
import { useForm } from "react-hook-form";
import './Modal.css';

function Modal({ toggleModal, closeModal }) {
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onBlur' });

    const onSubmit = (data) => {
        console.log(data);
      };

    return (
        <>
            <div id="modal" className="modal-wrapper" onClick={e => closeModal(e)} >
                <div className="modal-inner">
                    <span className="close" onClick={toggleModal}>x</span>
                    <h1 className="modal-header">REGISTER</h1>
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


                    <label htmlFor="mail">E-mail address:</label>
                    <input 
                        type="text" 
                        id="mail" {
                        ...register("mail", 
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
                    <p className="error-message">{errors.mail?.message}</p>

                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" {
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

                        <button type="submit" className="submit-login">SUBMIT</button>
                    </form>
                </div>
            </div>
        </>
      );
    }

export default Modal
