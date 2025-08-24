import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '@/redux/slices/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch