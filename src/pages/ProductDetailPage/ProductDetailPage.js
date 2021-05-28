import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import content from '../../content/products.json';
import toast, { Toaster } from 'react-hot-toast';
import './ProductDetailPage.css'; 

function ProductDetailPage() {
    const history = useHistory();
    const { id } = useParams();
    const { addCartItem } = useContext(ShopContext);
    const [cart, setCart] = useContext(CartContext);
    const data = content.items.find(element => element.id === id);
    const [image, setImage] = useState(data.imageUrl);

    const notify = () => toast.success('Added to cart!', {
        duration: 1350,
    });

    function handleClick() {
        history.push('/shop');
    }

    function addItem() {
        const product = {id: data.id, image: data.imageUrl, name: data.title, price: data.price, description: data.shortDescription, amount: 1};
        if (cart.find(element => element.id === product.id)) {
            let i = cart.indexOf(cart.find(element => element.id === product.id));
            cart[i].amount = cart[i].amount+1
        } else {
            setCart(current => [...current, product])
        }
    }

    return (
            <div className="product-detail-container">
                <h1 className="detail-title">{data.title}</h1>
                <div className="detail-presentation">
                    <img src={image} alt="Product" className="product-detail-image"></img>
                    <div className="select-image-container">
                        <ul className="select-image">
                            <img src={data.imageUrl} alt="small-bag-01" className="product-detail-image-small" onClick={() => setImage(data.imageUrl)}></img>
                            <img src={data.thumbnail1} alt="small-bag-02" className="product-detail-image-small" onClick={() => setImage(data.thumbnail1)}></img>
                            <img src={data.thumbnail2} alt="small-bag-03" className="product-detail-image-small" onClick={() => setImage(data.thumbnail2)}></img>
                            {/* data.thumbnail1 */}
                        </ul>
                    </div>
                </div>
                <h3 className="detail-description">{data.longDescription}</h3>
                <p className="detail-price">€ {data.price}</p>
                <button className="add-to-cart-detail" onClick={() =>   {
                    notify();
                    addCartItem();
                    addItem();
                    }} >Add to cart</button> 
                    <Toaster />
                <button className="return-button" onClick={handleClick}>Return</button>
            </div>
    )
}

export default ProductDetailPage