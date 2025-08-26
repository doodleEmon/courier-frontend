import { BASE_URL } from "@/constants";
import { Parcel } from "@/types/type";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk: Create a new parcel
export const createParcel = createAsyncThunk(
    "parcel/create",
    async (parcelData: {
        pickupAddress: string, deliveryAddress: string, parcelType: string, parcelSize: string, paymentType: string, recipientName: string,
        recipientPhone: string,
        description: string
    }, { rejectWithValue }) => {

        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/customer/parcels/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(parcelData),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Something went wrong");
        }
    }
);

// ✅ Thunk: Fetch all parcels of the customer
export const fetchCustomerParcels = createAsyncThunk(
    "parcel/fetchCustomer",
    async (_, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/customer/parcels`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch parcels");
        }
    }
);

// ✅ Thunk: Edit a booking parcel
export const updateParcel = createAsyncThunk(
    "parcel/editParcel",
    async ({ id, updates }: { id: string; updates: Partial<Parcel> }, { rejectWithValue }) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/customer/parcels/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updates),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (err: any) {
            return rejectWithValue(err.message || "Something went wrong");
        }
    }
);

// ✅ Cancel booking
export const cancelParcel = createAsyncThunk(
    "parcels/cancelParcel",
    async (id: string, thunkAPI) => {
        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const res = await fetch(`${BASE_URL}/api/customer/parcels/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Cancel failed");
        }
    }
);