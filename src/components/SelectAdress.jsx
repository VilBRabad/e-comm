import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const getAddresses = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:5000/get-user-addresses",
            {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            }
        )
        // console.log(res.data);
        return res.data.data;
    } catch (error) {
        return error;
    }
}

function SelectAdress() {
    const navigate = useNavigate();
    const location = useLocation();
    const { productId } = location.state || {};
    const [addresses, setAddresses] = useState(null);

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [loading, setLoading] = useState(false);

    const [selectedAddress, setSelectAddress] = useState(null);

    const getAdd = async () => {
        const adds = await getAddresses();
        console.log(adds);
        setAddresses(adds);
    }

    const addNewAddress = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("http://127.0.0.1:5000/add-new-address",
                {
                    name, address, mobile, pincode
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )
            getAdd();
        } catch (error) {
            console.log(error)
            window.alert("Server error");
        }
        finally {
            setName("");
            setMobile("");
            setAddress("");
            setPincode("");
            setLoading(false);
        }
    }

    useEffect(() => {
        getAdd();
    }, []);

    if (!productId) navigate(-1);

    return (
        <div className='min-h-screen w-screen flex justify-center'>
            <div className='relative res-w flex gap-10 pt-[7rem]'>
                <div onClick={() => {
                    if (selectedAddress) {
                        navigate("/buy/payment", { state: { productId, addressId: selectedAddress?.id, name: selectedAddress?.name } })
                    }
                }} className='cursor-pointer absolute px-8 py-2 bg-blue-500 right-0 rounded-full'>
                    <p className='text-lg font-bold text-white'>Continue</p>
                </div>
                <div className='flex flex-col gap-2 w-[40%]'>
                    <h1 className='text-xl font-semibold'>Your save addresses</h1>
                    {
                        (addresses && addresses.length > 0) ? addresses.map((adds, ind) => (
                            <div onClick={() => setSelectAddress(adds)} key={ind} className={`cursor-pointer relative shadow-lg px-6 py-6 ${selectedAddress?.id === adds?.id ? "bg-yellow-500/20" : ""} w-[25rem] border-2 border-black rounded-xl flex flex-col gap-3`}>
                                <p className='text-lg font-bold'>{adds.name}</p>
                                <p>Address: {adds.address}</p>
                                <p>Pincode: {adds.pincode}</p>
                                <p>Phone No.: {adds.mobile_number}</p>
                                {/* <button className='absolute bottom-2 right-2 px-5 py-2 bg-red-500 rounded-md text-white'>Remove</button> */}
                            </div>
                        ))
                            :
                            <div>
                                <p className='text-red-700'>No address saved</p>
                            </div>
                    }
                </div>
                <div className='py-10'>
                    <h1 className='text-xl font-semibold'>Add new address</h1>
                    <form onSubmit={addNewAddress} className='ml-10 border-2 mt-6 p-6 border-black/60 rounded-lg'>
                        <div className='flex flex-col'>
                            <label htmlFor="">Full Name</label>
                            <input required value={name} onChange={e => setName(e.target.value)} type="text" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Mobile Number</label>
                            <input required value={mobile} onChange={e => setMobile(e.target.value)} type="number" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Address</label>
                            <textarea required value={address} onChange={e => setAddress(e.target.value)} type="text" name="" className='h-[5rem] w-[30rem] p-3 outline-0 border border-black' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="">Pincode</label>
                            <input required value={pincode} onChange={e => setPincode(e.target.value)} type="number" name="" className='h-[2.4rem] w-[30rem] px-3 outline-0 border border-black' />
                        </div>
                        <button type='submit' disabled={loading} className={`w-full mt-5 py-3 ${loading ? "bg-sky-500/50" : "bg-sky-500"} text-white font-bold`}>Add Address</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SelectAdress