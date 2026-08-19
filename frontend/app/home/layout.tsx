"use client"
import React, { Children } from 'react'

export default function ({
    children,
}: {
    children: React.ReactNode;
}) { 
  return (
    <div className='min-h-full w-full sm:px-7 lg:p-6 xl:p-10'>{children}</div>
  )
}
