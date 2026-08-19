"use client"
import React, { useState } from 'react'
import { SmoothInput } from "@/components/ui/skiper-ui/skiper106"
import { LuSearch } from "react-icons/lu";
import type { IconType } from "react-icons";


export default function SearchInput({value, onChange, placeholder, icon: Icon = LuSearch, iconClassName = "text-(--secondryColor)"}:{value:string, onChange:(value: string) => void, placeholder:string, icon?: IconType, iconClassName?: string;}) {
    
  

  return (
       <div className='flex items-center'>
         {/* Search Icon */}
           <Icon size={25} className={`shrink-0 ${iconClassName}`} />

          {/* Input */}
          <SmoothInput
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="boreder-none text-base pl-5"
            wrapperClassName=" max-w-5/6 rounded-none  bg-transparent p-0 has-[:focus-visible]:!outline-none"
          /> 
       </div>         
  )
}
