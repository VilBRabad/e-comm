import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w h-full flex items-center px-14'>
                <div className='h-full flex flex-col justify-center'>
                    <h1 className='text-xl font-semibold'>Buy best elctronic devices</h1>
                    <p className='w-1/2 mt-4'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum officiis doloremque eligendi odit commodi neque porro illo dolorum sit cupiditate?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae rem odio perferendis non! Explicabo iste incidunt architecto nobis est facere!
                    </p>
                    <button onClick={() => navigate("/products")} className='mt-4 h-[2.4rem] w-[8.5rem] bg-sky-700 text-white font-semibold rounded-full'>
                        Buy Products
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home