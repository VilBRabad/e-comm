import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { FiPlus, FiMinus } from "react-icons/fi";
import { Mosaic } from "react-loading-indicators";

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const param = new URLSearchParams(location.search);
    const id = param.get('id');
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const { cart, removeFromCart, addToCart } = useContext(AuthContext);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://127.0.0.1:5000/get-product-details?id=${id}`);

            setData(res.data.data[0]);
        } catch (error) {
            window.alert("Prduct not found")
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) getData()
        else navigate("/products");
    }, []);

    const productInCart = cart?.find(item => item?.product?.id === data?.id);
    // console.log(productInCart);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    };

    return (
        !loading ?
            data &&
            <div className='w-screen h-screen flex justify-center'>
                <div className='res-w pt-[6rem] flex gap-5'>
                    <div className='w-[40%] flex items-start mt-20 p-8'>
                        <img src={data?.img_url} alt="" className='w-[80%] object-contain' />
                    </div>
                    <div className='w-[60%] pt-10'>
                        <h1 className='text-2xl font-bold text-blue-600'>{data?.title}</h1>
                        <div className='flex gap-4'>
                            <p className='text-xl mt-3 font-bold'>{formatCurrency(Math.floor(data?.price - (data?.price * data?.discount / 100)))}</p>
                            <p className='text-xl mt-3 line-through'>{formatCurrency(Math.floor(data?.price))} </p>
                            <p className='text-xl mt-3 text-green-600 font-bold'>{data?.discount}%</p>
                        </div>
                        <p className='w-[80%] mt-6 text-lg font-semibold text-black/50'>{data?.description}</p>
                        <div className='mt-6 flex gap-4 text-lg'>
                            <p className='font-semibold'>Availability: </p>
                            <p>In Stock</p>
                        </div>
                        <div className='mt-3 flex gap-4 text-lg'>
                            <p className='font-semibold'>Shipping: </p>
                            <p>Yes</p>
                        </div>
                        <div className='mt-3 flex gap-4 text-lg'>
                            <p className='font-semibold'>Category: </p>
                            <p>{data?.category}</p>
                        </div>
                        <div className='mt-3 flex gap-4 text-lg'>
                            <p className='font-semibold'>Company: </p>
                            <p>{data?.company}</p>
                        </div>
                        <div className='mt-3 flex gap-4 text-lg'>
                            <p className='font-semibold'>Available Stock: </p>
                            <p>{data?.stock}</p>
                        </div>
                        {/* <div className='mt-3 flex gap-4 text-lg'>
                        <p className='font-semibold'>Retailer/Seller: </p>
                        <p>Om sai ram electronics seller</p>
                    </div> */}
                        <div className='h-[2px] bg-black/50 w-full my-6'></div>
                        <div className='flex gap-4'>
                            <div onClick={() => {
                                if (data && data.stock > 0) {
                                    navigate("/buy/select-addreess", { state: { productId: data.id } })
                                }
                            }} className='cursor-pointer h-[2.6rem] px-8 bg-sky-700 text-white font-semibold rounded-lg flex items-center justify-center'>
                                <p>Buy Now</p>
                            </div>
                            {
                                productInCart ?
                                    <div className='min-w-[8rem] flex gap-2 justify-between items-center rounded-full cursor-pointer'>
                                        <div onClick={() => {
                                            removeFromCart(productInCart?.id)
                                            window.location.reload();
                                        }} className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                                            <FiMinus size={18} />
                                        </div>
                                        <div className='flex items-center justify-center'>
                                            <p className='text-lg font-bold'>{productInCart.quntity}</p>
                                        </div>
                                        <div onClick={() => {
                                            addToCart(productInCart?.id)
                                            window.location.reload();
                                        }} className='border rounded-full w-7 h-7 border-black flex items-center justify-center'>
                                            <FiPlus size={18} />
                                        </div>
                                    </div>
                                    :
                                    <div onClick={() => addToCart(data?.id)} className='cursor-pointer h-[2.6rem] px-8 bg-orange-700 text-white font-semibold rounded-lg flex items-center justify-center'>
                                        <p>Add to cart</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='w-screen min-h-screen flex justify-center items-center'>
                <Mosaic color="#000000" size="small" text="" textColor="" />
            </div>
    )
}

export default ProductDetails