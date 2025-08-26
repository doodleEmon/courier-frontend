
import { createSlice } from '@reduxjs/toolkit';
import { getAgentParcels, updateParcelStatus, getAgentProfile, getOptimizedDeliveryRoute } from '@/redux/actions/agent/agentActions';
import { Parcel, User } from '@/types/type';

interface AgentState {
    parcels: Parcel[];
    profile: User | null;
    route: any | null; // Adjust the type based on the actual route data structure
    loading: boolean;
    error: string | null;
}

const initialState: AgentState = {
    parcels: [],
    profile: null,
    route: null,
    loading: false,
    error: null,
};

const agentSlice = createSlice({
    name: 'agent',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Agent Parcels
            .addCase(getAgentParcels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgentParcels.fulfilled, (state, action) => {
                state.loading = false;
                state.parcels = action.payload.map((parcel: Parcel) => ({
                    ...parcel,
                    trackingHistory: parcel.trackingHistory || [],
                }));
            })
            .addCase(getAgentParcels.rejected, (state, action) => {
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
                const index = state.parcels.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    const existingParcel = state.parcels[index];
                    state.parcels[index] = {
                        ...action.payload,
                        customerId: existingParcel.customerId,
                        agentId: existingParcel.agentId,
                        trackingHistory: action.payload.trackingHistory || [],
                    };
                }
            })
            .addCase(updateParcelStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get Agent Profile
            .addCase(getAgentProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAgentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(getAgentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Get Optimized Delivery Route
            .addCase(getOptimizedDeliveryRoute.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOptimizedDeliveryRoute.fulfilled, (state, action) => {
                state.loading = false;
                state.route = action.payload;
            })
            .addCase(getOptimizedDeliveryRoute.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default agentSlice.reducer;
