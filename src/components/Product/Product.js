import React from 'react';
import './Product.css'

function Product() {
    return (
        <div className="product-box">
            <span className="product-image">Ik ben een plaatje</span>
            <h3 className="product-title">Ik ben een product</h3>
            <p className="product-description">ik ben een product omschrijving</p>
            <span className="product-price">149,99</span>
        </div>
    )
}

export default Product
