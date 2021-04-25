import React, { useState } from 'react'
import { useForm } from "react-hook-form";
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
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="contact-header">Want to say hi!?</h2>
            <label htmlFor="firstname">Name:</label>
            <input 
                type="text" 
                id="firstname" 
                placeholder="First name" {
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
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" placeholder="Email" {...register("email", 
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
            <label htmlFor="message">Message:</label>
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

        </form>
        </>
    );
}

export default Contact; 