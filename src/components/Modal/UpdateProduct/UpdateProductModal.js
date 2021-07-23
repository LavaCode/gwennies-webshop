import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import './UpdateProductModal.css';

function UpdateProductModal({ toggleUpdateModal, closeUpdateModal, id, productName, shortDescription, longDescription, articlePrice, stockAmount} ) {
    const { register, handleSubmit, getValues, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const [ error, toggleError ] = useState(false);
    const [ success, toggleSuccess ] = useState(false);
    const watchSale = watch("sale", false); // you can supply default value as second argument
    const history = useHistory();

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

    async function onSubmit(data) {
        console.log(data);
        const token = localStorage.getItem('Login-token');

        try {
            await axios.put(
                `http://localhost:8090/change/${id}`, {
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
            toggleError(false);
            toggleSuccess(true);
            setTimeout(() => {
                window.location.reload();
            }, 1500);
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
      }, [])

    return (
        <div id="updateModal" className="update-modal-wrapper" onClick={e => closeUpdateModal(e)} >
            <div className="update-modal-inner">
                <span className="update-close" onClick={toggleUpdateModal}>x</span>
                <h2 className="delete-modal-header">EDIT PRODUCT</h2>

                <form className="update-product-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="productName">Article name:</label>
                    <input 
                        defaultValue={productName}
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
                        defaultValue={shortDescription}
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
                        defaultValue={longDescription}
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
                        defaultValue={articlePrice}
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
                        defaultValue={stockAmount}
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

            

                <button type="submit" className="submit-product">UPDATE PRODUCT</button>
                <button className="submit-cancel" onClick={toggleUpdateModal}>RETURN</button>
                {success && <p className="add-product-success">Product updated! Redirecting you to the shop</p>}
            </form> 
            
            </div>
        </div>
    )
}

export default UpdateProductModal;
