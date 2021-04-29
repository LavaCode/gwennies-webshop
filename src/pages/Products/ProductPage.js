import React from 'react';
import Product from '../../components/Product/Product';
import bag_01 from '../../assets/products/bag_1.jpeg';
import bag_02 from '../../assets/products/bag_2.jpeg';
import bag_03 from '../../assets/products/bag_3.jpeg';
import bag_04 from '../../assets/products/bag_4.jpeg';
import bag_05 from '../../assets/products/bag_5.jpeg';
import bag_06 from '../../assets/products/bag_6.jpeg';
import products from '../../content/products.json';
import background from '../../assets/backdrops/shop_backdrop.jpeg';
import './ProductPage.css'

function Products() {
    return (
        <>
        {/* <div
            className="bg_image"
            style={{
                backgroundImage: 'url('+background+')',
                backgroundSize: "cover",
                height: "100vh",
            }}
        > */}
        <div className="container">
        <div className="products-overview">
            <Product className="product" image={bag_01} title={products.products.bag1.title} description={products.products.bag1.description} price={products.products.bag1.price}/>
            <Product className="product" image={bag_02} title={products.products.bag2.title} description={products.products.bag2.description} price={products.products.bag2.price}/>
            <Product className="product" image={bag_03} title={products.products.bag3.title} description={products.products.bag3.description} price={products.products.bag3.price}/>
            <Product className="product" image={bag_04} title={products.products.bag4.title} description={products.products.bag4.description} price={products.products.bag4.price}/>
            <Product className="product" image={bag_05} title={products.products.bag5.title} description={products.products.bag5.description} price={products.products.bag5.price}/>
            <Product className="product" image={bag_06} title={products.products.bag6.title} description={products.products.bag6.description} price={products.products.bag6.price}/>
        </div>
        </div>
        </>
    )
}

export default Products
