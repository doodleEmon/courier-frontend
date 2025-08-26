import { createSlice } from '@reduxjs/toolkit';
import { fetchAdminParcels, assignAgent, fetchAdminUsers, updateUserRole, deleteUser, updateParcelStatus } from '@/redux/actions/admin/adminActions';
import { Parcel, User } from '@/types/type';

interface AdminState {
    parcels: Parcel[];
    users: User[];
    loading: boolean;
    error: string | null;
    usersPagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    } | null;
}

const initialState: AdminState = {
    parcels: [],
    users: [],
    loading: false,
    error: null,
    usersPagination: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Admin Parcels
            .addCase(fetchAdminParcels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminParcels.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = action.payload;
            })
            .addCase(fetchAdminParcels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Assign Agent
            .addCase(assignAgent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(assignAgent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.parcels.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.parcels[index] = action.payload;
                }
            })
            .addCase(assignAgent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Fetch Admin Users
            .addCase(fetchAdminUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
                state.usersPagination = action.payload.pagination;
            })
            .addCase(fetchAdminUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update User Role
            .addCase(updateUserRole.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserRole.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(u => u._id === action.payload.user._id);
                if (index !== -1) {
                    state.users[index] = action.payload.user;
                }
            })
            .addCase(updateUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Parcel Status
            .addCase(updateParcelStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateParcelStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.parcels.findIndex(p => p._id === action.payload.parcel._id);
                if (index !== -1) {
                    state.parcels[index] = action.payload.parcel;
                }
            })
            .addCase(updateParcelStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adminSlice.reducer;