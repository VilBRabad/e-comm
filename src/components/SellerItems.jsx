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


    const removeItem = async (id) => {
        try {
            await axios.post("http://127.0.0.1:5000/remove-item-from-list",
                {
                    productId: id
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            )
            window.alert("Remove from list");
            getData();
        } catch (error) {
            window.alert("Something wen wrong..");
        }
    }


    return (
        <SellerDashboard>
            <div className='mt-6 flex gap-5 flex-wrap'>
                {
                    data && data.map((dt, ind) => (
                        <Items key={ind} data={dt} removeItem={removeItem} />
                    ))
                }
            </div>
        </SellerDashboard>
    )
}

export default SellerItems