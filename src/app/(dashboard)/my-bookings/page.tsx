"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCustomerParcels } from "@/redux/actions/parcel/parcelActions";
import { Parcel } from "@/types/type";
import { TbListDetails } from "react-icons/tb";
import { BiEdit, BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";

export default function MyBookings() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Parcel> | null>(null);

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

  const handleCancel = (parcelId: string | null) => {
    // Your cancel logic here
    console.log('Cancel parcel:', parcelId);
    setActiveDropdown(null);
  };

  const handleDetails = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setShowModal(true);
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
        left: rect.right + scrollLeft - 128
      });
      setActiveDropdown(parcelId);
    }
  };

  const handleEdit = (parcel: Parcel) => {
    setEditForm(parcel);
    setShowEditModal(true);
    setActiveDropdown(null);
    setShowModal(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Dispatch update action here
    // dispatch(updateParcel(editForm))
    toast.success("Booking updated!");
    setShowEditModal(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Recipient</th>
              <th className="px-6 py-3">Payment</th>
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
                <td className="px-6 py-4">{parcel.recipientName}</td>
                <td className="px-6 py-4">{parcel.paymentType}</td>
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

      {activeDropdown && dropdownPosition && (
        <div
          className="fixed w-auto bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`
          }}
        >
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 cursor-pointer"
            onClick={() => handleDetails(parcels.find(p => p._id === activeDropdown)!)}
          >
            <span className="flex items-center gap-x-2"><TbListDetails /> Booking Details</span>
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
            onClick={() => handleEdit(parcels.find(p => p._id === activeDropdown)!)}
          >
            <span className="flex items-center gap-x-2"><BiEdit />  Edit Booking</span>
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 cursor-pointer"
            onClick={() => handleCancel(activeDropdown)}
          >
            <span className="flex items-center gap-x-2"><BiTrash /> Cancel Booking</span>
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white relative">
              <h3 className="text-xl font-bold">Edit Booking</h3>
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:rotate-90 cursor-pointer"
                onClick={() => setShowEditModal(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 max-h-[calc(90vh-100px)] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium">Recipient Name</label>
                <input
                  type="text"
                  name="recipientName"
                  value={editForm.recipientName || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Recipient Phone</label>
                <input
                  type="text"
                  name="recipientPhone"
                  value={editForm.recipientPhone || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Pickup Address</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={editForm.pickupAddress || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={editForm.deliveryAddress || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Parcel Type</label>
                <input
                  type="text"
                  name="parcelType"
                  value={editForm.parcelType || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Size</label>
                <select
                  name="parcelSize"
                  value={editForm.parcelSize || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select size</option>
                  <option value="Small">Small (0.5 - 1 kg)</option>
                  <option value="Medium">Medium (2 - 3 kg)</option>
                  <option value="Large">Large (4 - more)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Payment Type</label>
                <select
                  name="paymentType"
                  value={editForm.paymentType || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select payment</option>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Prepaid">Prepaid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={editForm.description || ""}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-5 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Details */}
      {showModal && selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-white relative">
              <h3 className="text-xl font-bold">Parcel Details</h3>
              <p className="text-blue-100 text-sm mt-1">Booking ID: #{selectedParcel._id}</p>
              <button
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all duration-200 hover:rotate-90 cursor-pointer"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* Status Badge */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${selectedParcel.status === "Delivered"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : selectedParcel.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : selectedParcel.status === "In Transit"
                      ? "bg-blue-100 text-blue-800 border border-blue-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${selectedParcel.status === "Delivered"
                    ? "bg-green-500"
                    : selectedParcel.status === "Pending"
                      ? "bg-yellow-500"
                      : selectedParcel.status === "In Transit"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}></div>
                  {selectedParcel.status}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parcel Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Parcel Information</h4>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Size & Type</p>
                        <p className="font-medium text-gray-900">{selectedParcel.parcelSize} • {selectedParcel.parcelType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium text-gray-900">{selectedParcel.paymentType}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="font-medium text-gray-900">{selectedParcel.description || "No description"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recipient & Addresses */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Delivery Details</h4>

                  <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mt-1">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Recipient</p>
                        <p className="font-medium text-gray-900">{selectedParcel.recipientName}</p>
                        <p className="text-sm text-gray-500">{selectedParcel.recipientPhone}</p>
                      </div>
                    </div>

                    <div className="border-l-2 border-dashed border-gray-300 ml-4 pl-4 space-y-3">
                      <div className="relative">
                        <div className="absolute -left-6 w-3 h-3 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-gray-600 font-medium">Pickup Address</p>
                        <p className="text-gray-900 text-sm leading-relaxed">{selectedParcel.pickupAddress}</p>
                      </div>

                      <div className="relative">
                        <div className="absolute -left-6 w-3 h-3 bg-red-500 rounded-full"></div>
                        <p className="text-sm text-gray-600 font-medium">Delivery Address</p>
                        <p className="text-gray-900 text-sm leading-relaxed">{selectedParcel.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Date */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m6 0a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2m0 0V9a2 2 0 012-2h8a2 2 0 012 2v2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booked On</p>
                    <p className="font-semibold text-gray-900">{new Date(selectedParcel.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                className="px-6 py-2.5 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                onClick={() => handleEdit(selectedParcel)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Booking
              </button>

              <button
                className="px-6 py-2.5 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                onClick={() => handleCancel(selectedParcel._id)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}