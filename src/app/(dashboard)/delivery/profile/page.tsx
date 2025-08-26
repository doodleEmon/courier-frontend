'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getAgentProfile } from '@/redux/actions/agent/agentActions';

export default function AgentProfile() {
    const dispatch = useDispatch<AppDispatch>();
    const { profile, loading, error } = useSelector((state: RootState) => state.agent);

    useEffect(() => {
        dispatch(getAgentProfile());
    }, [dispatch]);

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Agent Profile</h1>
            {profile && (
                <div className="bg-white p-4 rounded-lg shadow">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Role:</strong> {profile.role}</p>
                </div>
            )}
        </div>
    );
}
