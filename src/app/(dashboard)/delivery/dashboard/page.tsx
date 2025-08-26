'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAgentParcels } from '@/redux/actions/agent/agentActions';

export default function AgentDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { parcels, loading, error } = useSelector((state: RootState) => state.agent);

    useEffect(() => {
        dispatch(getAgentParcels());
    }, [dispatch]);

    const pendingParcels = parcels.filter(p => p.status === 'Pending').length;
    const pickedUpParcels = parcels.filter(p => p.status === 'Picked Up').length;
    const inTransitParcels = parcels.filter(p => p.status === 'In Transit').length;
    const deliveredParcels = parcels.filter(p => p.status === 'Delivered').length;

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Agent Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Total Parcels</h2>
                    <p className="text-3xl font-bold">{parcels.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Pending Parcels</h2>
                    <p className="text-3xl font-bold">{pendingParcels}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Picked Up Parcels</h2>
                    <p className="text-3xl font-bold">{pickedUpParcels}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">In Transit Parcels</h2>
                    <p className="text-3xl font-bold">{inTransitParcels}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Delivered Parcels</h2>
                    <p className="text-3xl font-bold">{deliveredParcels}</p>
                </div>
            </div>
        </div>
    );
}
