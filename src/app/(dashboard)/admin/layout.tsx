"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import AdminLayout from "@/components/common/AdminLayout";
import Header from "@/components/common/Header";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function AdminDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <AuthGuard allowedRoles={["Admin"]}>
                <div className="h-screen flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-hidden">
                        <AdminLayout>
                            {children}
                        </AdminLayout>
                    </div>
                </div>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            </AuthGuard>
        </ReduxProvider>
    )
}