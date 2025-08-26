import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/slices/auth/authSlice'
import customerReducer from "@/redux/slices/customer/customerSlice"
import adminReducer from "@/redux/slices/admin/adminSlice"
import agentReducer from "@/redux/slices/agent/agentSlice"

export const store = configureStore({
    reducer: {
        auth: usersReducer,
        customer: customerReducer,
        admin: adminReducer,
        agent: agentReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch