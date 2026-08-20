"use client"

import { useEffect, useRef } from 'react'
import Aside from '@/components/auth/Aside'
import NextIn from '@/components/ui/NextIn'
import LoginForm from '@/components/login/LogInForms'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hook/useAuth'
import { toast, Bounce } from "react-toastify";

function page() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pageMounted = useRef(false)
  const hadUserOnInitialLoad = useRef(false)

  useEffect(() => {
    if (loading) return

    if (!pageMounted.current) {
      pageMounted.current = true
      hadUserOnInitialLoad.current = Boolean(user)

      if (user) {
        toast.warning("You’re locked, bro", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        router.replace('/home')
      }
    }
  }, [loading, user, router])

  if (loading) {
    return (
      <div className='authMaindev'>
        <Aside />
        <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:rounded-bl-[44px] lg:rounded-tl-[44px]">
          <div className="w-full max-w-[23rem]">
            <div className="mb-8 text-center text-[23px] font-bold tracking-[-1px] sm:mb-12 lg:hidden">
              <NextIn />
            </div>
            <h2 className="text-center text-3xl font-bold tracking-[-1.4px] text-(--blacktext) sm:text-[42px]">
              Log in account
            </h2>
            <div className="mt-6">
              <LoginForm />
            </div>

            <p className="mt-10 text-center text-sm text-(--blacktext) sm:mt-15">
              Have not an account? <Link href="/register" className="singLink">Register.</Link>
            </p>
          </div>
        </section>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className='authMaindev'>
      <Aside />
      {/* Form side */}
      <section className="flex min-h-screen flex-1 items-center justify-center px-5 py-8 sm:px-10 sm:py-12 lg:rounded-bl-[44px] lg:rounded-tl-[44px]">
        <div className="w-full max-w-[23rem]">
          <div className="mb-8 text-center text-[23px] font-bold tracking-[-1px] sm:mb-12 lg:hidden">
            <NextIn />
          </div>
          <h2 className="text-center text-3xl font-bold tracking-[-1.4px] text-(--blacktext) sm:text-[42px]">
            Log in account
          </h2>
          <div className="mt-6">
            <LoginForm />
          </div>

          <p className="mt-10 text-center text-sm text-(--blacktext) sm:mt-15">
            Have not an account? <Link href="/register" className="singLink">Register.</Link>
          </p>
        </div>
      </section>
    </div>
  )
}

export default page
