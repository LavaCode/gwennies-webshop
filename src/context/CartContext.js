// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { get } from 'react-hook-form';

export const CartContext = React.createContext({});

function CartContextProvider(props) {
    const [cart, setCart] = useState([]);
    const [cookies, setCookie] = useCookies(['cart']);

    useEffect(() => {
        setCookie('cart', cart, { path: '/'})
    }, [cart])
    
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;