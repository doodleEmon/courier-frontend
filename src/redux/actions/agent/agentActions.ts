import { BASE_URL } from '@/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Parcel } from '@/types/type';

// Fetch all parcels for agent
export const getAgentParcels = createAsyncThunk(
    'agent/getParcels',
    async (_, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/agent/parcels`, {
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
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message || 'Failed to fetch agent parcels');
        }
    }
);

// Update parcel status
export const updateParcelStatus = createAsyncThunk(
    'agent/updateParcelStatus',
    async ({ parcelId, status, latitude, longitude }: { parcelId: string; status: Parcel['status']; latitude?: number; longitude?: number }, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/agent/parcels/${parcelId}/status`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status, latitude, longitude }),
                });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message || 'Failed to update parcel status');
        }
    }
);

// Fetch agent profile
export const getAgentProfile = createAsyncThunk(
    'agent/getProfile',
    async (_, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/agent/profile`, {
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
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message || 'Failed to fetch agent profile');
        }
    }
);

// Fetch optimized delivery route
export const getOptimizedDeliveryRoute = createAsyncThunk(
    'agent/getRoute',
    async (_, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/agent/route`, {
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
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message || 'Failed to fetch optimized route');
        }
    }
);