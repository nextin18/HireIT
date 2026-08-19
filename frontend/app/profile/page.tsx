"use client"

import React from 'react'
import { useAuth } from '@/hook/useAuth'
import CompanyProfile from '@/components/userProfile/company/CompanyProfile'
import CanditateProfile from '@/components/userProfile/canditate/CanditateProfile'


const Profile_Components: Record<string, React.ComponentType<{user:any}>>={
    candidate: CanditateProfile,
    company: CompanyProfile,
    // employee: EmployeeProfile,
}

export default function page() {

    const {user, loading}=useAuth()

    if(loading) return<div className="flext justify-center item-center">Profile loading......</div>

    if(!user) return<div>USer Not Found</div>

    const ProfileComponent = Profile_Components[user.role] || CanditateProfile


  return (
    <ProfileComponent user={user}/>
  )
}
