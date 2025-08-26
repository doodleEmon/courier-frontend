'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchAdminParcels, assignAgent, updateParcelStatus, fetchAdminUsers } from '@/redux/actions/admin/adminActions';
import { Parcel, User } from '@/types/type';
import toast from 'react-hot-toast';

export default function AdminParcels() {
  const dispatch = useDispatch<AppDispatch>();
  const { parcels, loading, error } = useSelector((state: RootState) => state.admin);
  const { users } = useSelector((state: RootState) => state.admin);

  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<{ [key: string]: Parcel['status'] }>({});

  useEffect(() => {
    dispatch(fetchAdminParcels());
    dispatch(fetchAdminUsers({ role: 'Agent' }));
  }, [dispatch]);

  const handleAssignAgent = (parcelId: string) => {
    if (selectedAgentId) {
      dispatch(assignAgent({ parcelId, agentId: selectedAgentId }))
        .unwrap()
        .then(() => {
          toast.success("Agent assigned successfully!");
          setSelectedAgentId(null);
        })
        .catch((err) => {
          toast.error(err.message || "Failed to assign agent");
        });
    } else {
      toast.error("Please select an agent.");
    }
  };

  const handleStatusChange = (parcelId: string) => {
    const status = statusMap[parcelId];
    if (status) {
      dispatch(updateParcelStatus({ parcelId, status }))
        .unwrap()
        .then(() => {
          toast.success("Parcel status updated successfully!");
        })
        .catch((err) => {
          toast.error(err.message || "Failed to update parcel status");
        });
    } else {
      toast.error("Please select a status.");
    }
  };

  const handleStatusSelectChange = (parcelId: string, status: Parcel['status']) => {
    setStatusMap(prev => ({ ...prev, [parcelId]: status }));
  };

  if (loading) return <p>Loading parcels...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const agents = users.filter(user => user.role === 'Agent');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Parcels</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Agent</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Update Status</th>
              <th className="px-6 py-3">Assign Agent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                        hover:bg-blue-50 transition-colors duration-200`}
              >
                <td className="px-6 py-4 font-medium">{parcel._id}</td>
                <td className="px-6 py-4">{(parcel.customerId as User)?.name || 'N/A'}</td>
                <td className="px-6 py-4">{(parcel.agentId as User)?.name || 'Unassigned'}</td>

                {/* Current Status */}
                <td className="px-6 py-4">{parcel.status}</td>

                {/* Update Status */}
                <td className="px-6 py-4">
                  <select
                    value={statusMap[parcel._id] || parcel.status}
                    onChange={(e) => handleStatusSelectChange(parcel._id, e.target.value as Parcel['status'])}
                    className="border rounded p-1 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Picked Up">Picked Up</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <button
                    onClick={() => handleStatusChange(parcel._id)}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                  >
                    Update
                  </button>
                </td>

                {/* Assign Agent */}
                <td className="px-6 py-4">
                  <select
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="border rounded p-1 cursor-pointer"
                  >
                    <option value="">Select Agent</option>
                    {agents.map(agent => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssignAgent(parcel._id)}
                    className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}