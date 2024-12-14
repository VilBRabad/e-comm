import React, { useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";

import CartProductCard from './CartProductCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Cart() {
    const navigate = useNavigate();
    const { isLogin, cart, clearCart } = useContext(AuthContext);

    useEffect(() => {
        if (isLogin === false) {
            const timeout = setTimeout(() => {
                navigate("/sign-in");
            }, 2000); // Delay of 2000ms (2 seconds)

            // Clean up the timeout when the component unmounts or if `isLogin` changes
            return () => clearTimeout(timeout);
        }
    }, [isLogin]); // Add `isLogin` to the dependency array


    return (
        cart ?
            <div className='w-screen h-screen flex justify-center'>
                <div className='res-w pt-[6rem]'>
                    <div className='flex justify-between mb-10'>
                        <h1 className='text-xl font-bold'>Your cart ({cart ? (`${cart.length} Items`) : 0})</h1>
                        <div className='flex gap-4'>
                            <div onClick={() => {
                                if (cart && cart?.length > 0) navigate("/buy/select-addreess")
                            }} className={`cursor-pointer px-5 font-semibold text-white py-2 ${!cart || cart.length <= 0 ? "bg-sky-600/50" : "bg-sky-600"} rounded-full`}>
                                <p>Proceed to checkout</p>
                            </div>
                            <div onClick={() => clearCart()} className='cursor-pointer px-5 font-semibold text-white py-2 bg-red-600 rounded-full'>
                                <p>Clear cart</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-5'>
                        {
                            cart && cart.map((dt, ind) => (
                                <div key={ind} className='relative group'>
                                    {dt.product && <CartProductCard data={dt} product={dt.product} />}
                                    <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                                        <RxCross2 color='#FFF' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            :
            <div className='h-full w-full flex items-center justify-center'>
                <p onClick={() => window.location.reload()}>Loading.....</p>
            </div>
    )
}

export default Cart