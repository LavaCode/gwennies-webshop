import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import content from '../../content/products.json';
import temp_image from '../../content/images/bag_1.jpg';
import './ProductDetailPage.css'; 

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams();
    const { addCartItem } = useContext(ShopContext);
    const [cart, setCart] = useContext(CartContext);
    const data = content.items.find(element => element.id === id)

    function handleClick() {
        history.push('/shop');
    }

    function addItem() {
        const product = {image: data.imageUrl, name: data.title, price: data.price, description: data.shortDescription};
        setCart(current => [...current, product])
    }

    return (
        <div className="page-container">
            <div className="product-detail-container">
            <img src={temp_image} alt="Product" className="product-detail-image"></img>
                <div className="select-image-container">
                    <ul className="select-image">
                        <img src={temp_image} alt="small-bag-01" className="product-detail-image-small"></img>
                        <img src={temp_image} alt="small-bag-02" className="product-detail-image-small"></img>
                        <img src={temp_image} alt="small-bag-03" className="product-detail-image-small"></img>
                    </ul>
                </div>
                <h1 className="detail-title">{data.title}</h1>
                <h1>{data.shortDescription}</h1>
                <p>€ {data.price}</p>
                <button className="add-to-cart-detail" onClick={() =>   {
                    addCartItem();
                    addItem();
                    }} >Add to cart</button> 
                <button className="return-button" onClick={handleClick}>BACK</button>
            </div>
        </div>
    )
}

export default ProductDetailPage