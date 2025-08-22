'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { BiLeftArrow, BiLeftArrowAlt } from 'react-icons/bi'

const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: '',
    dateOfBirth: '',
    gender: '',
    role: 'Customer',
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const phoneRegex = /^(\+88)?01[3-9]\d{8}$/

export default function Register() {
    const [form, setForm] = useState(initialState)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = e.target as any
        if (type === 'file' && files.length) {
            const file = files[0]
            setForm({ ...form, avatar: file })
            setAvatarPreview(URL.createObjectURL(file))
        } else {
            setForm({ ...form, [name]: value })
        }
    }

    const validate = () => {
        const newErrors: { [key: string]: string } = {}
        if (!form.name.trim()) newErrors.name = 'Please add a name'
        if (!form.email) newErrors.email = 'Please add an email'
        else if (!emailRegex.test(form.email)) newErrors.email = 'Please add a valid email'
        if (!form.phone) newErrors.phone = 'Phone number is required'
        else if (!phoneRegex.test(form.phone)) newErrors.phone = 'Please enter a valid Bangladeshi phone number'
        if (!form.password) newErrors.password = 'Please add a password'
        else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (form.gender && !['male', 'female', 'other'].includes(form.gender)) newErrors.gender = 'Invalid gender'
        if (form.role && !['Customer', 'Agent', 'Admin'].includes(form.role)) newErrors.role = 'Invalid role'
        return newErrors
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            // Submit logic here
            alert('Registration successful!\n' + JSON.stringify(form, null, 2))
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative p-5">
            <Link
                href="/"
                className="fixed left-4 top-4 px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center gap-x-1"
            >
                <BiLeftArrowAlt /> Back
            </Link>
            <form
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        placeholder="+8801XXXXXXXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        required
                        minLength={8}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Avatar</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full"
                    />
                    {avatarPreview && (
                        <img src={avatarPreview} alt="Avatar Preview" className="mt-2 w-16 h-16 rounded-full object-cover" />
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={form.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="Customer">Customer</option>
                        <option value="Agent">Agent</option>
                        <option value="Admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>
                <div className="text-center text-sm mt-2">
                    <span>Already have an account? </span>
                    <a href="/login" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </div>
            </form>
        </div>
    )
}