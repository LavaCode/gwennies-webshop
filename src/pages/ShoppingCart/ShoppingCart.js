import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import './ShoppingCart.css'

function ShoppingCart(props) {
    const history = useHistory();
    const { item, reduceItem, addCartItem } = useContext(ShopContext);
    const [cart] = useContext(CartContext);
    const [empty, toggleEmpty] = useState(true);

    useEffect(() => {
        if(item === 0){
            toggleEmpty(true);
        } else {
            toggleEmpty(false);
        }
    }, [item])


    // HEEFT WAARSCHIJNLIJK GEEN FUNCTIE
    // useEffect((newVal) => {
    //     return newVal;
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [cart])
    
    function totalProductPrice(amount,price) {
        price = parseFloat(price.replace(',','.').replace(' ',''))
        let total = (amount * price);
        return total.toFixed(2);
    }

    function returnShopping() {
        history.push("/shop");
    }
    
    function addAmount(id) {
        let i = cart.indexOf(cart.find(element => element.id === id));
            cart[i].amount = cart[i].amount+1;
            return cart;
    }
    function reduceAmount(id) {
        let i = cart.indexOf(cart.find(element => element.id === id));
            if (cart[i].amount > 1) {
                cart[i].amount = cart[i].amount-1
                reduceItem(1)
            } else if (cart[i].amount === 1) {  //optional: if item amount = 1 and reduce is used -> remove item
                removeItem(id);
                reduceItem(1)
            }
    }
    function removeItem(id) {
        let i = cart.indexOf(cart.find(element => element.id === id));  
        cart.splice(i, 1);
        return cart;
    }

    function checkout(total) {
        history.push("/checkout", {params: total});
    }

    function totalPrice() {
        const totalpricearray = []
        for (let i = 0; i < cart.length; i++) {
            const cartItem = cart[i];
            let price = parseFloat(cartItem.price.replace(',','.').replace(' ',''))
            totalpricearray.push(cartItem.amount*price)
        }
        let sum = totalpricearray.reduce(function(a, b){
            return a + b;
        }, 0);
        return sum.toFixed(2);
    }

    function taxCalculation(total) {
        const tax = (total * 0.21).toFixed(2);
        return tax; 
    }

    function finalPrice(total) {
        const final = (total * 1.21).toFixed(2);
        return final;
    }

    return (
        <>
            <div className="cart-container">
                <h3 className="cart-title">Hey! It's me! your shoppingbag!</h3>
                <hr />
                {empty ? 
                <>
                    <p className="no-items-cart"><strong>No items in your cart</strong><br/>Grab your items quick from the products tab</p>
                    <button className="no-items-return" onClick={returnShopping}>continue shopping</button>
                </>
                :
                <>
                <div className="cart-overview">
                    {cart.map((product) => {
                        return (
                            <li className="cart-item" key={product.id}>
                                <img src={product.image}alt="product" className="product-image-cart"></img>
                                <div>
                                    <p className="cart-item-title">{product.name}</p>
                                    <p className="cart-item-description">{product.description}</p>
                                </div>
                                <p className="cart-item-price">€ {product.price}</p>
                                <button className="cart-set-amount reduce-item" onClick={()=> {reduceAmount(product.id)}}>-</button>
                                <p className="cart-item-amount">{product.amount}</p>
                                <button className="cart-set-amount" onClick={() => {
                                    addCartItem();
                                    addAmount(product.id);
                                }}>+</button>
                                <p className="cart-item-total">€ {totalProductPrice(product.amount, product.price)}</p>
                                <button className="cart-remove-item" onClick={()=>{removeItem(product.id); reduceItem(product.amount)}}>X</button>
                            </li>
                        )
                    })}
                </div> 
                <p className="summary total-products">Totaal aantal producten: {item}</p>
                <hr/>
                    <p className="summary total-price">Subtotal: €{totalPrice()}</p>
                    <p className="summary tax-price">VAT(21%): €{taxCalculation(totalPrice())}</p>
                    <p className="summary final-price">Total: €{finalPrice(totalPrice())}</p>
                    <div className="cart-options">
                        <button className="cart-option cart-checkout" onClick={() => {checkout(finalPrice(totalPrice()))}}>checkout</button>
                        <button className="cart-option cart-return" onClick={returnShopping}>continue shopping</button>
                    </div>
                </>
                }
            </div>
        </>
    )
}

export default ShoppingCart;