import React from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function CardProductCard({ data }) {
    const navigate = useNavigate();
    console.log("Data", data);
    return (
        <div onClick={() => navigate(`/product-details?id=${data?.id}`)} className='h-[17rem] w-[15rem] shadow-md rounded-md border'>
            <div className='h-[12rem] w-full flex items-center justify-center'>

            </div>
            <div className='h-[5rem] px-5 flex items-center justify-between'>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold'>{data?.title}</h1>
                    <h1 className=''>Rs {data?.price - (data?.price * data?.discount / 100)}</h1>
                </div>
                <div className='w-[45%] flex gap-2 justify-between rounded-full cursor-pointer'>
                    <div className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                        <FiPlus size={18} />
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='text-lg'>5</p>
                    </div>
                    <div className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                        <FiMinus size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardProductCard