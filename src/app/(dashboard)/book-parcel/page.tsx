"use client";

import { BASE_URL } from "@/constants";
import { createParcel } from "@/redux/actions/parcel/parcelActions";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const initialState = {
    pickupAddress: "",
    deliveryAddress: "",
    parcelType: "",
    parcelSize: "",
    paymentType: "",
    recipientName: "",
    recipientPhone: "",
    description: ""
}

export default function BookParcel() {
    const [form, setForm] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        dispatch(createParcel(form))
            .unwrap()
            .then(() => {
                toast.success("Parcel booking successful!");
                setTimeout(() => {
                    router.push("/my-bookings");
                }, 1000);
            })
            .catch((err) => {
                toast.error(err.message || "Parcel booking failed");
            });
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Book a Parcel</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Recipient Name</label>
                    <input
                        type="text"
                        name="recipientName"
                        value={form.recipientName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Recipient Phone</label>
                    <input
                        type="text"
                        name="recipientPhone"
                        value={form.recipientPhone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Pickup Address</label>
                    <input
                        type="text"
                        name="pickupAddress"
                        value={form.pickupAddress}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Delivery Address</label>
                    <input
                        type="text"
                        name="deliveryAddress"
                        value={form.deliveryAddress}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Parcel Type</label>
                    <input
                        type="text"
                        name="parcelType"
                        value={form.parcelType}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        placeholder="e.g. Documents, Electronics"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Size</label>
                    <select
                        name="parcelSize"
                        value={form.parcelSize}
                        onChange={handleChange}
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
                        value={form.paymentType}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="COD">Cash on Delivery</option>
                        <option value="Prepaid">Prepaid</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                >
                    {loading ? "Booking..." : "Book Parcel"}
                </button>
            </form>
        </div>
    );
}
