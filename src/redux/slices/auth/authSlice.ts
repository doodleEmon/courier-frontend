// src/redux/features/auth/authSlice.ts
import { loginUser, registerUser } from '@/redux/actions/auth/authActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user object
interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Delivery Agent' | 'Customer';
}

// Define a type for the slice state, including loading and error
interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: any;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // This reducer can be used to manually set user data if needed
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
            state.error = null;
        },
    },
    // Use extraReducers to handle actions from createAsyncThunk
    extraReducers: (builder) => {
        builder
            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user; // Adjust based on your API response structure
                state.token = action.payload.data.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // This is the payload from rejectWithValue
            })
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                // You might want to automatically log in the user upon successful registration
                state.user = action.payload.data.user;
                state.token = action.payload.data.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;