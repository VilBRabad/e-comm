import React, { useEffect, useState } from 'react'
import ProductCards from './ProductCards'
import axios from 'axios';
import { Mosaic } from "react-loading-indicators";

function ProductList() {
    const [data, setData] = useState(undefined);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);


    const getData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://127.0.0.1:5000/get-products")
            setData(res.data.data);
        } catch (error) {
            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const getSearchData = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(`http://127.0.0.1:5000/product/search?q=${search}`);

            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        !loading ?
            <div className='w-screen min-h-screen flex justify-center'>
                <div className='res-w px-14 border pt-[6rem]'>
                    <div className='flex items-center justify-center pb-10 border-b'>
                        <form onSubmit={getSearchData} className='px-4 w-[70%] border border-black rounded-full flex items-center'>
                            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder='Search for television, mobile phone' className='border-r border-black w-[80%] h-[2.4rem] outline-0' />
                            <button type='submit' className='cursor-pointer w-[20%] flex justify-center'>
                                Search
                            </button>
                        </form>
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
            :
            <div className='w-screen min-h-screen flex justify-center items-center'>
                <Mosaic color="#000000" size="small" text="" textColor="" />
            </div>
    )
}

export default ProductList