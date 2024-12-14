import React, { useEffect, useContext, useState } from 'react'
import SellerDashboard from './SellerDashboard'
import PendingOrder from './PendingOrder'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function PendingOrders() {
    const [data, setData] = useState(undefined);
    const { logout } = useContext(AuthContext);

    const getData = async () => {
        try {
            const res = await axios("http://127.0.0.1:5000/get-seller-pending-orders", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })

            // console.log(res.data.data);
            setData(res.data.data);
        } catch (error) {
            logout();
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const acceptOrder = async (orderId) => {
        try {
            await axios.post("http://127.0.0.1:5000/accept-order",
                {
                    orderId
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )
            getData();
            window.alert("Order accepted...!");
        } catch (error) {
            window.alert("Something went wrong");
            console.log(error);
        }
    }

    return (
        <SellerDashboard>
            <div className='flex flex-col gap-5 pl-4 mt-8'>
                {
                    data && data.map((dt, ind) => (
                        <PendingOrder key={ind} data={dt} acceptOrder={acceptOrder} />
                    ))
                }
            </div>
        </SellerDashboard>
    )
}

export default PendingOrders