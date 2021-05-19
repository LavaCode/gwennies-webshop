import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import './ShoppingCart.css'

function ShoppingCart(props) {
    const history = useHistory();
    const { item, reduceItem, addCartItem } = useContext(ShopContext);
    const [cart] = useContext(CartContext);
    const value = 0;

    useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function totalPrice() {
    }

    function returnShopping() {
        history.push("/shop");
    }

    function checkout() {
        history.push("/checkout");
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-title">
                    <h3>Shopping cart</h3>
                </div>

                <div className="products-overview">
                    {cart.map((product) => {
                        return (
                            <li className="cart-item">
                                <img src={product.image}alt="product" className="product-image-cart"></img>
                                <div>
                                    <p className="cart-item-title">{product.name}</p>
                                    <p className="cart-item-description">{product.description}</p>
                                </div>
                                <p className="cart-item-price">€ {product.price}</p>
                                <button className="cart-set-amount" onClick={reduceItem}>-</button>
                                <p className="cart-item-amount">{value}</p>
                                <button className="cart-set-amount" onClick={addCartItem}>+</button>
                                <p className="cart-item-total">€ {totalPrice}</p>
                                <button className="cart-remove-item">X</button>
                            </li>
                        )
                    })}
                </div> 
                <br/>
                <div className="cart-summary">
                    <p className="total-products">Totaal aantal producten: {item}</p>
                    <button className="cart-checkout" onClick={checkout}>checkout</button>
                    <button className="cart-return" onClick={returnShopping}>continue shopping</button>
                </div>
            </div>
        </>
    )
}

export default ShoppingCart;