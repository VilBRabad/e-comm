import axios from 'axios';
import React, { useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [shop_name, setShopName] = useState("");
    const [owner_name, setOwnerName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            await axios.post("http://127.0.0.1:5000/update-profile",
                {
                    shop_name, owner_name, address, pincode
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )
        } catch (error) {
            window.alert("Something went wrong!");
        }
        finally {
            setLoading(false);
        }
    }

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
                <form onSubmit={updateProfile} className='shadow-xl p-8 w-[30rem] border-2 border-black rounded-lg flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="">Shop/retails Name</label>
                        <input type="text" required value={shop_name} onChange={e => setShopName(e.target.value)} className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Owner Full Name</label>
                        <input type="text" required value={owner_name} onChange={e => setOwnerName(e.target.value)} className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Address</label>
                        <input type="text" required value={address} onChange={e => setAddress(e.target.value)} className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Pincode</label>
                        <input type="number" required value={pincode} onChange={e => setPincode(e.target.value)} className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <button type='submit' disabled={loading} className={`py-3 ${loading ? "bg-sky-500/50" : "bg-sky-500"} font-bold text-white cursor-pointer`}>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile