"use client"

import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Dashboard() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <div>
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-semibold">Welcome <span className='text-2xl text-blue-600'>{user?.name || "Customer"}!</span></h1>
            </header>
            This is dashboard
        </div>
    )
}
