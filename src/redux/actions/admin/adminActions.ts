import { BASE_URL } from '@/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Parcel, User } from '@/types/type';

// Fetch all parcels for admin
export const fetchAdminParcels = createAsyncThunk(
    'admin/fetchParcels',
    async (_, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/admin/parcels`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch admin parcels');
        }
    }
);

// Assign agent to parcel
export const assignAgent = createAsyncThunk(
    'admin/assignAgent',
    async ({ parcelId, agentId }: { parcelId: string; agentId: string }, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/admin/assign/${parcelId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ agentId }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to assign agent');
        }
    }
);

// Fetch all users for admin
export const fetchAdminUsers = createAsyncThunk(
    'admin/fetchUsers',
    async (params: { page?: number; limit?: number; role?: string; isActive?: boolean } = {}, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        const query = new URLSearchParams(params as any).toString();
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users?${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch admin users');
        }
    }
);

// Update user role
export const updateUserRole = createAsyncThunk(
    'admin/updateUserRole',
    async ({ userId, role }: { userId: string; role: User['role'] }, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update user role');
        }
    }
);

// Delete user
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId: string, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return userId; // Return the ID of the deleted user
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete user');
        }
    }
);

// Update parcel status
export const updateParcelStatus = createAsyncThunk(
    'admin/updateParcelStatus',
    async ({ parcelId, status }: { parcelId: string; status: Parcel['status'] }, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/admin/parcels/${parcelId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update parcel status');
        }
    }
);