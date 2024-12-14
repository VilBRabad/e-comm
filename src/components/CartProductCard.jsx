import React, { useContext } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function CartProductCard({ data, product }) {
    const navigate = useNavigate();
    const { addToCart, removeFromCart } = useContext(AuthContext);

    return (
        data &&
        <div className='h-[17rem] w-[15rem] shadow-md rounded-md border'>
            <div onClick={() => navigate(`/product-details?id=${product?.id}`)} className='h-[12rem] p-3 w-full flex items-center justify-center'>
                <img src={product?.img_url} alt="" className='w-full h-full object-contain' />
            </div>
            <div className='h-[5rem] px-5 flex items-center justify-between'>
                <div onClick={() => navigate(`/product-details?id=${product?.id}`)} className='flex flex-col justify-center'>
                    <h1 className='font-semibold'>{product?.title?.slice(0, 11)}</h1>
                    <h1 className=''>Rs {product?.price - (product?.price * product?.discount / 100)}</h1>
                </div>
                <div className='w-[45%] flex gap-2 justify-between rounded-full cursor-pointer'>
                    <div onClick={() => {
                        if (product?.quntity > 0) removeFromCart(data?.id)
                    }} className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                        <FiMinus size={18} />
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='text-lg'>{data?.quntity}</p>
                    </div>
                    <div onClick={() => {
                        if (product?.quntity < data?.quntity) addToCart(data?.id)
                    }} className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                        <FiPlus size={18} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartProductCard