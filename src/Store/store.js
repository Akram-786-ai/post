import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../store/authSlice"; // path must be correct!

const store = configureStore({
    reducer: {
        auth: authSlice,
    },
});

export default store;
