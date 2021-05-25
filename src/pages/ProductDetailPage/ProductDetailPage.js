import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import content from '../../content/products.json';
import temp_image from '../../content/temp_folder/bag_1.jpg';
import toast, { Toaster } from 'react-hot-toast';
import './ProductDetailPage.css'; 

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams();
    const { addCartItem } = useContext(ShopContext);
    const [cart, setCart] = useContext(CartContext);
    const data = content.items.find(element => element.id === id);
    const elements = content.items;

    const notify = () => toast.success('Added to cart!', {
        duration: 1350,
    });

    function handleClick() {
        history.push('/shop');
    }

    function addItem() {
        const product = {id: elements.id, image: elements.imageUrl, name: elements.title, price: elements.price, description: elements.shortDescription, amount: 1};
        if (cart.find(element => element.id === product.id)) {
            let i = cart.indexOf(cart.find(element => element.id === product.id));
            cart[i].amount = cart[i].amount+1
        } else {
            setCart(current => [...current, product])
        }
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
                    notify();
                    addCartItem();
                    addItem();
                    }} >Add to cart</button> 
                    <Toaster />
                <button className="return-button" onClick={handleClick}>BACK</button>
            </div>
        </div>
    )
}

export default ProductDetailPage