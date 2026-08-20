"use client"
import React from 'react'

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) { 
  return (
    <div className='min-h-screen w-full bg-(--bg) p-4 sm:px-7 lg:p-6 xl:p-10'>{children}</div>
  )
}
