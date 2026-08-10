"use client"

import React from 'react'
import { SmoothInput } from '@/components/ui/skiper-ui/skiper106'
import { useState } from 'react'
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "next/navigation";



function LoginForm() {

  const router = useRouter();
  const { user, loading, handleLogin } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  async function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);

    await handleLogin(formData.email, formData.password);
    console.log("user", user);
    setFormData({
      email: '',
      password: ''
    });
    router.push('/home');
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
