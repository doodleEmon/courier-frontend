"use client"

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAdminParcels, fetchAdminUsers } from "@/redux/actions/admin/adminActions";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { parcels, loading, error, usersPagination } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        dispatch(fetchAdminParcels());
                dispatch(fetchAdminUsers({}));
    }, [dispatch]);

    if (loading) return <p>Loading admin data...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Users</h2>
                    <p className="text-3xl">{usersPagination?.total || 0}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Total Parcels</h2>
                    <p className="text-3xl">{parcels.length}</p>
                </div>
                {/* Add more summary stats as needed */}
            </div>
        </div>
    );
}
