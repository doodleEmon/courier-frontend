'use client'

import { loginUser } from '@/redux/actions/auth/authActions'
import { AppDispatch } from '@/redux/store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

const initialState = {
  email: '',
  password: ''
}

export default function Login() {
  const [form, setForm] = useState(initialState)
  const [error, setError] = useState('')
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please enter both email and password')
      return
    }

    dispatch(loginUser(form))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.message || "Login failed");
      });
    ;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <Link
        href="/"
        className="fixed left-4 top-4 px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition flex items-center gap-x-1"
      >
        <BiLeftArrowAlt /> Back
      </Link>

      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
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
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
        <div className="text-center text-sm mt-2">
          <span>Don't have an account? </span>
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}