
import React, { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Product.css'

function Product( {id, image, title, description, price} ) {
    const { addCartItem } = useContext(ShopContext);
    const history = useHistory();
    const [cart, setCart] = useContext(CartContext);

    const notify = () => toast.success('Added to cart!', {
        duration: 1350,
    }); 

    function navigateToDetailPage() {
        history.push(`/shop/${id}`)
    }

    function addItem() {
        const product = {image: image, name: title, price: price, description: description};
        setCart(current => [...current, product])
    }

    return (
        <div className="product">
            <img className="product-image" alt="Product" src={image} onClick={navigateToDetailPage}/>
            <p className="product-title">{title}</p>
            <p className="product-description">{description}</p>
            <br/>
            <p className="product-price">€ {price}</p>
            <button className="add-to-cart" onClick={() =>   {
              addCartItem();
              addItem();
              notify();
              }} >Add to cart</button> 
              <Toaster />
        </div>
    )
}

export default Product;
