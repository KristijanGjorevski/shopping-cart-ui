import { useState, useEffect, useContext, createContext } from 'react'

export const ProductContext = createContext();

export function ProductProvider({ children }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // URL comes from .env files:
                //  - dev:  /api/products  -> json-server (simulated backend, src/data/db.json)
                //  - prod: /products.json -> static sample data in public/ so it works on Vercel
                const res = await fetch(import.meta.env.VITE_API_PRODUCTS);

                if (!res.ok) throw new Error('Failed to fetch products');

                const data = await res.json();

                setProducts(data);

            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts();
    }, [])

    return (
        <ProductContext.Provider value={{ products, loading, error }} >
            {children}
        </ProductContext.Provider>
    )
}

export function useProduct() {
    const context = useContext(ProductContext);

    if (context === undefined) {
        throw new Error('useProduct must be used within a ProductProvider');
    }

    return context;
}

