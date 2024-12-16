import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex flex-col gap-3 items-center justify-center'>
            <p className='text-4xl font-bold'>Payment successfully</p>
            <p onClick={() => navigate("/orders")} className='px-5 py-2 border rounded-full cursor-pointer hover:bg-blue-500/20 transition font-bold'>Go to Order</p>
        </div>
    )
}

export default SuccessPage