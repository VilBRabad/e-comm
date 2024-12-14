import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    list: [],
    isLoding: false,
    isError: false
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state
        }
    }
})