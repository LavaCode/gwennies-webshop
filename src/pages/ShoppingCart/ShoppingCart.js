import React from 'react';

function ShoppingCart({addProduct, amount}) {


    return (
        <>
            <div className="cart-container">
                <div className="cart-title">
                    <h3>Shopping cart</h3>
                </div>

                <li className="cart-item">

                    <h4 className="item-name">Product</h4>
                </li>
            </div>
        </>
    )
}

export default ShoppingCart;