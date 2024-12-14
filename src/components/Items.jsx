import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

function Items({ data, removeItem }) {
    const navigate = useNavigate();
    // console.log(data);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };
    return (
        <div className='group relative border-2 border-black  rounded-lg h-[17rem] w-[15rem] shadow-lg cursor-pointer'>
            <div onClick={() => navigate(`/product-details?id=${data.id}`)} className='h-[12rem] overflow-hidden'>
                <img src={data.img_url} alt="product" className='group-hover:scale-110 transition h-full w-full object-contain' />
            </div>
            <div onClick={() => navigate(`/product-details?id=${data.id}`)} className='h-[4.8rem] flex justify-between px-4 bg-blue-500/80'>
                <div className='flex flex-col justify-center text-white'>
                    <p className='text-lg font-semibold text-nowrap'>{data?.title.slice(0, 10)}</p>
                    <p>{formatCurrency(Math.floor(data?.price - (data?.price * data?.discount / 100)))}</p>
                </div>
                <div className='h-[100%] px-4 font-bold text-white bg-blue-500 flex justify-center items-center'>
                    <p>
                        Q: {data?.stock}
                    </p>
                </div>
            </div>
            <div onClick={() => removeItem(data.id)} className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                <RxCross2 color='#FFF' />
            </div>
        </div>
    )
}

export default Items