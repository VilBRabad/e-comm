import React from 'react'
import { useNavigate } from 'react-router-dom'
import InvoicePDF from './InvoicePDF';

function Order({ data }) {
    const navigate = useNavigate();
    if (!data) navigate(-1);

    // console.log(data);
    return (
        <div className='relative cursor-pointer w-[80%] border-2 border-black rounded-xl px-6 py-6 flex items-center gap-6'>
            <div onClick={() => navigate(`/product-details?id=${data?.product?.id}`)} className='w-[10rem] h-[10rem] aspect-square'>
                <img src={data?.product?.img_url} alt="" className='h-full w-full object-contain' />
            </div>
            <div className='relative flex flex-col gap-2 w-full'>
                <h1 onClick={() => navigate(`/product-details?id=${data?.product?.id}`)} className='text-xl font-bold'>{data?.product?.title}</h1>
                <div className='flex gap-4 items-center'>
                    <h1 className='text-lg'>₹ {data?.product?.price - (data?.product?.price * data?.product?.discount / 100)}</h1>
                    <p>X</p>
                    <div className='px-4 py-1 bg-blue-400 text-white rounded-full'>
                        Q. {data?.quantity}
                    </div>
                    <div className='px-4 py-1 bg-green-400 text-black rounded-full'>
                        Payment Mode. {data?.payment}
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
                <InvoicePDF orderId={data?.id} />
            </div>
            <div className={`absolute right-4 top-4 py-1 text-sm text-green-800 px-4 rounded-full ${data?.status ? "bg-yellow-500/30" : "bg-green-500/30"}`}>
                <p>{data?.status ? "Shipped" : "Not shipped yet"}</p>
            </div>
        </div >
    )
}

export default Order