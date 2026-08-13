"use client"
import React, { useState } from 'react'
import { SmoothInput } from "@/components/ui/skiper-ui/skiper106"
import { LuSearch } from "react-icons/lu";



export default function SearchInput({value, onChange, placeholder}:{value:string, onChange:(value: string) => void, placeholder:String}) {
    
  

  return (
       <div className='flex items-center'>
         {/* Search Icon */}
          <LuSearch size={25} className='text-(--secondryColor)' />

          {/* Input */}
          <SmoothInput
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Job title, keyword, company"
            className="boreder-none text-base pl-5"
            wrapperClassName=" max-w-5/6 rounded-none  bg-transparent p-0 has-[:focus-visible]:!outline-none"
          /> 
       </div>         
  )
}
