"use client"

import { logout } from '@/redux/slices/auth/authSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { AuthResponse } from '@/types/type';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const [isSticky, setIsSticky] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user as AuthResponse | null);

    const handleLogout = () => {
        dispatch(logout())
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY < lastScrollY && currentScrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <header className={`${isSticky ? 'sticky top-0 z-50 transition-all duration-300 ease-in-out' : 'sticky -top-20 transition-all duration-300 ease-in-out'} bg-white shadow-md transition-all duration-300`}>
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600 tracking-tight">
                        Courier<span className="text-gray-800">Xpress</span>
                    </span>
                </Link>
                {/* Navigation */}
                <div className="hidden md:flex gap-6 items-center">
                    {user && user.role === 'Admin' && (
                        <>
                            <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Dashboard
                            </Link>
                            <Link href="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Users
                            </Link>
                            <Link href="/admin/parcels" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Parcels
                            </Link>
                        </>
                    )}
                    {user && user.role === 'Agent' && (
                        <>
                            <Link href="/delivery/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Dashboard
                            </Link>
                            <Link href="/delivery/parcels" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Parcels
                            </Link>
                        </>
                    )}
                    {user && user.role === 'Customer' && (
                        <>
                            <Link href="/customer/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Dashboard
                            </Link>
                            <Link href="/customer/book-parcel" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Book Parcel
                            </Link>
                            <Link href="/customer/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                My Bookings
                            </Link>
                            <Link href="/customer/tracking" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Track Parcel
                            </Link>
                        </>
                    )}
                </div>
                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <span className="text-gray-700 font-medium">
                                Hi, {user.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 rounded-md border border-red-600 text-red-600 font-semibold hover:bg-red-50 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/customer/book-parcel" className="text-gray-700 hover:text-blue-600 font-medium transition">
                                Book Parcel
                            </Link>
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    {/* You can add a hamburger menu here for mobile */}
                    <button className="p-2 rounded hover:bg-gray-100">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}