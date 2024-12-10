import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const param = new URLSearchParams(location.search);
    const id = param.get('id');
    const [data, setData] = useState(undefined);

    const getData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/get-product-details?id=${id}`);

            setData(res.data.data[0]);
        } catch (error) {
            window.alert("Prduct not found")
        }
    }

    useEffect(() => {
        if (id) getData()
        else navigate("/products");
    }, []);

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w pt-[6rem] flex gap-5'>
                <div className='w-[40%] flex justify-center mt-20'>

                </div>
                <div className='w-[60%] pt-10'>
                    <h1 className='text-2xl font-bold text-blue-600'>{data?.title}</h1>
                    <div className='flex gap-4'>
                        <p className='text-xl mt-3 font-bold'>₹ {data?.price - (data?.price * (data?.discount / 100))}</p>
                        <p className='text-xl mt-3 line-through'>₹ {data?.price} </p>
                        <p className='text-xl mt-3 text-green-600 font-bold'>{data?.discount}%</p>
                    </div>
                    <p className='w-[80%] mt-6 text-lg font-semibold text-black/50'>{data?.description}</p>
                    <div className='mt-6 flex gap-4 text-lg'>
                        <p className='font-semibold'>Availability: </p>
                        <p>In Stock</p>
                    </div>
                    <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Shipping: </p>
                        <p>Yes</p>
                    </div>
                    <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Category: </p>
                        <p>{data?.category}</p>
                    </div>
                    <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Company: </p>
                        <p>{data?.company}</p>
                    </div>
                    <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Available Stock: </p>
                        <p>{data?.stock}</p>
                    </div>
                    {/* <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Retailer/Seller: </p>
                        <p>Om sai ram electronics seller</p>
                    </div> */}
                    <div className='h-[2px] bg-black/50 w-full my-6'></div>
                    <div className='flex gap-4'>
                        <div onClick={() => navigate("/buy/select-addreess")} className='cursor-pointer h-[2.6rem] px-8 bg-sky-700 text-white font-semibold rounded-lg flex items-center justify-center'>
                            <p>Buy Now</p>
                        </div>
                        <div className='cursor-pointer h-[2.6rem] px-8 bg-orange-700 text-white font-semibold rounded-lg flex items-center justify-center'>
                            <p>Add to cart</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails