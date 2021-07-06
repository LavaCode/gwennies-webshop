import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './AddProduct.css';

function AddProduct() {
    const { register, getValues, handleSubmit, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const [file, setFile] = useState();

    async function onSubmit(data) {
        const token = localStorage.getItem('Login-token');
        console.log(token)
        console.log(data);
        setFile(data.image);
        console.log(file[0]);

        try {
            await axios.post("http://localhost:8090/upload", file[0], {
                headers: {
                    "Content-type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  }
            })
        } catch(e) {
            console.error(e);
        }
      }
    
    return (
        <div>
            <p className="add-product-header">Add product to store</p>
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
                            }, 
                        }
                    )} 
                    />

                <p className="error-message">{errors.longDescription?.message}</p>

                <label htmlFor="productPrice">Article price:</label>
                    <input 
                        placeholder=""
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
                        placeholder=""
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

            

                <button type="submit" className="submit-checkout">CONTINUE</button>
            </form> 
        </div>
    )
}

export default AddProduct
