import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { LanguageContext } from '../../../context/LanguageContext';
import data from '../../../content/data.json'
import axios from 'axios';
import './UpdateProductModal.css';

function UpdateProductModal({ toggleUpdateModal, closeUpdateModal, id, productName, shortDescription, longDescription, articlePrice, stockAmount, sale, discount }) {
    const { register, handleSubmit, getValues, formState:{ errors }, watch } = useForm( { mode: 'onBlur' });
    const [ error, toggleError ] = useState(false);
    const [ success, toggleSuccess ] = useState(false);
    const watchSale = watch("sale", false); // you can supply default value as second argument
    const watchDiscount = watch("saleAmount", 0); 
    const history = useHistory();
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        console.log(sale)
    })

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
                    shortDescription: data.shortDescription, 
                    sale: data.sale,
                    saleDiscount: data.saleAmount
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
                toggleUpdateModal();
            }, 1500);
        } catch (e) {
            console.error(e);
            toggleSuccess(false);
            toggleError(true);
        }
    }

    function calculatePrice() {
        const price = getValues("productPrice");
        let discount = 1 - (getValues("saleAmount") / 100);
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

    return (
        <div id="updateModal" className="update-modal-wrapper" onClick={e => closeUpdateModal(e)} >
            <div className="update-modal-inner">
                <span className="update-close" onClick={toggleUpdateModal}>x</span>
                <h2 className="update-modal-header">{data.editProduct[language].title}</h2>

                <form className="update-product-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="productName">{data.editProduct[language].articleName}</label>
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

                <label htmlFor="productShort">{data.editProduct[language].shortDescription}</label>
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

                <label htmlFor="productLong">{data.editProduct[language].longDescription}</label>
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

                <label htmlFor="productPrice">{data.editProduct[language].articlePrice}</label>
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

                <label htmlFor="productStock">{data.editProduct[language].stockAmount}</label>
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

                <label htmlFor="productImage">{data.editProduct[language].productImage}</label>
                <input type="file" {...register("image")} />

                <p className="error-message">{errors.image?.message}</p>

                <div>
                    <label htmlFor="sale">
                    <input 
                        type="checkbox"
                        value="false"
                        placeholder={sale}
                        className="sale-product" {
                            ...register("sale")} />Sale item</label>
                </div>
                {watchSale && (
                    <>
                        <label>Discount (define in percent)</label>
                        <input 
                            defaultValue={discount}
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

                <button type="submit" className="submit-product">{data.editProduct[language].updateProduct}</button>
                <button className="submit-cancel" onClick={toggleUpdateModal}>{data.editProduct[language].return}</button>
                {success && <p className="add-product-success">{data.editProduct[language].success}</p>}
            </form> 
            
            </div>
        </div>
    )
}

export default UpdateProductModal;
