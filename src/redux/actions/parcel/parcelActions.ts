import { BASE_URL } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Thunk: Create a new parcel
export const createParcel = createAsyncThunk(
    "parcel/create",
    async (parcelData: { pickupAddress: string, deliveryAddress: string, parcelType: string, parcelSize: string, paymentType: string }, { rejectWithValue }) => {

        let token;
        const user = localStorage.getItem("user");
        if (user) {
            token = JSON.parse(user).token;
        }
        try {
            const response = await fetch(`${BASE_URL}/parcel`, {
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
            const response = await fetch(`${BASE_URL}/parcel/customer`, {
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