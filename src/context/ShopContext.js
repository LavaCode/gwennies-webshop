// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';
// import { CartContext } from '../context/CartContext';
export const ShopContext = React.createContext({});

function ShopContextProvider({ children }) {
    let [items, setItems] = useState(0);

    function addItem() {
        setItems(items += 1);
    }

    function reduceItem(amount) {
        if (items !== 0) {
            setItems(items - amount);
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