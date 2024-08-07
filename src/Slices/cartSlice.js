import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalItems: 0,
    totalAmount: 0,
    deliveryCharge: 1000
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers:  {
        addToCart: (state, action)=> {
            const tempItem = state.cartItems.find(item => item._id === action.payload._id);
            console.log("tempItem",tempItem)
            if(tempItem){
                state.cartItems = state.cartItems.map(item => {
                    if(item._id === action.payload._id){
                        const newQty = item.quantity + action.payload.quantity;
                        const newTotalPrice = newQty * item.price;
                        return { ...item, quantity: newQty, totalPrice: newTotalPrice };
                    } else {
                        return item;
                    }
                });
            } else {
                console.log("actionpayload",action.payload)
                state.cartItems.push(action.payload);
            }
        },
        removeFromCart: (state, action)=> {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        },
        incrementQuantity: (state, action) => {

            const { id } = action.payload;
            console.log("id",action.payload)
            const itemIndex = state.cartItems.findIndex(item => item._id === id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity += 1;
                state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].quantity * state.cartItems[itemIndex].price;
            }
        },
        decrementQuantity: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item._id === id);
            if (itemIndex !== -1) {
                state.cartItems[itemIndex].quantity -= 1;
                if (state.cartItems[itemIndex].quantity === 0) {
                    state.cartItems.splice(itemIndex, 1);
                } else {
                    state.cartItems[itemIndex].totalPrice = state.cartItems[itemIndex].quantity * state.cartItems[itemIndex].price;
                }
            }
        },
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
