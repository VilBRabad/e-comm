import axios from 'axios';
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, setUser } = useContext(AuthContext);

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("http://127.0.0.1:5000/login", {
                email, password
            })
            console.log(res.data.token);
            localStorage.setItem("accessToken", res.data.token);
            login();
            setUser(true);
            navigate("/products");
        } catch (error) {
            window.alert("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center'>
            <div className='res-w flex items-center justify-center'>
                <div className='p-6 py-10 flex border shadow-xl flex-col items-center'>
                    <h1 className='text-xl font-bold mb-7'>Login Now!</h1>
                    <form onSubmit={submitHandle} className='flex flex-col gap-4'>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail address' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='************' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <button type='submit' disabled={loading} className={`${loading ? "bg-sky-500/50" : "bg-sky-500"} text-white py-2 font-semibold cursor-pointer`}>Sing In</button>
                    </form>
                    <div className='flex justify-center mt-4 gap-2'>
                        <p>New to e-comm?</p>
                        <p onClick={() => navigate("/sign-up")} className='text-sky-500 cursor-pointer'>Sign Up</p>
                    </div>
                    <div className='flex justify-center mt-4 gap-2'>
                        <p onClick={() => navigate("/login-as-seller")} className='text-sky-500 cursor-pointer'>Login as a seller</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login