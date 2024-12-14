import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { productId, addressId } = location.state || {};
    const [prodDetails, setDetails] = useState(null);

    if (!productId || !addressId) navigate(-1);

    const placeOrder = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/make-order",
                {
                    productId, addressId
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )
            window.alert("Order Placed");
            navigate("/orders");
        } catch (error) {
            window.alert("Somthing went wrong");
            return error;
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:5000/get-product-details?id=${productId}`)
            console.log(res.data.data[0]);
            setDetails(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])



    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='relative res-w pt-[7rem] px-14 flex gap-16 items-center'>
                <div className='h-full w-[50%]'>
                    <div className='w-full mb-10 text-xl font-bold text-green-700'>
                        <h1>** Make Payment (Total ₹ {(prodDetails?.price - (prodDetails?.price * prodDetails?.discount / 100)) + 20} )</h1>
                    </div>
                    <div className='mt-10 flex flex-col gap-5 items-center border border-black p-4 py-10 rounded-lg'>
                        <img src={prodDetails?.img_url} alt="Product Image" className='w-[20rem] object-contain' />
                        <p className='font-bold text-xl'>Name: {prodDetails?.title}</p>
                        <p className='font-bold text-lg'>Price: ₹  {prodDetails?.price - (prodDetails?.price * prodDetails?.discount / 100)}</p>
                        <p className='font-bold text-green-600'>Discount:  {prodDetails?.discount} %</p>
                        <p className='font-bold text-red-600'>Tax (GST): ₹ 20  </p>
                        <p className='font-bold'>Quantity : 1  </p>
                    </div>
                </div>
                <div className='w-[40%]'>
                    <p className='mb-3 font-semibold text-lg'>Select Payment Method</p>
                    <div className='cursor-pointer shadow-lg w-full border-2 border-black/50 py-4 rounded-xl flex items-center justify-center bg-yellow-500/30'>
                        <p>Cash on delivery</p>
                    </div>
                    <div className='relative mt-4 cursor-pointer shadow-lg w-full border-2 border-black/50 py-4 rounded-xl flex items-center justify-between px-7'>
                        <div className='opacity-40  h-full'>
                            <p className='text-lg font-semibold'>UPI</p>
                            <div className='mt-3 px-6 py-2 border border-black rounded-lg flex justify-center items-center'>
                                <p>Google Pay</p>
                            </div>
                            <div className='mt-3 px-6 py-2 border border-black rounded-lg flex justify-center items-center'>
                                <p>Phonepe</p>
                            </div>
                            <div className='mt-3 px-6 py-2 border border-black rounded-lg flex justify-center items-center'>
                                <p>Paytm</p>
                            </div>
                            <div className='mt-3 px-6 py-2 border border-black rounded-lg flex justify-center items-center'>
                                <p>Debit/Credit Card</p>
                            </div>
                        </div>
                        <div className='opacity-40 flex flex-col items-center'>
                            <img className='blur-[0.6rem]' src="/assets/qrr_code.svg" alt="" />
                            <p>Or scan QR Code</p>
                        </div>
                        <p className='absolute font-bold text-xl left-[50%] -translate-x-[50%] shadow-lg bg-white/60 px-2'>Currently not available</p>
                    </div>
                    <div onClick={placeOrder} className='w-full mt-4 py-2 bg-sky-400 text-lg font-bold text-white shadow-lg cursor-pointer border border-black rounded-xl flex items-center justify-center'>
                        <p>Place order</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment