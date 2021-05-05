import React from 'react';
import data from '../../content/data.json';
import './ProductDetailPage.css';

function ProductDetailPage({title}) {
    return (
        <div>
            <h1>{data.title}</h1>
        </div>
    )
}

export default ProductDetailPage
