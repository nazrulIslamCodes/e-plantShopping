import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer, // Associate cartReducer with the "cart" slice of state
    },
});

export default store;
