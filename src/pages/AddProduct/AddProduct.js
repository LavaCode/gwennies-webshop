import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
    const { register, handleSubmit, getValues, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const [ error, toggleError ] = useState(false);
    const [ success, toggleSuccess ] = useState(false);
    const watchSale = watch("sale", false); // you can supply default value as second argument
    const history = useHistory();
    // UPLOAD AN IMAGE
    // async function onSubmit(data) {
    //     const token = localStorage.getItem('Login-token');

    //     const formData = new FormData();
    //     formData.append('file', data.image[0]);    

    //     try {
            //         await axios.post(
            //             `http://localhost:8090/upload`,
            //             formData,
            //             {
            //                 headers: {
            //                     'Content-Type': 'multipart/form-data',
            //                     Authorization: `Bearer ${token}`,
            //                 },
            //             }
            //         );
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    async function onSubmit(data) {
        console.log(data);
        const token = localStorage.getItem('Login-token');
        const formData = new FormData();
        formData.append('file', data.image[0]);    

        try {
            await axios.post(
                'http://localhost:8090/add', {
                    longDescription: data.longDescription,
                    name: data.productName,
                    price: data.productPrice,
                    quantity: data.stockAmount,
                    shortDescription: data.shortDescription
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            await axios.post(
                `http://localhost:8090/upload`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                            },
                        }
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

        // eslint-disable-next-line use-isnan
        if (discount === NaN ) {
            return newPrice;
        }
        
        newPrice = discount * price;
        return newPrice.toFixed(2)
    }

    useEffect(() => {
        try { 
          calculatePrice();
        } 
        catch(e) {
          console.error(e);
        } 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [watchSale])

    function returnShopping() {
        history.push('/shop');
    }
    
    return (
        <div className="add-product-container">
            <p className="add-product-header">Add product to store</p>
            {error && <p className="add-product-error">Your article name does exist already! Choose a new one</p>}
            <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="productName">Article name:</label>
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

                <label htmlFor="productShort">Short description:</label>
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

                <label htmlFor="productLong">Long description: </label>
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

                <label htmlFor="productPrice" >Article price:</label>
                    <input 
                        defaultValue="0"
                        placeholder="0.00"
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

                <label htmlFor="productStock">Stock amount</label>
                    <input 
                        placeholder="0"
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

                <label htmlFor="productImage">Product image:</label>
                <input type="file" {...register("image",
                {
                    required: {
                        value: true,
                        message: "Please add an product image"
                    }
                })} />

                <p className="error-message">{errors.image?.message}</p>

                <div>
                    <label htmlFor="productImage">
                    <input type="checkbox" {...register("sale")} />  Sale item
                    </label>
                </div>
                {watchSale && (
                    <>
                        <label>Discount (define in percent)</label>
                        <input 
                            defaultValue="0"
                            placeholder="0"
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

            

                <button type="submit" className="submit-product">ADD PRODUCT</button>
                <button className="submit-cancel" onClick={returnShopping}>RETURN</button>
                {success && <p className="add-product-success">Product added! Redirecting you to the shop</p>}
            </form> 
        </div>
    )
}

export default AddProduct
