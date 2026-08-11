"use client"

import React from 'react'
import { SmoothInput } from '@/components/ui/skiper-ui/skiper106'
import { useState } from 'react'
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/shadcn/toast"


function LoginForm() {

  const router = useRouter();
  const { handleLogin } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  async function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const loggedInUser = await handleLogin(formData.email, formData.password);
      console.log("Logged in user:", loggedInUser);

      toast.add({
        title: "😎Legend, your are in.",
        description: "✨You're in WElcom Back.",
        type: "success",
      });

      setFormData({
        email: '',
        password: ''
      });

      router.push('/home');

    } catch (error) {

      toast.add({
        title: "😶Ooops!Login failed. Try again.😁",
        description: "🤔Wrong email & password. Lock in and try again.😁",
        type: "error",
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
