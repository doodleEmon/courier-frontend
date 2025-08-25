import { createSlice } from "@reduxjs/toolkit";
import { createParcel, fetchCustomerParcels } from "@/redux/actions/parcel/parcelActions";
import { ParcelState } from "@/types/type";

const initialState: ParcelState = {
  parcels: [],
  loading: false,
  error: null,
};

const parcelSlice = createSlice({
  name: "parcel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Parcel
    builder.addCase(createParcel.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createParcel.fulfilled, (state, action) => {
      state.loading = false;
      state.parcels.push(action.payload);
    });
    builder.addCase(createParcel.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch Customer Parcels
    builder.addCase(fetchCustomerParcels.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerParcels.fulfilled, (state, action) => {
      state.loading = false;
      state.parcels = action.payload;
    });
    builder.addCase(fetchCustomerParcels.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default parcelSlice.reducer;
