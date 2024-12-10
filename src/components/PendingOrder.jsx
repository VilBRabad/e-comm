import React from 'react'
import { useNavigate } from 'react-router-dom'

function PendingOrder({ data }) {
    const navigate = useNavigate();
    console.log(data);
    return (
        <div onClick={() => navigate("/product-details")} className='relative cursor-pointer w-[100%] border-2 border-black rounded-xl px-6 py-6 flex items-center gap-6'>
            <div className='w-[10rem] h-[10rem] aspect-square bg-red-500'>

            </div>
            <div className='flex flex-col gap-2 w-full'>
                <h1 className='text-xl font-bold'>Redmi N2 9GB Ram</h1>
                <div className='flex gap-4 items-center'>
                    <h1 className='text-lg'>₹ 31,990</h1>
                    <p>X</p>
                    <div className='px-4 py-1 bg-blue-400 text-white rounded-full'>
                        Q. 2
                    </div>
                </div>
                <div className='h-[1px] bg-black/40 w-full'></div>
                <p className='font-semibold'>Deliver to:</p>
                <div>
                    <p>Name: Vilas Rabad</p>
                    <p>Address: Pansare nagar, Lane no. A1, Kondhwa Bk, District Pune, Maharashtra - 411048</p>
                    <p>Phone No.: 7387410172</p>
                </div>
            </div>
            <div className='absolute right-4 flex flex-col gap-2'>
                <div className='px-5 py-2 bg-green-500 text-white flex items-center justify-center rounded-full'>
                    <p>Accept</p>
                </div>
                <div className='px-5 py-2 bg-red-500 text-white flex items-center justify-center rounded-full'>
                    <p>Discard</p>
                </div>
            </div>
        </div >
    )
}

export default PendingOrder