import React, { useEffect, useContext, useState } from 'react'
import SellerDashboard from './SellerDashboard'
import Items from './Items'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


function SellerItems() {
    const [data, setData] = useState(undefined);
    const { logout } = useContext(AuthContext);

    const getData = async () => {
        try {
            const res = await axios("http://127.0.0.1:5000/get-seller-products", {
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

    return (
        <SellerDashboard>
            <div className='mt-6 flex gap-5 flex-wrap'>
                {
                    data && data.map((dt, ind) => (
                        <Items key={ind} data={dt} />
                    ))
                }
            </div>
        </SellerDashboard>
    )
}

export default SellerItems