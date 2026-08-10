"use client";

import { useEffect, useState } from "react";
import NextIn from "@/components/ui/NextIn";
import CanditateRes from "@/components/resgister/CanditateRes";
import CompanyRes from "@/components/resgister/CompanyRes";
import Aside from "@/components/auth/Aside";
import globalStyles from "../globals.css";
import Link from "next/link";
import { Toggle } from "@/components/ui/Toggle";
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hook/useAuth'
import { toast } from '@/components/ui/shadcn/toast'




type AccountType = "job-finder" | "company";

export default function registration() {
    const [accountType, setAccountType] = useState<AccountType>("job-finder");

    const { user, loading } = useAuth()
    const router = useRouter()

    // If someone is alreadt logged in.
    useEffect(() => {
        if (!loading && user) {
            toast.add({
                title: 'You are already logged in',
                description: 'Redirecting to home page.',
                type: 'info',
            })
            router.replace('/home')
        }
    }, [loading, user, router])

    if (loading) {
        return (
            <div className='authMaindev'>
                <Aside />
                <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:rounded-bl-[44px] lg:rounded-tl-[44px]">
                    <div className="w-full max-w-91.5">
                        <div className="mb-12 text-center lg:hidden text-[23px] font-bold tracking-[-1px]">
                            <NextIn />
                        </div>
                        <h2 className="text-center text-[38px] font-bold tracking-[-1.4px] text-(--blacktext) sm:text-[42px]">
                            Create an account
                        </h2>

                        <div className="mt-20 grid grid-cols-2 gap-4">
                            <button type="button" onClick={() => setAccountType("job-finder")} className={`btn-toggle ${accountType === "job-finder" ? "btn-toggle-active" : "btn-toggle-inactive"}`}>
                                Job Finders
                            </button>
                            <button type="button" onClick={() => setAccountType("company")} className={`btn-toggle ${accountType === "company" ? "btn-toggle-active" : "btn-toggle-inactive"}`}>
                                Company
                            </button>
                        </div>

                        <div className="mt-6">
                            {accountType === "job-finder" ? <CanditateRes /> : <CompanyRes />}
                        </div>

                        <p className="mt-15 text-center text-sm text-(--blacktext)">
                            Already have an account? <Link href="/login" className="singLink">Sign in</Link>
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
        <main className="authMaindev">
            <Toggle className="absolute top-4 right-4 z-50" variant="circle" start="top-right" />
            <Aside />

            {/* Form side */}
            <section className="flex min-h-screen flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:rounded-bl-[44px] lg:rounded-tl-[44px]">
                <div className="w-full max-w-91.5">
                    <div className="mb-12 text-center lg:hidden text-[23px] font-bold tracking-[-1px]">
                        <NextIn />
                    </div>
                    <h2 className="text-center text-[38px] font-bold tracking-[-1.4px] text-(--blacktext) sm:text-[42px]">
                        Create an account
                    </h2>

                    <div className="mt-20 grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setAccountType("job-finder")} className={`btn-toggle ${accountType === "job-finder" ? "btn-toggle-active" : "btn-toggle-inactive"}`}>
                            Job Finders
                        </button>
                        <button type="button" onClick={() => setAccountType("company")} className={`btn-toggle ${accountType === "company" ? "btn-toggle-active" : "btn-toggle-inactive"}`}>
                            Company
                        </button>
                    </div>

                    <div className="mt-6">
                        {accountType === "job-finder" ? <CanditateRes /> : <CompanyRes />}
                    </div>

                    <p className="mt-15 text-center text-sm text-(--blacktext)">
                        Already have an account? <Link href="/login" className="singLink">Sign in</Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
