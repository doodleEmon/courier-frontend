import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/slices/auth/authSlice'
import customerReducer from "@/redux/slices/customer/customerSlice"

export const store = configureStore({
    reducer: {
        auth: usersReducer,
        customer: customerReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch