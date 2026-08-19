"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hook/useAuth'
import {
  BriefcaseBusiness,
  Bookmark,
  Bell,
  ArrowRight,
} from "lucide-react";
import LeftSide from '@/components/home/LeftSide';
import RightSide from '@/components/home/RightSide';
import Loading from './loading';

function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, router, user])

  if (loading || !user) {
    return <div><Loading/></div>
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

     <LeftSide/>
     <RightSide/>

    </div>
  )
}

export default HomePage
