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
    <div className='flex w-full items-center justify-between border-b border-(--thirdColor) bg-(--primaryColor) px-3 py-4 sm:px-6 lg:px-10 lg:py-5'>

      {/* Logo & Search features */}
      <div className='flex min-w-0 flex-1 items-center gap-3 sm:gap-6 lg:gap-20 lg:w-2/4'>
        <NextIn />
        <form className='flex w-auto shrink-0 items-center justify-between rounded-sm border-[1.5px] border-(--thirdColor)/15 md:w-full'>

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
          <div className="hidden h-6 w-px bg-(--thirdColor)/15 md:block" />

          {/* Search Icon */}
          <div className='ml-2 hidden w-7/8 md:block'>
            <SearchInput value={search} onChange={setSearch} placeholder="Job title, KEyword, Company" />
          </div>
        </form>
      </div>

      {/* Notification & Profile */}
      <div className='ml-3 flex shrink-0 items-center gap-3 sm:gap-5'>
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
