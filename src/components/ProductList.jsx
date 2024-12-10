import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
import axios from 'axios';

function ProductList() {
    const [data, setData] = useState(undefined);

    const getData = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:5000/get-products")
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData();
    }, []);

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

                    {
                        data && data.map((dt, ind) => (
                            <ProductCards key={ind} data={dt} />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductList