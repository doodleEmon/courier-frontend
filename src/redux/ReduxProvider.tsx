"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";
import { useEffect } from "react";
import { setUser } from "./slices/auth/authSlice";

function HydrateUser() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            store.dispatch(setUser(JSON.parse(storedUser)));
        }
    }, [dispatch]);

    return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <HydrateUser />
            {children}
        </Provider>
    )
}
