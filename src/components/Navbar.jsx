import React, { useEffect, useContext } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const navigate = useNavigate();
    const { isLogin, isUser, logout } = useContext(AuthContext);

    // useEffect(() => {

    // }, [isLogin]);

    return (
        <div className='absolute h-[3.5rem] bg-blue-900 w-screen flex justify-center items-center z-50'>
            <div className='res-w flex justify-between'>
                <h1 onClick={() => navigate("/")} className='cursor-pointer text-xl font-bold text-white'>E-COMM</h1>
                <div className='flex gap-8 text-white items-center'>
                    <p onClick={() => navigate("/products")} className='cursor-pointer'>Products</p>
                    {/* <p onClick={() => navigate("/watchlist")} className='cursor-pointer'>Watchlist</p> */}
                    {
                        (isUser || (!isLogin)) &&
                        <>
                            <div onClick={() => navigate("/cart")} className='cursor-pointer flex items-center gap-2'>
                                <p>Cart</p>
                                <FaShoppingCart />
                            </div>
                            <p onClick={() => navigate("/orders")} className='cursor-pointer'>Orders</p>
                        </>
                    }
                    {
                        isLogin ?
                            !isUser ?
                                <p onClick={() => navigate("/dashboard")} className='cursor-pointer'>Dashboard</p> :
                                <p onClick={() => { navigate("/"); logout() }} className='cursor-pointer'>Logout</p>
                            :
                            <>
                                <p onClick={() => navigate("/sign-in")} className='cursor-pointer'>Login</p>
                                <p onClick={() => navigate("/register-as-seller")} className='cursor-pointer'>Become Seller</p>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar