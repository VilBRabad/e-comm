import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ProductCards() {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate("/product-details")} className='h-[17rem] w-[15rem] shadow-md rounded-md border'>
            <div className='h-[12rem] w-full flex items-center justify-center'>

            </div>
            <div className='h-[5rem] px-5 flex items-center justify-between'>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold'>Redmi N2</h1>
                    <h1 className=''>$39,303</h1>
                </div>
                <div className='p-3 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer'>
                    <FaShoppingCart color='#FFF' size={20} />
                </div>
            </div>
        </div>
    )
}

export default ProductCards