"use client"

import React from 'react'
import {SmoothInput} from '@/components/ui/skiper-ui/skiper106'
import { useState } from 'react'

function LoginForm() {


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);

    setFormData({
      email: '',
      password: ''
    });
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
