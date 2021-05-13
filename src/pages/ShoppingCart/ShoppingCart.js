import React, { useContext, useEffect } from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import ShopContext from '../../context/ShopContext';

function ShoppingCart(props) {
    const context = useContext(ShopContext);

    useEffect(() => {
        console.log(context);
    }, [])


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