import React from 'react'
import Aside from '@/components/auth/Aside'
import NextIn from '@/components/ui/NextIn'
import LoginForm from '@/components/login/LogInForms'
import Link from 'next/link' 


function page() {
  return (
    <div className='authMaindev'>
      <Aside/>
       {/* Form side */}
            <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:rounded-bl-[44px] lg:rounded-tl-[44px]">
                <div className="w-full max-w-91.5">
                    <div className="mb-12 text-center lg:hidden text-[23px] font-bold tracking-[-1px]">
                        <NextIn />
                    </div>
                    <h2 className="text-center text-[38px] font-bold tracking-[-1.4px] text-(--blacktext) sm:text-[42px]">
                        Log in account
                    </h2>
                    <div className="mt-6"> 
                      <LoginForm/>
                    </div>

                    <p className="mt-15 text-center text-sm text-(--blacktext)">
                        Have not an account? <Link href="/register" className="singLink">Register.</Link>
                    </p>
                </div>
            </section>
    </div>
  )
}

export default page