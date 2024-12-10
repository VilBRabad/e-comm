import axios from 'axios';
import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function ProductCards({ data }) {
    const navigate = useNavigate();

    const addToCart = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/add-to-cart", {
                product: data.id, quntity: 1
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            );

            window.alert("added to cart");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-[17rem] w-[15rem] shadow-md rounded-md border'>
            <div onClick={() => navigate(`/product-details?id=${data?.id}`)} className='h-[12rem] w-full flex items-center justify-center'>

            </div>
            <div className='h-[5rem] px-5 flex items-center justify-between'>
                <div onClick={() => navigate(`/product-details?id=${data?.id}`)} className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-nowrap'>{data?.title.slice(0, 12)}</h1>
                    <h1 className=''>{data?.price - (data?.price * (data?.discount / 100))}</h1>
                </div>
                <div onClick={() => addToCart()} className='p-3 bg-red-500 hover:bg-red-700 rounded-full cursor-pointer'>
                    <FaShoppingCart color='#FFF' size={20} />
                </div>
            </div>
        </div>
    )
}

export default ProductCards