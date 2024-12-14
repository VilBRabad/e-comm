import React from 'react'
import { useNavigate } from 'react-router-dom'

function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <p className='text-4xl font-bold'>Payment successfully</p>
            <p onClick={() => navigate("/orders")} className='text-4xl font-bold'>Go to Order</p>
        </div>
    )
}

export default SuccessPage