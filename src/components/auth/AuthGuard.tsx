"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthResponse } from "@/types/type";

interface AuthGuardProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // This effect runs after HydrateUser has attempted to populate the store
        setHydrated(true);
    }, [user]); // Depend on user to ensure hydration attempt has passed

    useEffect(() => {
        if (hydrated) {
            let currentUser: AuthResponse | null = user;

            // Fallback to localStorage if Redux state is not yet populated
            if (!currentUser) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    currentUser = JSON.parse(storedUser);
                }
            }

            if (!currentUser) {
                router.replace("/login");
            } else if (currentUser.role && !allowedRoles.includes(currentUser.role)) {
                router.replace("/unauthorized");
            }
        }
    }, [hydrated, user, router, allowedRoles]);

    if (!hydrated || !user || (user.role && !allowedRoles.includes(user.role))) {
        return null; // Show nothing until hydrated and authorized
    }

    return <>{children}</>;
};

export default AuthGuard;