import React from 'react';
import Product from '../../components/Product/Product';
import './ProductPage.css'

function Products() {
    return (
        <div className="products-page">
            <Product className="product"/>
            <Product className="product"/>
            {/* <Product className="product"/>
            <Product className="product"/>
            <Product className="product"/>
            <Product className="product"/> */}
        </div>
    )
}

export default Products
