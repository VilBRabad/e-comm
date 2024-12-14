import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex justify-center bg-[url('https://st4.depositphotos.com/4475215/38212/i/450/depositphotos_382123268-stock-photo-home-appliances-commerce-online-shopping.jpg')] bg-cover">
            <div className="res-w h-full flex items-center px-14">
                <div className='h-full flex flex-col justify-center items-end'>
                    <h1 className='text-3xl font-semibold'>Buy best elctronic devices</h1>
                    <p className='w-1/2 mt-4 text-end'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum officiis doloremque eligendi odit commodi neque porro illo dolorum sit cupiditate?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae rem odio perferendis non! Explicabo iste incidunt architecto nobis est facere!
                    </p>
                    <button onClick={() => navigate("/products")} className='cursor-pointer mt-4 h-[2.4rem] px-6 min-w-[8.5rem] bg-sky-700 text-white font-semibold rounded-full'>
                        Start Shopping
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home