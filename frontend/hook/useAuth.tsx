import { useContext } from 'react';
import { AuthContext } from "@/store/auth/auth.context";
import { login, logout, registerCompany, resigterCanditates } from "@/lib/api.auth";


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context || { user: null, setUser: () => { }, loading: false, setLoading: () => { } }

    const handleLogin = async (username: string, password: string) => {
        setLoading(true)
        const response = await login(username, password)
        setUser(response.data.user);
        console.log("Login response:", response)
        localStorage.setItem("token", response.data.token);
        setLoading(false)
    }

    const handleRegisterCompany = async (name: string, email: string, phone_number: string, password: string, password_confirmation: string) => {
        setLoading(true)
        const response = await registerCompany(name, email, phone_number, password, password_confirmation)
        setUser(response.data.user)
        localStorage.setItem("token", response.data.token);
        setLoading(false)
    }

    const handleResigterCanditate = async (name: string, email: string, phone_number: string, password: string, password_confirmation: string) => {
        setLoading(true)
        const response = await resigterCanditates(name, email, phone_number, password, password_confirmation)
        setUser(response.data.user)
        localStorage.setItem("token", response.data.token);
        setLoading(false)
    }

    const handleLogout = async () => {
        const token = localStorage.getItem("token");

        try {
            if (token) {
                await logout(token);
            }
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            window.location.replace("/");
        }
    }

    return { user, setUser, loading, setLoading, handleLogin, handleRegisterCompany, handleResigterCanditate, handleLogout }
}
