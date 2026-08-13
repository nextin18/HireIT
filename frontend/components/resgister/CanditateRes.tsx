"use client"
import React from 'react'
import { useState } from 'react'
import { SmoothInput } from '@/components/ui/skiper-ui/skiper106'
import { useAuth } from '@/hook/useAuth'
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function CanditateRes() {

  const router = useRouter();
  const { handleResigterCanditate, loading, user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const phoneError = formData.phoneNumber.length > 0 && formData.phoneNumber.length < 10;
  const passwordMismatch =
    formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;
  const passwordError =
    formData.password.length > 0 &&
    (formData.password.length < 8 ||
      !/[A-Za-z]/.test(formData.password) ||
      !/\d/.test(formData.password) ||
      !/[^A-Za-z0-9]/.test(formData.password));

  async function formhandle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (phoneError || passwordError || passwordMismatch) return;
    console.log(formData);
    const toastId = toast.loading("🔐 Unlocking your access bro.")
    try {
      await handleResigterCanditate(formData.fullName, formData.email, formData.phoneNumber, formData.password, formData.confirmPassword)
      console.log("user", user)


      toast.update(toastId, {
        render: "✨ Registration nailed! You’re in! 🐬",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
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
          type="text"
          placeholder="Full Name" required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="inputform text-base"
          wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
        />
        <SmoothInput
          type="email"
          inputMode="email"
          placeholder="Email" required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="inputform text-base"
          wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
        />
        <div>
          <SmoothInput
            type="tel"
            placeholder="Phone number" required minLength={10}
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="inputform text-base"
            wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
          />
          {phoneError && <p className="mt-1 text-sm text-(--secondryColor)" role="alert">Phone number must contain at least 10 digits.</p>}
        </div>
        <div>
          <SmoothInput
            type="password"
            placeholder="Password" required minLength={8}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="inputform text-base bg-(--inputBg)"
            wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
          />
          {passwordError && <p className="mt-1 text-sm text-red-500" role="alert">Password must be at least 8 characters and include a letter, number, and special character.</p>}
        </div>
        <div>
          <SmoothInput
            type="password"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="inputform text-base"
            wrapperClassName="min-w-full max-w-none rounded-none bg-transparent p-0 has-[:focus-visible]:!outline-none"
          />
          {passwordMismatch && <p className="mt-1 text-sm text-(--secondryColor)" role="alert">Passwords do not match.</p>}
        </div>
        <button type="submit" className="actionBtn">
          Create Account
        </button>
      </form>
    </div>
  )
}

export default CanditateRes
