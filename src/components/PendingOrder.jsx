import React from 'react'
import { useNavigate } from 'react-router-dom'

function PendingOrder({ data, acceptOrder }) {
    const navigate = useNavigate();
    console.log(data);
    return (
        <div className='relative cursor-pointer w-[100%] border-2 border-black rounded-xl px-6 py-6 flex items-center gap-6'>
            <div onClick={() => navigate("/product-details")} className='w-[10rem] h-[10rem] aspect-square'>
                <img src={data?.product?.img_url} alt="Product image" className='h-full w-full object-contain' />
            </div>
            <div onClick={() => navigate("/product-details")} className='flex flex-col gap-2 w-full'>
                <h1 className='text-xl font-bold'>{data?.product?.title}</h1>
                <div className='flex gap-4 items-center'>
                    <h1 className='text-lg'>₹ {data?.product?.price - (data?.product?.price * data?.product?.discount / 100)}</h1>
                    <p>X</p>
                    <div className='px-4 py-1 bg-blue-400 text-white rounded-full'>
                        Q. {data?.quantity}
                    </div>
                </div>
                <div className='h-[1px] bg-black/40 w-full'></div>
                <p className='font-semibold'>Deliver to:</p>
                {
                    data && data?.address ?
                        <div>
                            <p>Address: {data?.address?.address} - {data?.address?.pincode}</p>
                            <p>Phone No.: {data?.address?.mobile_number}</p>
                        </div>
                        :
                        <p>Not mentioned</p>
                }
            </div>
            <div className='absolute right-4 flex flex-col gap-2'>
                <div onClick={() => acceptOrder(data.id)} className='px-5 py-2 bg-green-500 text-white flex items-center justify-center rounded-full'>
                    <p>Shipped order</p>
                </div>
                {/* <div className='px-5 py-2 bg-red-500 text-white flex items-center justify-center rounded-full'>
                    <p>Discard</p>
                </div> */}
            </div>
        </div >
    )
}

export default PendingOrder