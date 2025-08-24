"use client";

import { BASE_URL } from "@/constants";
import { useState } from "react";

export default function BookParcel() {
    const [form, setForm] = useState({
        pickupAddress: "",
        deliveryAddress: "",
        parcelType: "",
        size: "",
        paymentType: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`/${BASE_URL}/parcel`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Booking failed");
            const data = await res.json();

            setMessage("✅ Parcel booked successfully!");
            setForm({
                pickupAddress: "",
                deliveryAddress: "",
                parcelType: "",
                size: "",
                paymentType: "COD",
            });
        } catch (error: any) {
            setMessage("❌ " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-semibold mb-4">Book a Parcel</h1>

            {message && <p className="mb-4 text-sm">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                        name="size"
                        value={form.size}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="">Select size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Booking..." : "Book Parcel"}
                </button>
            </form>
        </div>
    );
}
