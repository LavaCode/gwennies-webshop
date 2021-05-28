// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CartContext = React.createContext({});

function CartContextProvider(props) {
    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;