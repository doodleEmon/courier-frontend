'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAgentParcels, updateParcelStatus } from '@/redux/actions/agent/agentActions';
import { Parcel, User } from '@/types/type';
import toast from 'react-hot-toast';

export default function AgentParcels() {
    const dispatch = useDispatch<AppDispatch>();
    const { parcels, loading, error } = useSelector((state: RootState) => state.agent);
    const [statusMap, setStatusMap] = useState<{ [key: string]: Parcel['status'] }>({});

    useEffect(() => {
        dispatch(getAgentParcels());
    }, [dispatch]);

    const handleStatusChange = (parcelId: string) => {
        const status = statusMap[parcelId];
        if (status) {
            // For simplicity, not getting actual lat/long here. In a real app, you'd use geolocation.
            dispatch(updateParcelStatus({ parcelId, status, latitude: 0, longitude: 0 }))
                .unwrap()
                .then(() => {
                    toast.success("Parcel status updated successfully!");
                })
                .catch((err) => {
                    toast.error(err.message || "Failed to update parcel status");
                });
        } else {
            toast.error("Please select a status.");
        }
    };

    const handleStatusSelectChange = (parcelId: string, status: Parcel['status']) => {
        setStatusMap(prev => ({ ...prev, [parcelId]: status }));
    };

    if (loading) return <p>Loading parcels...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-green-500 to-teal-600 text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Pickup Address</th>
                            <th className="px-6 py-3">Delivery Address</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {parcels.map((parcel, index) => (
                            <tr
                                key={parcel._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    hover:bg-green-50 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 font-medium">{parcel._id}</td>
                                <td className="px-6 py-4">{(parcel.customerId as User)?.name || 'N/A'}</td>
                                <td className="px-6 py-4">{parcel.pickupAddress}</td>
                                <td className="px-6 py-4">{parcel.deliveryAddress}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={statusMap[parcel._id] || parcel.status}
                                        onChange={(e) => handleStatusSelectChange(parcel._id, e.target.value as Parcel['status'])}
                                        className="border rounded p-1 cursor-pointer"
                                    >
                                        <option value="">Update Status</option>
                                        <option value="Picked Up">Picked Up</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleStatusChange(parcel._id)}
                                        className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                                    >
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
