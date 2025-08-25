"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCustomerParcels } from "@/redux/actions/parcel/parcelActions";

export default function MyBookings() {
  const dispatch = useDispatch<AppDispatch>();
  const { parcels, loading, error } = useSelector((state: RootState) => state.parcel);

  useEffect(() => {
    dispatch(fetchCustomerParcels());
  }, [dispatch]);

  if (loading) return <p>Loading parcels...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <ul className="space-y-3">
        {parcels.map((parcel) => (
          <li key={parcel._id} className="p-4 bg-white shadow rounded">
            <p><strong>Status:</strong> {parcel.status}</p>
            <p><strong>Size:</strong> {parcel.parcelSize}</p>
            <p><strong>Payment:</strong> {parcel.paymentType}</p>
            <p><strong>Booked:</strong> {new Date(parcel.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
