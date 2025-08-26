'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getOptimizedDeliveryRoute } from '@/redux/actions/agent/agentActions';

export default function AgentTracking() {
    const dispatch = useDispatch<AppDispatch>();
    const { route, loading, error } = useSelector((state: RootState) => state.agent);

    useEffect(() => {
        dispatch(getOptimizedDeliveryRoute());
    }, [dispatch]);

    if (loading) return <p>Loading route...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Optimized Delivery Route</h1>
            {route ? (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold">Route Summary:</h2>
                    <p>{route.route.summary}</p>
                    <h2 className="text-lg font-semibold mt-4">Steps:</h2>
                    <ul>
                        {route.route.legs[0].steps.map((step: any, index: number) => (
                            <li key={index} dangerouslySetInnerHTML={{ __html: step.html_instructions }} />
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No optimized route available.</p>
            )}
        </div>
    );
}
