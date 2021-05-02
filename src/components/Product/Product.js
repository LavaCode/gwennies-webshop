import React from 'react';
import { useHistory } from 'react-router-dom';
import './Product.css'

function Product( {id, image, title, description, price} ) {
    const history = useHistory();

    function detailPage() {
        console.log("click")
        history.push(`/shop/${id}`);
    }

    return (
    <div className="product">
        <img className="product-image" alt="Product" src={image} onClick={detailPage}/>
        <p className="product-title">{title}</p>
        <p className="product-description">{description}</p>
        <br></br>
        <p className="product-price">{price}</p>
        <button className="add-to-cart">Add to cart</button> 
    </div>
    )
}

export default Product
