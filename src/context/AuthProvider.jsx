import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";


const getCartList = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:5000/get-user-cart", {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        })

        return await res.data.data;
    } catch (error) {
        return error;
    }
}

const AuthProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [isUser, setUser] = useState(false);

    const [cart, setCart] = useState([]);

    const addToCart = async (productId) => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/add-to-cart", {
                product: productId, quntity: 1
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            );

            setCart(res.data.data);
            window.alert("added to cart");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res.status === 401) {
                    window.alert("You are not login, Please login and try again")
                }
                else window.alert(res.data.error);
            }
            else window.alert("Server error, please try again later..")
        }
    }

    const clearCart = async () => {
        try {
            await axios.post("http://127.0.0.1:5000/clear-cart", {},
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            );

            setCart([]);
            window.alert("your cart is cleared");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res.status === 401) {
                    window.alert("You are not login, Please login and try again")
                }
                else window.alert(res.data.error);
            }
            else window.alert("Server error, please try again later..")
        }
    }

    const removeFromCart = async (id) => {
        try {
            const res = await axios.post("http://127.0.0.1:5000/remove-from-cart", {
                id: id,
            },
                {
                    headers: {
                        Authorization: localStorage.getItem("accessToken")
                    }
                }
            );

            setCart(res.data.data);
            window.alert("Product remove from cart");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const res = error.response;
                if (res.status === 401) {
                    window.alert("You are not login, Please login and try again")
                }
                else window.alert(res.data.error);
            }
            else window.alert("Server error, please try again later..")
        }
    }

    const getData = async () => {
        const data = await getCartList();
        setCart(data);
    }

    useEffect(() => {
        const chechLoogin = async () => {
            console.log("log");
            await setLogin(true);
            if (localStorage.getItem("user")) {
                setUser(true);
                await getData();
            }
            else setUser(false);
        }

        if (localStorage.getItem("accessToken")) {
            chechLoogin();
        }
        else setLogin(false);
    }, []);

    const login = () => setLogin(true);
    const logout = () => {
        setLogin(false);
        setUser(false);
        localStorage.clear();
        setCart([]);
    }

    return (
        <AuthContext.Provider value={{ isLogin, login, logout, isUser, setUser, addToCart, cart, clearCart, removeFromCart, setCart }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
