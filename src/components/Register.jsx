import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandle = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post("http://127.0.0.1:5000/register", {
                email, password
            })
            navigate("/sigin-in");
            window.alert("Register successfully");
        } catch (error) {
            console.log(error);
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
                    <h1 className='text-xl font-bold mb-7'>Register Now!</h1>
                    <form onSubmit={submitHandle} className='flex flex-col gap-4'>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail address' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <input required value={cpassword} onChange={e => setCPassword(e.target.value)} type="password" placeholder='Confirm password' className='outline-0 border border-black h-[2.5rem] w-[20rem] px-3' />
                        <button type='submit' disabled={loading} className={`${loading ? "bg-sky-500/50" : "bg-sky-500"} text-white py-2 font-semibold cursor-pointer`}>Sing Up</button>
                    </form>
                    <div className='flex justify-center mt-4 gap-2'>
                        <p>Already have a account?</p>
                        <p onClick={() => navigate("/sign-in")} className='text-sky-500 cursor-pointer'>Sign in</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register