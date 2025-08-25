"use client";

import { ConfirmModalProps } from "@/types/type";

export default function ConfirmModal({
    isOpen,
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    onCancel,
}: ConfirmModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-6">
                    {description}
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                        No, Keep It
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
                    >
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
