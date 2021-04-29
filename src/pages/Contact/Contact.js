import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import background from '../../assets/backdrops/contact_backdrop.jpeg';
import './Contact.css';

function Contact() {
    const [ submitted, toggleSubmitted ] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm( { mode: 'onBlur' });

    const onSubmit = (data) => {
        toggleSubmitted(true);
        console.log(data);
        setTimeout(() => {
            toggleSubmitted(false)
        }, 3000);
      };
    
    return (
        <>
        <div
            className="bg_image"
            style={{
                backgroundImage: 'url('+background+')',
                backgroundSize: "cover",
                height: "100vh",
            }}
        >
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="contact-header">Want to say Hi!?</h2>
            <label className="contact-label" htmlFor="firstname">Name:</label>
            <input 
                type="text" 
                id="firstname" 
                placeholder="Enter your name" {
                    ...register("firstName", 
                {
                    required: {
                        value: true,
                        message: "Please enter your name",
                     }, 
                     maxLength: {
                        value: 80,
                        message: "To much characters have been entered",
                     }, 
                     pattern: { 
                        value: /[A-Za-z]+$/i,
                        message: "Numbers are not allowed",
                   },
                 }
              )} 
            />
                <p className="error-message">{errors.firstName?.message}</p>
            <label className="contact-label" htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Enter your emailaddress" {...register("email", 
                {
                    required: {
                        value: true,
                        message: "Please enter your email",
                    }, 
                    pattern: {
                        value:/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "invalid email",
                    }, 
                }
            )}
            />
                <p className="error-message">{errors.email?.message}</p>
            <label className="contact-label" htmlFor="message">Message:</label>
            <textarea id="message" placeholder="We love GWENNIES!"{...register("message", 
                    {
                        required: {
                            value: true,
                            message: "Leave us a message please",
                    }, 
                }
            )}
            />
                <p className="error-message">{errors.message?.message}</p>

            <button type="submit" className="submit-message">SUBMIT</button>
            {submitted && (<div className="success">Message sent. Thanks! </div>)}


            <h3 className="location-title">You can find us here!</h3>

            </form>
        </div>
        </>
    );
}

export default Contact; 