import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ShopContext } from '../../context/ShopContext';
// import axios from 'axios';
import './Checkout.css';

function Checkout() {
    const { item }= useContext(ShopContext);
    const { register, getValues, handleSubmit, formState:{ errors }, watch } = useForm( { mode: 'onChange' });
    const watchShipping = watch(["shipping", "postnl"]);
    const [success, toggleSuccess] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const price = location.state.params;

    function returnShopping() {
        history.push("/shop")
    }

    function changeCart() {
        history.push("/cart")
    }

    function onSubmit(data) {
        console.log(data)
        toggleSuccess(true)
        setTimeout(() => {
            history.push('/payment');
        }, 2500);
    }

    function addShipping(value) {
        console.log(value);
    }

    function totalCost() {
        const totalCost = parseFloat(price) + parseFloat(3.95)
        return totalCost.toFixed(2);
    }

    // async function placeOrder() {
    //     //in development
    //     // const result = await axios.post()
    // }

    return (
        <>
        <div className="checkout-container">
            <p className="checkout-title">CHECKOUT</p>

            <div className="checkout-overview">
                <p classname="checkout overview-title"><strong>Overzicht:</strong></p>
                <p classname="checkout overview-price">Aantal artikelen({item}): €{price}</p>
                {watchShipping ? 
                <p classname="checkout overview-shipping">Verzending: €3,95</p>
                :
                <p classname="checkout overview-shipping">Verzending: n.v.t</p>}
                <p classname="checkout overview-total">Totaal: €{totalCost()}</p>
            </div>
            <div className="checkout-options">
                <button className="checkout-change-cart" onClick={changeCart}>Back to cart</button>
                <button className="checkout-return" onClick={returnShopping}>Continue shopping</button>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Company name(optional):</label>
                    <input 
                        type="text"  {
                        ...register("companyName", 
                        {
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />

                <p className="error-message">{errors.companyName?.message}</p>


                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text"  {
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

                    <label htmlFor="email">Street name:</label>
                    <input 
                        type="text" 
                        id="streetname" {
                        ...register("streetname", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your street name",
                            }, 
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.streetname?.message}</p>

                    <label htmlFor="email">Zipcode:</label>
                    <input 
                        type="text" 
                        id="zipcode" {
                        ...register("zipcode", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your zip code",
                            }, 
                            maxLength: {
                                value: 6,
                                message: "Fill in like this: '1234AB'",
                            }, 
                            minLength: {
                                value: 6,
                                message: "Fill in like this: /'1234AB'/",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.zipcode?.message}</p>

                    <label htmlFor="shipping">Shipping method:</label>

                    <select
                        onChange={()=>{
                            console.log(this.$event.target.value);
                            const shipping = getValues(this.$event.target.value);
                            console.log(shipping);
                            addShipping(this.$event.target.value)
                        }}           
                        id="shipping" {...register("shipping", 
                        {
                            required: {
                                value: true,
                                message: "Please select your shipping method",
                            }, 
                        }
                    )}>
                        <option type="collect" value="pick-up" selected>Pick-up in Alkmaar </option>
                        <option type="postnl" value="postNL" >PostNL(+€3,95),  5-7 days</option>
                    </select>
                    <p className="error-message">{errors.shipping?.message}</p>

                    <label htmlFor="payment">Payment method:</label>
                    <select
                        id="payment" {...register("payment", 
                        {
                            required: {
                                value: true,
                                message: "Please select your payment method",
                            }, 
                        }
                    )}>
                        <option value="paypal">PayPal</option>
                        <option value="creditcart">Creditcard</option>
                        <option value="ideal">iDeal</option>
                    </select>
                    <p className="error-message">{errors.payment?.message}</p>
                    

                    


                        <button type="submit" className="submit-checkout">SUBMIT</button>
                    </form> 

                    { success && <p className="checkout-success">Succes, you'll be redirected to the payment page</p>}
        </div>
        </>
    )
}

export default Checkout
