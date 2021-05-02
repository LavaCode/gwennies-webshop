import React from 'react';
import Product from '../../components/Product/Product';
import products from '../../content/products';
import './ProductPage.css'

function Products() {

    const data= products.items;

    return (
        <>
        <div className="product-container">
            <div className="products-overview">
                <div>
                    {data.map((product) => {
                        return (
                            <Product    
                                key={product.id} 
                                className="product"
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
        </div>
    </>
    );
}

export default Products
