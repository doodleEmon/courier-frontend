"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer';
import { BiHome } from 'react-icons/bi';
import { IoCreateOutline } from 'react-icons/io5';
import { BsClipboard2Check } from 'react-icons/bs';
import { CgProfile, CgTrack } from 'react-icons/cg';

// Navigation data
const navigation = [
    { href: '/dashboard', label: 'Dashboard', icon: BiHome },
    { href: '/book-parcel', label: 'Book Parcel', icon: IoCreateOutline },
    { href: '/my-bookings', label: 'My Bookings', icon: BsClipboard2Check },
    { href: '/tracking', label: 'Track Parcel', icon: CgTrack },
    { href: '/profile', label: 'Profile', icon: CgProfile },
];

export default function CustomLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    // Function to check if a link is active
    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 h-auto bg-gradient-to-b from-blue-600 to-purple-600 text-white p-5">
                <nav className="flex flex-col gap-3">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const extraPadding = item.href === '/tracking' ? 'px-[10px]' : 'px-3';

                        return (
                            <Link
                                key={item.href}
                                className={`flex items-center ${extraPadding} py-1 rounded gap-x-2 ${active ? 'bg-white text-blue-600' : 'hover:bg-blue-500'}`}
                                href={item.href}
                            >
                                <Icon size={item.href === '/tracking' ? 24 : 20} /> {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100">
                <div className='p-6'>
                    {children}
                </div>
                {/* <Footer /> */}
            </main>
        </div>
    )
};