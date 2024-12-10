import React from 'react'

function Payment() {
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='relative res-w pt-[7rem] px-14 flex flex-col items-center'>
                <div className='w-full mb-10 text-xl font-semibold'>
                    <h1>Make Payment (Total ₹ 20,2000)</h1>
                </div>
                <p className='mb-3 font-semibold text-lg'>Select Payment Method</p>
                <div className='cursor-pointer shadow-lg w-[40%] border-2 border-black/50 py-4 rounded-xl flex items-center justify-center bg-yellow-500/30'>
                    <p>Cash on delivery</p>
                </div>
                <div className='mt-4 cursor-pointer shadow-lg w-[40%] border-2 border-black/50 py-4 rounded-xl flex items-center justify-between px-7'>
                    <div className='h-full'>
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
                    <div className='flex flex-col items-center'>
                        <img src="/assets/qrr_code.svg" alt="" />
                        <p>Or scan QR Code</p>
                    </div>
                </div>
                <div className='w-[40%] mt-4 py-2 bg-sky-400 text-lg font-bold text-white shadow-lg cursor-pointer border border-black rounded-xl flex items-center justify-center'>
                    <p>Place order</p>
                </div>
            </div>
        </div>
    )
}

export default Payment