import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

function Items({ data }) {
    const navigate = useNavigate();
    console.log(data);
    return (
        <div onClick={() => navigate(`/product-details?id=${data.id}`)} className='group relative border-2 border-black  rounded-lg h-[17rem] w-[15rem] shadow-lg cursor-pointer'>
            <div className='h-[12rem]'>

            </div>
            <div className='h-[4.8rem] flex justify-between px-4 bg-blue-500/80'>
                <div className='flex flex-col justify-center text-white'>
                    <p className='text-lg font-semibold text-nowrap'>{data?.title.slice(0, 10)}</p>
                    <p>₹ {data?.price}</p>
                </div>
                <div className='h-[100%] px-4 font-bold text-white bg-blue-500 flex justify-center items-center'>
                    <p>
                        Q: {data?.stock}
                    </p>
                </div>
            </div>
            <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                <RxCross2 color='#FFF' />
            </div>
        </div>
    )
}

export default Items