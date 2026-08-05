"use client"

import React from 'react'
import { ThemeToggleButton } from '@/components/ui/skiper-ui/skiper26'

interface ThemeToggleProps {
  className?: string
  variant?: "circle" | "circle-blur" | "rectangle" | "gif" | "polygon"// Skiper UI ke props
  start?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right"
  blur?: boolean // Skiper UI ke props
  // gifUrl?: string
}

export const Toggle = ({
  className = "",
  variant = "circle-blur",
  start = "top-left",
  blur = true,
  // gifUrl="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3eHQzNmVyamgxZTdxMGVrM2RieDV1b29sOXMxcDZzbzN0NXQxZHJmOSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/rlFo85hB9tqXt7whUb/giphy.gif",
}: ThemeToggleProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <ThemeToggleButton variant={variant} start="top-left" blur={blur} />
    </div>
  )
}