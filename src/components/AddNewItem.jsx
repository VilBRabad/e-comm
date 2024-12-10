import React, { useState } from 'react'
import SellerDashboard from "./SellerDashboard";
import axios from 'axios';

function AddNewItem() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [img_url, setImageUrl] = useState("www.google.com");

    const addItem = async (e) => {
        e.preventDefault();
        try {
            console.log("CAT", category);
            const res = await axios.post("http://127.0.0.1:5000/add-product", {
                title, price, discount, description, stock, company, category, img_url
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )

            window.alert("Added new Item");
        } catch (error) {
            window.alert(error.message);
        }
    }

    return (
        <SellerDashboard>
            <div className='flex justify-center mt-8'>
                <form onSubmit={addItem} className='w-[30rem] px-8 mb-10 py-6 border-2 border-black rounded-lg flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label htmlFor="">Title of item</label>
                        <input required value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Redmi N2 8GB RAM, 256GB......' className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Original Price</label>
                        <input required value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder='₹ 31,990' className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Discount</label>
                        <input required value={discount} onChange={e => setDiscount(e.target.value)} type="number" placeholder='36% off' className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Descripiton</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder='For this model, screen......' className='outline-0 h-[5rem] border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Select Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="category"
                            id="category"
                            className="outline-0 border border-black py-2 px-3"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="smartphone">Smartphone</option>
                            <option value="television">Television</option>
                            <option value="laptop">Laptop</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Comapny</label>
                        <input required value={company} onChange={e => setCompany(e.target.value)} type="text" placeholder='e.g. Samsung' className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Available Stock</label>
                        <input required value={stock} onChange={e => setStock(e.target.value)} type="number" placeholder='e.g. 100' className='outline-0 border border-black py-2 px-3' />
                    </div>
                    <button type='submit' className='py-3 bg-sky-500 font-bold text-white cursor-pointer'>ADD</button>
                </form>
            </div>
        </SellerDashboard>
    )
}

export default AddNewItem