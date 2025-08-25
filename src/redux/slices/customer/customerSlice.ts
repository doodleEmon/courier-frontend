import { createSlice } from "@reduxjs/toolkit";
import { cancelParcel, createParcel, fetchCustomerParcels, updateParcel } from "@/redux/actions/parcel/parcelActions";
import { ParcelState } from "@/types/type";

const initialState: ParcelState = {
    parcels: [],
    loading: false,
    error: null,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create Parcel
        builder.addCase(createParcel.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createParcel.fulfilled, (state, action) => {
            state.loading = false;
            state.parcels.push(action.payload);
        })
        builder.addCase(createParcel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Fetch Customer Parcels
        builder.addCase(fetchCustomerParcels.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCustomerParcels.fulfilled, (state, action) => {
            state.loading = false;
            state.parcels = action.payload;
        })
        builder.addCase(fetchCustomerParcels.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Edit Customer Parcels
        builder.addCase(updateParcel.fulfilled, (state, action) => {
            const idx = state.parcels.findIndex((p) => p._id === action.payload._id);
            if (idx !== -1) state.parcels[idx] = action.payload;
        })

        // Delete Customer Parcels
        builder.addCase(cancelParcel.fulfilled, (state, action) => {
            state.parcels = state.parcels.filter((p) => p._id !== action.payload);
        });
    },
});

export default customerSlice.reducer;
