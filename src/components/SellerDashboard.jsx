import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { Mosaic } from "react-loading-indicators";

function SellerDashboard({ children }) {
    const navigate = useNavigate();
    const [data, setData] = useState(undefined);
    const { logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [todayOrder, setTodaysOrder] = useState(0);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios("http://127.0.0.1:5000/get-seller-details", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })

            setData(res.data.data[0]);
            setTodaysOrder(res.data.count);
        } catch (error) {
            logout();
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        !loading ?
            <div className='w-screen min-h-screen flex justify-center'>
                {data && <div className='res-w px-14 pt-[6rem] border-x'>
                    <div className='relative flex gap-6 items-center border-b-2 border-black/60 pb-8'>
                        <img src="/assets/user.png" className='h-[10rem]' alt="" />
                        <div>
                            <h1 className='text-2xl font-bold'>{data.shop_name}</h1>
                            <p className='text-lg'>Owner: {data.owner_name}</p>
                            <p className='text-lg'>Address: {data.address} - {data.pincode} </p>
                            {/* <p className='text-lg'>Contact: +91 7387410172</p> */}
                        </div>
                        <div onClick={() => navigate("/update-seller-profile")} className='absolute right-0 top-0 cursor-pointer px-6 py-3 bg-orange-600 rounded-full'>
                            <p className='font-bold text-white'>Update Profile</p>
                        </div>
                        <div onClick={() => {
                            logout();
                            navigate("/login-as-seller")
                        }} className='absolute right-0 top-16 cursor-pointer px-6 py-3 bg-slate-600 rounded-full'>
                            <p className='font-bold text-white'>Logout</p>
                        </div>
                    </div>
                    <div className='w-full border-b-2 border-black/60 flex gap-4 justify-between '>
                        <div className='flex gap-4'>
                            <div onClick={() => navigate("/dashboard")} className='py-3 px-6 bg-yellow-500/40 font-bold cursor-pointer'>
                                <p>Your Items</p>
                            </div>
                            <div onClick={() => navigate("/pending-orders")} className='py-3 px-6 bg-yellow-500/40 font-bold cursor-pointer'>
                                <p>Pending Orders</p>
                            </div>
                            <div onClick={() => navigate("/accepted-orders")} className='py-3 px-6 bg-yellow-500/40 font-bold cursor-pointer'>
                                <p>Accepted Orders</p>
                            </div>
                            <div onClick={() => navigate("/add-new-item")} className='py-3 px-6 bg-yellow-500/40 font-bold cursor-pointer'>
                                <p>Add New Item</p>
                            </div>
                        </div>
                        <div className='bg-green-500 text-white py-3 px-6 font-bold flex gap-3 items-center justify-center'>
                            <p>Todays number of orders</p>
                            <p>{todayOrder ? todayOrder : 0}</p>
                        </div>
                    </div>
                    {children}
                </div>}
            </div>
            :
            <div className='w-screen min-h-screen flex justify-center items-center'>
                <Mosaic color="#000000" size="small" text="" textColor="" />
            </div>
    )
}

export default SellerDashboard