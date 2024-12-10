import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const navigate = useNavigate();
    return (
        <div className='w-screen min-h-screen flex justify-center'>
            <div className='relative res-w px-14 flex flex-col items-center justify-center'>
                <div className='w-full'>
                    <div onClick={() => navigate(-1)} className='cursor-pointer shadow-xl py-3 bg-slate-400/20 w-[9rem] flex gap-2 items-center rounded-full justify-center'>
                        <IoMdArrowBack size={20} />
                        <p>Back</p>
                    </div>
                </div>
                <p className='mb-5 text-xl font-bold'>Update profile</p>
                <form className='shadow-xl p-8 w-[30rem] border-2 border-black rounded-lg flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="">Shop/retails Name</label>
                        <input type="text" className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Owner Full Name</label>
                        <input type="text" className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Address</label>
                        <input type="text" className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Pincode</label>
                        <input type="number" className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <button className='py-3 bg-sky-500 font-bold text-white cursor-pointer'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile