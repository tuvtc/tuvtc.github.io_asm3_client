import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';

const initialState = {
    isLoading: false,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_CART: (state, action) => {
            const newItem = action.payload
            const foundItemIndex = state.items.findIndex(item => (item._id === newItem._id))
            const newItems = [...state.items]
            if (foundItemIndex !== -1) {
                newItems[foundItemIndex].quantity += newItem.quantity
            } else {
                newItems.push(newItem)
            }
            state.items = newItems
            const cookies = new Cookies();
            cookies.set('cartItems', newItems, { path: '/' })
        },
        UPDATE_CART: (state, action) => {
            const { newItem, isIncrease } = action.payload
            const foundItemIndex = state.items.findIndex(item => (item._id === newItem._id))
            const newItems = [...state.items]
            if (foundItemIndex !== -1) {
                newItems[foundItemIndex].quantity += isIncrease ? 1 : -1
            }
            state.items = newItems
            const cookies = new Cookies();
            cookies.set('cartItems', newItems, { path: '/' })
        },
        DELETE_CART: (state, action) => {
            const newItem = action.payload
            let newItems = state.items.filter(item => {
                return (item._id !== newItem._id)
            })
            state.items = newItems
            const cookies = new Cookies();
            cookies.set('cartItems', newItems, { path: '/' })
        },
        RESET_CART: (state) => {
            state.items = initialState.items
            const cookies = new Cookies();
            cookies.set('cartItems', initialState.items, { path: '/' })
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice.reducer