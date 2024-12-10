import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function SellerLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, setUser } = useContext(AuthContext);

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://127.0.0.1:5000/login-as-seller", {
                email, password
            })
            navigate("/dashboard");
            localStorage.setItem("accessToken", res.data.token);
            login();
            setUser(false);
        } catch (error) {
            window.alert(error.message)
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w flex items-center justify-center'>
                <div className='p-6 py-10 flex border shadow-xl flex-col items-center'>
                    <h1 className='text-xl font-bold mb-7'>Login as Seller Now!</h1>
                    <form onSubmit={submitHandle} className='flex flex-col gap-4'>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail address' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='************' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <button disabled={loading} className={`${loading ? "bg-sky-500/50" : "bg-sky-500"} text-white py-2 font-semibold cursor-pointer`}>Sing In as Seller</button>
                    </form>
                    <div className='flex justify-center mt-4 gap-2'>
                        <p>Become seller?</p>
                        <p onClick={() => navigate("/register-as-seller")} className='text-sky-500 cursor-pointer'>Sign Up</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerLogin