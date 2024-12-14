import React, { useContext, useEffect, useState } from 'react'
import Order from './Order'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Orders() {
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);
    const [data, setData] = useState(null);

    const getOrderData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/get-user-orders", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })

            setData(res.data.data);
        } catch (error) {
            window.alert("Something went wrong");
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isLogin) navigate("/sign-in");
        else getOrderData();
    }, []);

    // console.log(data);

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w px-14 pt-[7rem]'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-bold mb-6'>Your Orders</h1>
                    <h1 className='font-bold mb-6 text-sky-800 cursor-pointer'>History</h1>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    {
                        data && data?.map((dt, ind) => (
                            <Order key={ind} data={dt} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Orders