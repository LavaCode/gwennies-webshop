// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CartContext = React.createContext({});

function CartContextProvider(props) {
    const [cart, setCart] = useState([]);

    

    function addItem(id) {
        console.log(id)

        // let i = cart.indexOf(cart.find(element => element.id === id));
        //     // console.log(i)
        //     cart[i].amount = cart[i].amount+1
    }

    const data = {
        // removeItem: removeItem,
        addItem: addItem,
    }

    return (
        <CartContext.Provider value={[cart, setCart, data]}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;