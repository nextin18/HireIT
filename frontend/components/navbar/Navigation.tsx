"use client"

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import ReactFlagsSelect from "react-flags-select";
import { PiBell } from "react-icons/pi";
import SearchInput from "@/components/ui/SearchInput";
import NextIn from '@/components/ui/NextIn'
import Link from 'next/link';


export default function Navigation() {

  const [selected, setSelected] = useState("IN");

  const handleCountryChange = (countryCode: string) => {
    console.log("Selected country:", countryCode);
    setSelected(countryCode);
  };

  const [search, setSearch] = useState("");

  return (
    <div className='bg-(--primaryColor) w-full px-10 py-5 flex items-center justify-between border-b border-(--thirdColor)'>

      {/* Logo & Search features */}
      <div className='flex justify-between items-center gap-20 w-2/4'>
        <NextIn />
        <form className=' w-full flex items-center justify-between border-[1.5px] border-(--thirdColor)/15 rounded-sm'>

          {/* Countries Flag */}
          <ReactFlagsSelect
            selected={selected}
            onSelect={handleCountryChange}
            showSelectedLabel={false}
            showSecondarySelectedLabel={false}
            // showOptionLabel={false}  
            selectedSize={25}
            optionsSize={15}
            searchable
            searchPlaceholder="Search country"
            fullWidth={false}
            selectButtonClassName="!border-0 !shadow-none !py-0 !px-3"
          />

          {/* Divider */}
          <div className="h-6 w-px bg-(--thirdColor)/15" />

          {/* Search Icon */}
          <div className=' w-7/8 ml-2'>
            <SearchInput value={search} onChange={setSearch} placeholder="Job title, KEyword, Company" />
          </div>
        </form>
      </div>

      {/* Notification & Profile */}
      <div className='flex justify-between items-center gap-5'>
        <PiBell size={25} className='text-(--thirdColor)' />
        <Link href={"/profile"}>
          <Avatar size='lg'>
            <AvatarImage src="https://i.pinimg.com/736x/66/60/db/6660dbdd674c320d6570cbaa764d4dbb.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>

    </div>
  )
}
