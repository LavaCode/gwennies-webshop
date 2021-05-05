import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import content from '../../content/data.json';
import RegisterModal from '../../components/Modal/RegisterModal/RegisterModal';
import ResetModal from '../../components/Modal/ResetPasswordModal/ResetPasswordModal';
import background from '../../assets/backdrops/login_backdrop.jpeg';
import axios from 'axios';
import './Login.css';

function Login() {
    const [quote, setQuote] = useState("")
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onSubmit' });
    const [showModal, setShowModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [submitted, toggleSubmitted] = useState(false)
    
    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const toggleResetModal = () => {
        setShowResetModal(!showResetModal);
    }

    const closeModal = e => {
        if(e.target.id === "registerModal") {
            toggleModal();
            setShowModal(false);
        }
    }

    const closeResetModal = e => {
        if(e.target.id === "resetModal") {
            toggleResetModal();
            setShowResetModal(false);
        }
    }

    async function onSubmit(data) {
        console.log(data);
        try {
            const result = await axios.post('http://localhost:8090/api/auth/signin', {
                username: data.username,
                password: data.password
            })
        } catch(e) {
            console.error(e);
        }
      };

    useEffect(() => {
        const sentenceArray = content.quotations.sentences;
        let i = Math.floor(Math.random() * sentenceArray.length);
        setQuote(sentenceArray[i]);
    }, [])


    return (
    <>
        <div className="login-page">
        <div
            className="bg_image"
            style={{
                backgroundImage: 'url('+background+')',
                backgroundSize: "cover",
                height: "100vh",
            }}
        >
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className ="box-title">LOGIN</h3>

            <label className="input-label" htmlFor="username">Username:</label>
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
                <p className="error-message">{errors.userName?.message}</p>

                <label className="input-label" htmlFor="password">Password:</label>
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
            <span className="register">Not a member yet? Register&nbsp;<div className="register-link" onClick={() => setShowModal(true)}>here</div></span>
            <span onClick={() => setShowResetModal(true)} className="password-reset">Forgot your password?</span>
            <p className="user-quote">{quote}</p>
        </form>
                { showModal && (<RegisterModal toggleModal={toggleModal} closeModal={closeModal} /> )} 
                { showResetModal && (<ResetModal toggleResetModal={toggleResetModal} closeResetModal={closeResetModal} /> )}
            </div>
        </div>
    </>
    );
}

export default Login; 