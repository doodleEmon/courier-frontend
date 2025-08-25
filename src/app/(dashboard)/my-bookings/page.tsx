"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCustomerParcels } from "@/redux/actions/parcel/parcelActions";
import { Parcel } from "@/types/type";

export default function MyBookings() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { parcels, loading, error } = useSelector((state: RootState) => state.parcel);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if the click is outside all dropdown elements
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(fetchCustomerParcels());
  }, [dispatch]);

  if (loading) return <p>Loading parcels...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleEdit = (parcel: Parcel) => {
    // Your edit logic here
    console.log('Edit parcel:', parcel);
    setActiveDropdown(null);
  };

  const handleCancel = (parcelId: String) => {
    // Your cancel logic here
    console.log('Cancel parcel:', parcelId);
    setActiveDropdown(null);
  };

  const toggleDropdown = (e: React.MouseEvent, parcelId: string) => {
    e.stopPropagation();

    if (activeDropdown === parcelId) {
      setActiveDropdown(null);
      setDropdownPosition(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      setDropdownPosition({
        top: rect.bottom + scrollTop,
        left: rect.right + scrollLeft - 128 // 128px is the width of dropdown (w-32)
      });
      setActiveDropdown(parcelId);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Pickup Address</th>
              <th className="px-6 py-3">Delivery Address</th>
              <th className="px-6 py-3">Booked Date</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="px-6 py-4 font-medium">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                ${parcel.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : parcel.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : parcel.status === "In Transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }`}
                  >
                    {parcel.status}
                  </span>
                </td>

                <td className="px-6 py-4">{parcel.parcelSize}</td>
                <td className="px-6 py-4">{parcel.parcelType}</td>
                <td className="px-6 py-4">{parcel.paymentType}</td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={parcel.pickupAddress}
                >
                  {parcel.pickupAddress}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={parcel.deliveryAddress}
                >
                  {parcel.deliveryAddress}
                </td>
                <td className="px-6 py-4">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 relative">
                  <div className="relative dropdown-container">
                    <button
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                      onClick={(e) => toggleDropdown(e, parcel._id)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Portal dropdown outside table */}
      {activeDropdown && dropdownPosition && (
        <div
          className="fixed w-32 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
            onClick={() => handleEdit(parcels.find(p => p._id === activeDropdown)!)}
          >
            Edit
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 cursor-pointer"
            onClick={() => handleCancel(activeDropdown)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}