import { useState } from 'react'
import { useCart } from '../context/CartContext'



const UserCart = () => {
    const { cart } = useCart()
    const [delItem, setDelItem] = useState(false)

    return (
        <div className="wrapper">
            {cart.map((item) => {
                <div className="bg-white rounded-lg shadow p-4 flex flex-col">
                    <img src={item.image} alt={item.name} className='h-40 object-cover rounded mb-4' />
                    <h2 className='text-xl text-black font-semibold'>{item.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <p className='font-bold text-lg text-black'>${item.price.toFixed(2)}</p>
                </div>
            })}
        </div>

    )
}

export default UserCart