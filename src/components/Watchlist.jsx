import React from 'react'
import ProductCards from './ProductCards'
import { RxCross2 } from "react-icons/rx";

function Watchlist() {
    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w pt-[6rem]'>
                <div className='flex justify-between mb-10'>
                    <h1 className='text-xl font-bold'>Your Watchlist</h1>
                </div>
                <div className='flex flex-wrap gap-5'>
                    <div className='relative group'>
                        <ProductCards />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                    <div className='relative group'>
                        <ProductCards />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                    <div className='relative group'>
                        <ProductCards />
                        <div className='hidden group-hover:block absolute -top-3 p-2 -right-3 cursor-pointer bg-black rounded-full'>
                            <RxCross2 color='#FFF' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watchlist