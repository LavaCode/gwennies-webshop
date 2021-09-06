import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import data from '../../content/data.json';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
    const { register, handleSubmit, getValues, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const [ error, toggleError ] = useState(false);
    const [ success, toggleSuccess ] = useState(false);
    const watchSale = watch("sale", false); // you can supply default value as second argument
    const watchDiscount = watch("saleAmount", 0); 
    const history = useHistory();
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        calculatePrice();
    }, [])

    async function onSubmit(data) {
        console.log(data);
        const token = localStorage.getItem('Login-token');
        const formData = new FormData();
 
        Array.from(data.image).forEach(element => {
            formData.append('files', element);
        });

        formData.append('name', data.productName)
        formData.append('long_description', data.longDescription);
        formData.append('short_description', data.shortDescription);
        formData.append('price', data.productPrice);
        formData.append('sale', data.sale);
        formData.append('quantity', data.stockAmount);
        formData.append('sale_discount', 0)
        //check sale_discount (if undefined = 0)
           

        try {
            await axios.post(
                'http://localhost:8090/files', formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', 
                    },
                },
            );
            toggleError(false);
            toggleSuccess(true);
            setTimeout(() => {
                history.push('/shop');
            }, 3000);
        } catch (e) {
            console.error(e);
            toggleSuccess(false);
            toggleError(true);
        }
    }

    function calculatePrice() {
        const price = getValues("productPrice");
        const discount = 1 - (getValues("saleAmount") / 100);
        let newPrice = 0;
        
        newPrice = discount * price;
        if(!isNaN(newPrice)){
            return newPrice.toFixed(2);
        } else {
            return price;
        }
    }

    useEffect(() => {
        try { 
          calculatePrice();
        } 
        catch(e) {
          console.error(e);
        } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [watchSale, watchDiscount])

    function returnShopping() {
        history.push('/shop');
    }
    
    return (
        <div className="add-product-container">
            <p className="add-product-header">{data.addProduct[language].title}</p>
            {error && <p className="add-product-error">{data.addProduct[language].error}</p>}
            <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="productName">{data.addProduct[language].articleName}</label>
                    <input 
                        placeholder="Name of product"
                        type="text"  {
                        ...register("productName", 
                        {
                            required: {
                                value: true,
                                message: "Please enter a product name"
                            },
                            maxLength: {
                                value: 30,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />

                <p className="error-message">{errors.productName?.message}</p>

                <label htmlFor="productShort">{data.addProduct[language].shortDescription}</label>
                    <input 
                        placeholder="Short description of product"
                        type="text"  {
                        ...register("shortDescription", 
                        {
                            required: {
                                value: true,
                                message: "Please enter a short description"
                            },
                            maxLength: {
                                value: 80,
                                message: "To much characters have been entered",
                            }, 
                        }
                    )} 
                    />

                <p className="error-message">{errors.shortDescription?.message}</p>

                <label htmlFor="productLong">{data.addProduct[language].longDescription}</label>
                    <textarea
                        placeholder="Extended description of product"
                        type="text"  {
                        ...register("longDescription", 
                        {
                            required: {
                                value: true,
                                message: "Please enter a description"
                            },
                            maxLength: {
                                value: 200,
                                message: "To much characters have been entered",
                            }
                        }
                    )} 
                    />

                <p className="error-message">{errors.longDescription?.message}</p>

                <label htmlFor="productPrice">{data.addProduct[language].articlePrice}</label>
                    <input 
                        defaultValue="0"
                        type="text"  {
                        ...register("productPrice", 
                        {
                            required: {
                                value: true,
                                message: "Fill in like this: '29.99'"
                            },
                        }
                    )} 
                    />

                <p className="error-message">{errors.productPrice?.message}</p>

                <label htmlFor="productStock">{data.addProduct[language].stockAmount}</label>
                    <input 
                        defaultValue="0"
                        type="text"  {
                        ...register("stockAmount", 
                        {
                            required: {
                                value: true,
                                message: "Fill in like this: '30'"
                            },
                        }
                    )} 
                    />

                <p className="error-message">{errors.stockAmount?.message}</p>

                <label htmlFor="productImage1">{data.addProduct[language].productImage}</label>
                <input type="file" name="image" accept="image/png, image/jpeg" multiple {...register("image")} />

                <div>
                    <label htmlFor="productImage">
                    <input type="checkbox" {...register("sale")} />  Sale item
                    </label>
                </div>
                {watchSale && (
                    <>
                        <label>{data.addProduct[language].discount}</label>
                        <input 
                            defaultValue="0"
                            onChange={calculatePrice()}
                            type="number" {...register("saleAmount", 

                            { 
                                required: {
                                    value: true,
                                    message: "You must enter a value for salue, or disable the sale", 
                                },
                                min: {
                                    value: 4,
                                    message:"The number must be at least 5"
                                },
                                max: {
                                    value: 100,
                                    message:"That's not possible."
                                },
                                defaultValue: {
                                    value: 10, 
                                }
                            }
                        )} />
                        
                        <p className="error-message">{errors.saleAmount?.message}</p>

                        <label className="calculatedPrice">Calculated new price: € {calculatePrice()}  </label>
                    </>
                )}

            

                <button type="submit" className="submit-product">{data.addProduct[language].addProduct}</button>
                <button className="submit-cancel" onClick={returnShopping}>{data.addProduct[language].return}</button>
                {success && <p className="add-product-success">{data.addProduct[language].success}</p>}
            </form> 
        </div>
    )
}

export default AddProduct
