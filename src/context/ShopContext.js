// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext } from 'react';
// import { CartContext } from '../context/CartContext';
export const ShopContext = React.createContext({});

function ShopContextProvider({ children }) {
    let [items, setItems] = useState(0);
    // const cart = useContext(CartContext);

    function addItem() {
        setItems(items += 1);

        // let i = cart.indexOf(cart.find(element => element.id === id));
        //     // console.log(i)
        //     cart[i].amount = cart[i].amount+1
    }

    function reduceItem() {
        if (items !== 0) {
            setItems(items - 1);
        }
    }

    const data = {
        item: items,
        addCartItem: addItem,
        reduceItem: reduceItem,
    }

    return (
        <ShopContext.Provider value={data}>
            {children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;