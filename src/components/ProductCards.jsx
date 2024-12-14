import React, { useContext } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProductCards({ data }) {
    const navigate = useNavigate();
    const { cart, addToCart } = useContext(AuthContext);
    // console.log(cart);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    return (
        <div className='group h-[17rem] w-[15rem] shadow-md rounded-md border'>
            <div onClick={() => navigate(`/product-details?id=${data?.id}`)} className='overflow-hidden h-[12rem] w-full flex items-center justify-center'>
                <img src={data.img_url} alt="image" className='group-hover:scale-110 transition h-full w-full object-contain' />
            </div>
            <div className='h-[5rem] px-5 flex items-center justify-between'>
                <div onClick={() => navigate(`/product-details?id=${data?.id}`)} className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-nowrap'>{data?.title?.slice(0, 12)}</h1>
                    <h1 className=''>{formatCurrency(Math.floor(data?.price - (data?.price * data?.discount / 100)))}</h1>
                </div>
                {
                    !cart.some((item) => item?.product === data.id) &&
                    <div onClick={() => addToCart(data.id)} className='p-3 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer'>
                        <FaShoppingCart color='#FFF' size={20} />
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductCards