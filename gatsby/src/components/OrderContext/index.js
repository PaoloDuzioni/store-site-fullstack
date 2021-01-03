import React, { createContext, useState } from 'react';
const OrderContext = createContext();

export function OrderProvider({ children }) {
    // Set global state, this component wont unmount
    const [order, setOrder] = useState([]);

    return (
        <OrderContext.Provider value={[order, setOrder]}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContext;
