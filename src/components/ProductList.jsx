import React from 'react'
import ProductCards from './ProductCards'

function ProductList() {
    const getData = async () => {
        try {

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-screen min-h-screen flex justify-center'>
            <div className='res-w px-14 border pt-[6rem]'>
                <div className='flex items-center justify-center pb-10 border-b'>
                    <div className='px-4 w-[70%] border border-black rounded-full flex items-center'>
                        <input type="text" placeholder='Search for television, mobile phone' className='border-r border-black w-[80%] h-[2.4rem] outline-0' />
                        <div className='cursor-pointer w-[20%] flex justify-center'>
                            <p>Search</p>
                        </div>
                    </div>
                </div>
                <div className='py-10 flex gap-4 flex-wrap'>

                    <ProductCards />

                </div>
            </div>
        </div>
    )
}

export default ProductList