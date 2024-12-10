import React, { useContext, useEffect, useState } from 'react'
import Order from './Order'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        if (!isLogin) navigate("/sign-in");


    }, []);

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w px-14 pt-[7rem]'>
                <div className='flex justify-between'>
                    <h1 className='text-xl font-bold mb-6'>Your Orders</h1>
                    <h1 className='font-bold mb-6 text-sky-800 cursor-pointer'>History</h1>
                </div>
                <div className='flex flex-col items-center gap-3'>
                    <Order />
                    <Order />
                </div>
            </div>
        </div>
    )
}

export default Orders