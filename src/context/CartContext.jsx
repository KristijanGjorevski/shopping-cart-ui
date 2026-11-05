import { useContext, createContext, useState, useEffect } from 'react'

export const CreateCart = createContext();

export const CartContext = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])



    const addToCart = (product) => {

        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)

            if (existing) {
                return prev.map((item) => item.id === product.id ? {
                    ...item,
                    qty: item.qty + 1
                } : item)
            }

            return [...prev, { ...product, qty: 1 }];

        });

    }

    const removeFromCart = (id = false) => {

        if (id) setCart((prev) => prev.filter(i => i.id !== id));
    }

    const cleanCart = () => {
        setCart([]);
    }

    const reduceQty = (id, qty) => {
        setCart((prev) => {
            const item = prev.find((i) => i.id === id)

            if (item) {
                
                if (item.qty + qty <= 0) {
                    return prev.filter(i => i.id !== id)
                }

                return prev.map(i => i.id === id ? {
                    ...i,
                    qty: i.qty + qty
                } : i)
            }
            return prev;
        })
    }


    return (
        <CreateCart.Provider value={{ cart, addToCart, removeFromCart, reduceQty, cleanCart }}>
            {children}
        </CreateCart.Provider>
    )
}

export const useCart = () => {
    const fetchCart = useContext(CreateCart);

    if (fetchCart === undefined) {
        throw new Error('useCart must be used within a CartContext');
    }

    return fetchCart;
}