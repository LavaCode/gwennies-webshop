import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import background from '../../assets/backdrops/contact_backdrop.jpeg';
import './Contact.css';

const googleUrl = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJW4w217JXz0cRcHQejVreAAQ&key=AIzaSyAY1dIR-31BVl4r9uEQB2lrPjJdglAnvzY"

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

            
            <div className="contact">        
                <div className="contact-details">
                    <p><strong>GWENNIES </strong></p>
                    <p>Lange Janstraat 123</p>
                    <p>1234 AB Alkmaar</p>
                    <p>KvK 12345678</p>
                    <br></br>
                    <a href="mailto:info@gwennies.nl">info@gwennies.nl</a>
                    <p>0612345678</p>
                </div>
                <iframe title="location" className="location" loading="lazy" allowfullscreen src={googleUrl}></iframe>
            </div>
            </form>
        </div>
        </>
    );
}

export default Contact; 