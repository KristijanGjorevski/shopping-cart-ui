import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { useCart } from '../context/CartContext'
import { useState, useEffect, useRef } from "react";

const Header = () => {
    const [isCartOpen, setisCartOpen] = useState(false);
    const { cart, removeFromCart, reduceQty, cleanCart } = useCart();
    const cartRef = useRef(null);

    // Close the cart on outside click or Escape
    useEffect(() => {
        if (!isCartOpen) return;

        const handleClickOutside = (e) => {
            if (cartRef.current && !cartRef.current.contains(e.target)) {
                setisCartOpen(false);
            }
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setisCartOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isCartOpen]);

    const itemCount = cart.reduce((accumulator, item) => accumulator + item.qty, 0);
    const totalPrice = cart.reduce((accumulator, item) => accumulator + (item.price * item.qty), 0).toFixed(2);

    const handleRemove = (id) => {
        removeFromCart(id);
    }

    const handleQty = (id, qty) => {
        reduceQty(id, qty)
    }

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">

            <h1 className='text-2xl font-bold text-gray-950'>
                ShopMate
            </h1>

            <div className="relative" ref={cartRef}>
                <button
                    type="button"
                    aria-label="Toggle cart"
                    className="cursor-pointer"
                    onClick={() => setisCartOpen(!isCartOpen)}
                >
                    <FaShoppingCart color="black" className="text-2xl text-gray-700" />
                    {
                        itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {itemCount}
                            </span>
                        )
                    }
                </button>
                {isCartOpen && (
                    <div className="absolute right-0 mt-3 w-96 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">

                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h2 className="text-gray-900 font-semibold text-lg">Your Cart</h2>
                            <span className="text-sm text-gray-500">
                                {itemCount} {itemCount === 1 ? 'item' : 'items'}
                            </span>
                        </div>

                        {cart.length == 0 ? (
                            <div className="flex flex-col items-center gap-2 px-5 py-10 text-gray-500">
                                <FaShoppingCart className="text-4xl text-gray-300" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            <>
                                <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100 px-5">
                                    {cart.map(item => (
                                        <li key={item.id} className="flex items-center gap-3 py-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 flex-shrink-0 object-cover rounded-lg bg-gray-50 border border-gray-100"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mb-2">${item.price.toFixed(2)} each</p>

                                                <div className="inline-flex items-center border border-gray-200 rounded-lg">
                                                    <button
                                                        type="button"
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-600 rounded-l-lg hover:bg-gray-100"
                                                        onClick={() => { handleQty(item.id, -1) }}
                                                    >
                                                        <FaMinus className="text-[10px]" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-gray-900">{item.qty}</span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                        className="w-7 h-7 flex items-center justify-center text-gray-600 rounded-r-lg hover:bg-gray-100"
                                                        onClick={() => { handleQty(item.id, +1) }}
                                                    >
                                                        <FaPlus className="text-[10px]" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end justify-between self-stretch">
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${item.name}`}
                                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                    onClick={() => { handleRemove(item.id) }}
                                                >
                                                    <FaTrash className="text-sm" />
                                                </button>
                                                <p className="text-sm font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-gray-600">Total</span>
                                        <span className="text-xl font-bold text-gray-900">${totalPrice}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={cleanCart}
                                        className="w-full py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-red-600 transition-colors"
                                    >
                                        Clear cart
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>

        </header>
    )
}

export default Header