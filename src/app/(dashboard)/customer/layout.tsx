"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import CustomLayout from "@/components/common/CustomLayout";
import Header from "@/components/common/Header";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

export default function CustomerDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ReduxProvider>
            <AuthGuard allowedRoles={["Customer"]}>
                <div className="h-screen flex flex-col">
                    <Header />
                    <div className="flex-1 overflow-hidden">
                        <CustomLayout>
                            {children}
                        </CustomLayout>
                    </div>
                </div>
                <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
            </AuthGuard>
        </ReduxProvider>
    )
}