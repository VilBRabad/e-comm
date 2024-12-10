import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SellerRegister() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [shop_name, setShopName] = useState("");
    const [owner_name, setOwnerName] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            if (password !== cpassword) throw new Error("")
            setLoading(true);
            await axios.post("http://localhost:500/register-as-seller", {
                email, password, shop_name, owner_name, address, pincode
            })
            navigate("/login-as-seller");
            window.alert("Register successfully");
        } catch (error) {
            window.alert(error.message || "Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w flex items-center justify-center'>
                <div className='p-6 py-10 flex border shadow-xl flex-col items-center'>
                    <h1 className='text-xl font-bold mb-7'>Become seller now!</h1>
                    <form onSubmit={submitHandle} className='flex flex-col gap-4'>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail address' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={shop_name} onChange={e => setShopName(e.target.value)} type="text" placeholder='Full name' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={owner_name} onChange={e => setOwnerName(e.target.value)} type="text" placeholder='Seller name' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={address} onChange={e => setAddress(e.target.value)} type="text" placeholder='Address' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={pincode} onChange={e => setPincode(e.target.value)} type="text" placeholder='Pincode' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={cpassword} onChange={e => setCPassword(e.target.value)} type="password" placeholder='Confirm password' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <button disabled={loading} className={`${loading ? "opacity-50" : ""} bg-sky-500 text-white py-2 font-semibold cursor-pointer`}>Sing Up</button>
                    </form>
                    <div className='flex justify-center mt-4 gap-2'>
                        <p>Already have a account?</p>
                        <p onClick={() => navigate("/login-as-seller")} className='text-sky-500 cursor-pointer'>Sign in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerRegister