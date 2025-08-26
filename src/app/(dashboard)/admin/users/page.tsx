"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAdminUsers, updateUserRole, deleteUser } from "@/redux/actions/admin/adminActions";
import { User } from "@/types/type";
import toast from "react-hot-toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function AdminUsers() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading, error, usersPagination } = useSelector((state: RootState) => state.admin);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchAdminUsers({ limit: 5 }));
    }, [dispatch]);

    const handleRoleChange = (userId: string, newRole: User['role']) => {
        dispatch(updateUserRole({ userId, role: newRole }))
            .unwrap()
            .then(() => {
                toast.success("User role updated successfully!");
            })
            .catch((err) => {
                toast.error(err.message || "Failed to update user role");
            });
    };

    const openDeleteModal = (userId: string) => {
        setSelectedUserId(userId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedUserId) {
            dispatch(deleteUser(selectedUserId))
                .unwrap()
                .then(() => {
                    toast.success("User deleted successfully!");
                    setIsDeleteModalOpen(false);
                    setSelectedUserId(null);
                })
                .catch((err) => {
                    toast.error(err.message || "Failed to delete user");
                    setIsDeleteModalOpen(false);
                    setSelectedUserId(null);
                });
        }
    };

    if (loading) return <p>Loading users...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white uppercase text-xs tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    hover:bg-blue-50 transition-colors duration-200`}
                            >
                                <td className="px-6 py-4 font-medium">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value as User['role'])}
                                        className="border rounded p-1 cursor-pointer"
                                    >
                                        <option value="Customer">Customer</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => openDeleteModal(user._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {usersPagination && (
                <div className="mt-4 flex justify-between items-center">
                    <span>Page {usersPagination.page} of {usersPagination.pages}</span>
                    <div>
                        <button
                            onClick={() => dispatch(fetchAdminUsers({ page: usersPagination.page - 1, limit: 5 }))}
                            disabled={usersPagination.page <= 1}
                            className="bg-gray-300 px-3 py-1 rounded mr-2 cursor-pointer"
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => dispatch(fetchAdminUsers({ page: usersPagination.page + 1, limit: 5 }))}
                            disabled={usersPagination.page >= usersPagination.pages}
                            className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Confirm Deletion"
                description="Are you sure you want to delete this user? This action cannot be undone."
                onConfirm={handleDeleteConfirm}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
        </div>
    );
}