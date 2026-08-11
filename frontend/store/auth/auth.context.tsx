"use client"
import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser } from "@/lib/api.auth";

interface AuthContextType {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const restoreUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await getCurrentUser(token);
                const currentUser = response.data.user;
                setUser(currentUser);
                console.log("Restored logged in user:", currentUser);
            } catch (error) {
                console.error("Unable to restore the logged-in user:", error);

                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem("token");
                }

                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
