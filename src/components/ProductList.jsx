import ProductsCard from "./ProductsCard";
import { useProduct } from "../context/ProductContext";

const ProductList = () => {

    const { products, loading, error } = useProduct();


    if (loading) {
        return <p className="text-gray-600">Loading products...</p>
    }

    if (error) {
        return (
            <div role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                Could not load products: {error}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductsCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductList;