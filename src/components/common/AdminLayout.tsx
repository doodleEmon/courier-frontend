"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { BiHome } from 'react-icons/bi';
import { BsClipboard2Check } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoCreateOutline } from 'react-icons/io5';

// Navigation data
const navigation = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BiHome },
    { href: '/admin/users', label: 'Users', icon: IoCreateOutline },
    { href: '/admin/parcels', label: 'Parcels', icon: BsClipboard2Check },
    { href: '/admin/profile', label: 'Profile', icon: CgProfile },
];

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    // Function to check if a link is active
    const isActive = (href: string) => {
        if (href === '/admin/dashboard') {
            return pathname === '/admin/dashboard';
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-blue-600 to-purple-600 text-white p-5 flex-shrink-0">
                <nav className="flex flex-col gap-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        const extraPadding = 'px-3';
                        return (
                            <Link
                                key={item.href}
                                className={`flex items-center ${extraPadding} py-2 rounded-lg gap-x-3 transition-all duration-200 ${active
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'hover:bg-blue-500 hover:bg-opacity-50'
                                    }`}
                                href={item.href}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 overflow-auto">
                <div className="h-full p-6">
                    {children}
                </div>
                {/* <Footer /> */}
            </main>
        </div>
    )
};