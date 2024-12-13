import React, { useEffect, useState, useContext } from 'react'
import SellerDashboard from './SellerDashboard'
import AcceptedOrder from './AcceptedOrder'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AcceptedOrders() {
    const [data, setData] = useState(undefined);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios("http://127.0.0.1:5000/get-seller-accepted-orders", {
                headers: {
                    Authorization: localStorage.getItem("accessToken")
                }
            })

            // console.log(res.data.data);
            setData(res.data.data);
        } catch (error) {
            logout();
            navigate("/login-as-seller");
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <SellerDashboard>
            <div className='flex flex-col gap-5 pl-4 mt-8'>
                {
                    data && data.map((dt, ind) => (
                        <AcceptedOrder key={ind} data={dt} />
                    ))
                }
            </div>
        </SellerDashboard>
    )
}

export default AcceptedOrders