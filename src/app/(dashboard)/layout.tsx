import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/common/Header";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
import CustomLayout from "@/components/common/CustomLayout";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Dashboard",
    description: "",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ReduxProvider>
                    <div className="h-screen flex flex-col">
                        <Header />
                        <div className="flex-1 overflow-hidden">
                            <CustomLayout>
                                {children}
                            </CustomLayout>
                        </div>
                    </div>
                    <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 3000 }} />
                </ReduxProvider>
            </body>
        </html>
    )
}