import React from 'react';
import ProductCard from '../../components/Product/Product';
import products from '../../content/products';
import './ProductPage.css'

function Products() {

    const data = products.items;

    return (
        <>
        <div className="product-container">
            <div className="products-overview">
                {data.map((product) => {
                    return (
                        <ProductCard    
                            className="product"
                            key={product.id} 
                            id={product.id}
                            image={product.imageUrl}
                            title={product.title}
                            description={product.shortDescription}
                            price={product.price}
                        />
                    )
                })}
            </div>
        </div>
    </>
    );
}

export default Products
