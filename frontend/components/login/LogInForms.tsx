"use client"

import React from 'react'
import { SmoothInput } from '@/components/ui/skiper-ui/skiper106'
import { useState } from 'react'
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/shadcn/toast"
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {

  const router = useRouter();
  const { handleLogin } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  async function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const toastId = toast.loading("🔐 Unlocking your access bro.")
    try {
      const loggedInUser = await handleLogin(formData.email, formData.password);
      console.log("Logged in user:", loggedInUser);

      toast.update(toastId, {
        render: "✨ You nailed it!You’re in! 🐬",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });

      setFormData({
        email: '',
        password: ''
      });

      router.push('/home');

    } catch (error) {

      toast.update(toastId, {
        render: "💀 Oops, we fumbled that one. Let’s try again!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }




  return (
    <div>
      <form className="space-y-6" onSubmit={formhandle}>

        <SmoothInput
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          autoComplete="email"
          placeholder="Email"
          required
          className="inputform text-base"
          wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
        />
        <SmoothInput
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          required
          className="inputform text-base"
          wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
        />
        <button type="submit" className="actionBtn">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
