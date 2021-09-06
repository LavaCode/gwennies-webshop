import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { LanguageContext } from '../../context/LanguageContext';
import data from '../../content/data.json';
import RegisterModal from '../../components/Modal/RegisterModal/RegisterModal';
import axios from 'axios';
import './Checkout.css';

function Checkout() {
    const { item } = useContext(ShopContext);
    const [ cart, setCart ] = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState:{ errors }, watch } = useForm( { mode: 'onSubmit' } );
    const watchShipping = watch(["shipping", "postnl"]);
    const [success, toggleSuccess] = useState(false)
    const [accountDetails, setAccountDetails] = useState([])
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const token = localStorage.getItem('Login-token');
    const price = location.state.params;
    const { language } = useContext(LanguageContext);

    useEffect(() => {
		try {
			if(user) {
                getProfile();
            } 
		} catch(e) {
			console.error(e);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getProfile() {
		const result = await axios.get(`http://localhost:8090/users/${user.username}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			} 
		})
		setAccountDetails(result.data)
	}

    const toggleModal = () => {
        if(showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }

    const closeModal = e => {
        if(e.target.id === "registerModal") {
            toggleModal();
            setShowModal(false);
        }
    }

    function returnShopping() {
        history.push("/shop")
    }

    function changeCart() {
        history.push("/cart")
    }

    function onSubmit(data) {
        console.log(data)
        console.log(cart)  
        toggleSuccess(true)
        setCart([]);
        setTimeout(() => {
            history.push('/payment');
        }, 2500);
    }

    function totalCost() {
        const totalCost = parseFloat(price) + parseFloat(3.95)
        return totalCost.toFixed(2);
    }

    function onChange(e) {
        console.log(e)
        console.log(e.target.value)
    }

    function handleChange(e) {
        console.log(e)
        console.log(e.target.value)
    }

    return (
        <>
        <div className="checkout-container">
            <p className="checkout-title">{data.checkout[language].title}</p>

            <div className="checkout-overview">
                <p classname="checkout overview-title"><strong>{data.checkout[language].summary}</strong></p>
                <div>
                    {language === 'nl' ? 
                        <p classname="checkout overview-price">Aantal artikelen({item}): €{price}</p>
                    :
                        <p classname="checkout overview-price">Total articles({item}): €{price}</p>
                    }
                </div>
                {watchShipping ? 
                    <p classname="checkout overview-shipping">{data.checkout[language].shippingTrue}</p>
                :
                    <p classname="checkout overview-shipping">{data.checkout[language].shippingFalse}</p>
                }
                <div>
                    {language === 'nl' ?
                        <p classname="checkout overview-total">Totaal: €{totalCost()}</p>
                    :
                        <p classname="checkout overview-total">Total: €{totalCost()}</p>
                    }
                </div>
            </div>
            <div className="checkout-options">
                <button className="checkout-change-cart" onClick={changeCart}>{data.checkout[language].return}</button>
                <button className="checkout-return" onClick={returnShopping}>{data.checkout[language].shopButton}</button>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="checkout-register-option">
                    {!user && 
                        <div>
                            {language === 'nl' ?
                                <div>
                                    <div className="checkout-register-option-register" onClick={toggleModal}>
                                        <p>Nog niet geregistreerd? Klik hier om een account aan te maken</p>
                                    </div>
                                    <div className="checkout-register-option-login" onClick={() => history.push('/login')}>
                                        <p>Al geregistreerd? Klik dan hier om in te loggen</p>
                                    </div>
                                </div>
                            :
                                <div>
                                    <div className="checkout-register-option-register" onClick={toggleModal}>
                                        <p>Not a member yet? Click here to create an account</p>
                                    </div>
                                    <div className="checkout-register-option-login" onClick={() => history.push('/login')}>
                                        <p>Already have one? Click here to login</p>
                                    </div>
                                </div>
                            }
                        </div>
                    }                           
                </div>
                    <label htmlFor="name">{data.checkout[language].companyName}</label>
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


                    <label htmlFor="name">{data.checkout[language].name}</label>
                    <input 
                        type="text" 
                        defaultValue={user && accountDetails.firstname} {
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

                    <label htmlFor="email">{data.checkout[language].emailaddress}</label>
                    <input 
                        type="text" 
                        defaultValue={user && accountDetails.email}
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

                    <label htmlFor="streetname">{data.checkout[language].address}</label>
                    <input 
                        type="text" 
                        defaultValue={user && accountDetails.streetname}
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

                    <label htmlFor="zipcode">{data.checkout[language].zipcode}</label>
                    <input 
                        type="text" 
                        defaultValue={user && accountDetails.zipcode}
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
                                message: "Fill in like this: '1234AB'",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.zipcode?.message}</p>

                    <label htmlFor="city">{data.checkout[language].city}</label>
                    <input 
                        type="text" 
                        defaultValue={user && accountDetails.city}
                        id="city" {
                        ...register("city", 
                        {
                            required: {
                                value: true,
                                message: "Please enter your city",
                            }, 
                        }
                    )} 
                    />
                    <p className="error-message">{errors.city?.message}</p>

                    <label htmlFor="shipping">{data.checkout[language].shipping}</label>
                    
                    <select
                        onChange={(e) => {
                            onChange(e)
                            handleChange(e)
                        }}           
                        id="shipping" {...register("shipping", 
                        {
                            required: {
                                value: true,
                                message: "Please select your shipping method",
                            }, 
                        }
                        )}>
                        <option type="collect" value="pick-up" selected>{data.checkout[language].optionOne}</option>
                        <option type="postnl" value="postNL" >{data.checkout[language].optionTwo}</option>
                    </select>

                    <p className="error-message">{errors.shipping?.message}</p>

                    <label htmlFor="payment">{data.checkout[language].payment}</label>
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

                    <button type="submit" className="submit-checkout">{data.checkout[language].submit}</button>
                    </form> 
                    { success && <p className="checkout-success">{data.checkout[language].success}</p>}
                    { showModal && (<RegisterModal toggleModal={toggleModal} closeModal={closeModal} /> )} 
        </div>
        </>
    )
}

export default Checkout
