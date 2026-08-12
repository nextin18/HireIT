"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hook/useAuth'

function HomePage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, router, user])

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className='text-4xl h-full'>Home </div>
  )
}

export default HomePage
