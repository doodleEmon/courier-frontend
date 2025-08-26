"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import DeliveryLayout from "@/components/common/DeliveryLayout";
import Header from "@/components/common/Header";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function DeliveryDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <AuthGuard allowedRoles={["Agent"]}>
                <div className="h-screen flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-hidden">
                        <DeliveryLayout>
                            {children}
                        </DeliveryLayout>
                    </div>
                </div>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            </AuthGuard>
        </ReduxProvider>
    )
}