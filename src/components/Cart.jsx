import React, { useContext, useEffect } from 'react'
import { RxCross2 } from "react-icons/rx";
import CardProductCard from './CardProductCard';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Cart() {
    const navigate = useNavigate();
    const { isLogin } = useContext(AuthContext);
    const [data, setData] = useState(undefined);

    const getData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/login", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })

            console.log(re.data.data);
        } catch (error) {
            window.alert(error.message);
        }
    }

    useEffect(() => {
        if (!isLogin) navigate("/sign-in");
        else {
            getData();
        }
    }, []);

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w pt-[6rem]'>
                <div className='flex justify-between mb-10'>
                    <h1 className='text-xl font-bold'>Your cart (20 Items)</h1>
                    <div className='flex gap-4'>
                        <div onClick={() => navigate("/buy/select-addreess")} className='cursor-pointer px-5 font-semibold text-white py-2 bg-sky-600 rounded-full'>
                            <p>Proceed to checkout</p>
                        </div>
                        <div className='cursor-pointer px-5 font-semibold text-white py-2 bg-red-600 rounded-full'>
                            <p>Clear cart</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='relative group'>
                        <CardProductCard />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                    <div className='relative group'>
                        <CardProductCard />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                    <div className='relative group'>
                        <CardProductCard />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart