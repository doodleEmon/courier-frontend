import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/slices/auth/authSlice'
import parcelReducer from "@/redux/slices/parcel/parcelSlice"

export const store = configureStore({
    reducer: {
        auth: usersReducer,
        parcel: parcelReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch