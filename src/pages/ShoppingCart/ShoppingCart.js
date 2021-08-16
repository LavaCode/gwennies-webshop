import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { CartContext } from '../../context/CartContext';
import { LanguageContext } from '../../context/LanguageContext';
import data from '../../content/data.json';
import './ShoppingCart.css'

function ShoppingCart(props) {
    const history = useHistory();
    const [discountCode, setDiscountCode] = useState('')
    const [discountSuccess, toggleDiscountSuccess] = useState(false);
    const [discountError, toggleDiscountError] = useState(false);
    const { item, reduceItem, addCartItem } = useContext(ShopContext);
    const [cart, setCart] = useContext(CartContext);
    const [empty, toggleEmpty] = useState(true);
    const { language } = useContext(LanguageContext);
    const discountInput = React.createRef();

    useEffect(() => {
        if(item === 0){
            toggleEmpty(true);
        } else {
            toggleEmpty(false);
        }
    }, [item])

    useEffect(() => {
        console.log(data.discountCode.active.length)
        if(data.discountCode.active.length > 3) {
            setDiscountCode(data.discountCode.active)
        } else {
        setDiscountCode(null)
        }
    }, [])


    
    
    function returnShopping() {
        history.push("/shop");
    }

    function totalProductPrice(amount ,price) {
        let total = (amount * price);
        return total.toFixed(2);
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
            totalpricearray.push(cartItem.price * cartItem.amount);
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

    function checkDiscount() {
        const code = discountInput.current.value;
        if(code === discountCode) {
            console.log('we have a winner');
            toggleDiscountSuccess(true)
            toggleDiscountError(false)
        } else if (code.length === 0) {
            console.log('failed - 1')
            toggleDiscountError(true)
            toggleDiscountSuccess(false)
            console.log(discountCode)
        } else {
            console.log('failed - 2')
            toggleDiscountError(true)
            toggleDiscountSuccess(false)
            console.log(discountCode)
        }
    }

    return (
        <>
            <div className="cart-container">
                <h3 className="cart-title">{data.cart[language].title}</h3>
                <hr />
                {empty ? 
                <>
                    <p className="no-items-cart"><strong>{data.cart[language].emptyOne}</strong><br/>{data.cart[language].emptyTwo}</p>
                    <button className="no-items-return" onClick={returnShopping}>{data.cart[language].shopButton}</button>
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
                                    <div className="cart-amount-buttons">
                                        <button className="cart-set-amount reduce-item" onClick={()=> {reduceAmount(product.id)}}>-</button>
                                        <p className="cart-item-amount">{product.amount}</p>
                                        <button className="cart-set-amount" onClick={() => {
                                            addCartItem();
                                            addAmount(product.id);
                                        }}>+</button>
                                    </div>
                                <p className="cart-item-total">€ {totalProductPrice(product.amount, product.price)}</p>
                                <button className="cart-remove-item" onClick={()=>{removeItem(product.id); reduceItem(product.amount)}}>X</button>
                            </li>
                        )
                    })}
                </div> 
                <div>
                {language === 'nl' ?
                    <p className="summary total-products">Totaal aantal producten: {item}</p>
                :
                    <p className="summary total-products">Totaal items: {item}</p>
                }
                </div>
                <hr/>
                <div className="discount-code">
                    <p className="discount-text">{data.cart[language].discountCode}</p>
                    <input type="text" className="discount-input" ref={discountInput} placeholder={data.cart[language].discountPlaceholder}></input>
                    <button className="discount-submit" onClick={checkDiscount}>{data.cart[language].discountButton}</button>
                </div>
                <div>
                {language === 'nl' ? 
                    <p className="summary total-price">Subtotaal: €{totalPrice()}</p>
                :
                    <p className="summary total-price">Subtotal: €{totalPrice()}</p>
                }
                </div>
                {discountSuccess && 
                    <p classname="summary discount-price">Discount({data.discountCode.text}): </p>
                }
                <div>
                { language === 'nl' ?
                    <p className="summary tax-price">BTW(21%): €{taxCalculation(totalPrice())}</p>
                : 
                    <p className="summary tax-price">VAT(21%): €{taxCalculation(totalPrice())}</p>
                }
                </div>
                <div>
                { language === 'nl' ?
                    <p className="summary final-price">Totaal: €{finalPrice(totalPrice())}</p>
                :
                    <p className="summary final-price">Total: €{finalPrice(totalPrice())}</p>
                }
                </div>
                    <div className="cart-options">
                        <button className="cart-option cart-checkout" onClick={() => {checkout(finalPrice(totalPrice()))}}>{data.cart[language].checkout}</button>
                        <button className="cart-option cart-return" onClick={returnShopping}>{data.cart[language].shopButton}</button>
                    </div>
                </>
                }
            </div>
        </>
    )
}

export default ShoppingCart;