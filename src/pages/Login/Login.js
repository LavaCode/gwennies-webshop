import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
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
    const { login } = useContext(AuthContext);
    
    const toggleModal = () => {
        if(showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }

    const toggleResetModal = () => {
        if(showResetModal) {
            setShowResetModal(false);
        } else {
            setShowResetModal(true);
        }
    }

    const closeModal = e => {
        if(e.target.id === "registerModal") {
            toggleModal();
            setShowModal(false);
        }
    }

    // used for testing each modal status --- Enable to see track of boolean stat of modal 
    // useEffect (() => {
    //     console.log(`Show reset modal: ${showResetModal}`);
    //     console.log(`Show modal: ${showModal}`);
    // }, [showModal, showResetModal]);


    const closeResetModal = e => {
        if(e.target.id === "resetModal") {
            toggleResetModal();
            setShowResetModal(false);
        }
    }

    async function onSubmit(data) {
        // console.log(data); //test purpose only - needs to be disabled
        try {
            const result = await axios.post('http://localhost:8090/api/auth/signin', {
                username: data.username,
                password: data.password
            });
            login(result.data.accessToken);
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
            <div className="login-options">
                <span className="register">Not a member yet? Register&nbsp;<div className="register-link" onClick={() => setShowModal(true)}>here</div></span>
                <span className="password-reset"><div className="reset-link" onClick={() => setShowResetModal(true)}>Forgot your password?</div></span>
            </div>
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