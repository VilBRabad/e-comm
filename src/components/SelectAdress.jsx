import React from 'react'
import { useNavigate } from 'react-router-dom'

function SelectAdress() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen w-screen flex justify-center'>
            <div className='relative res-w flex gap-10 pt-[7rem]'>
                <div onClick={() => navigate("/buy/payment")} className='cursor-pointer absolute px-8 py-2 bg-blue-500 right-0 rounded-full'>
                    <p className='text-lg font-bold text-white'>Continue</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl font-semibold'>Your save addresses</h1>
                    <div className='relative shadow-lg px-6 py-6 bg-yellow-500/20 w-[25rem] border-2 border-black rounded-xl flex flex-col gap-3'>
                        <p className='text-lg font-bold'>Vilas B. Rabad</p>
                        <p>Address: Pansare nagar, Lane no. A1, Kondhwa Bk, District Pune, Maharashtra </p>
                        <p>Pincode: 411048</p>
                        <p>Phone No.: 7387410172</p>
                        <button className='absolute bottom-2 right-2 px-5 py-2 bg-red-500 rounded-md text-white'>Remove</button>
                    </div>
                </div>
                <div className='py-10'>
                    <h1 className='text-xl font-semibold'>Add new address</h1>
                    <form className='ml-10 border-2 mt-6 p-6 border-black/60 rounded-lg'>
                        <div className='flex flex-col'>
                            <label htmlFor="">Full Name</label>
                            <input type="text" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Mobile Number</label>
                            <input type="number" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Address</label>
                            <textarea type="text" name="" className='h-[5rem] w-[30rem] p-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Pincode</label>
                            <input type="number" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <button className='w-full mt-5 py-3 bg-sky-500 text-white font-bold'>Add Address</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SelectAdress