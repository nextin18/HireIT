import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"



export default function CanditateProfile() {

  const rowcss = "bg-(--secondrybg) px-4 py-2 rounded-xl"
  return (
    <div className='bg-(--secondrybg) h-full w-full p-5'>
      {/* section 1 */}
      <div className='w-full h-auto p-5 bg-white rounded-xl'>
        {/* profile and details */}

        <div className='flex gap-5'>
          <Avatar size='3xlg'>
            <AvatarImage src="https://i.pinimg.com/736x/66/60/db/6660dbdd674c320d6570cbaa764d4dbb.jpg" />
            <AvatarFallback>AA </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h2 className='text-3xl font-bold'>Amir Alam</h2>
            <p className='font-semibold mt-2'>King of Senior developer.😎</p>
            <p className='font-[400]'>Kolkata,INDIA</p>
            <p className='font-[400]'>Experice of 10 years</p>
          </div>
        </div>

        {/* Experince and btns */}
        <div className='mt-5'>
          <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>
            <div className={rowcss}>
              <p>Experience</p>
              <p className='font-bold'>10</p>
            </div>
            <div className={rowcss}>
              <p>Projects</p>
              <p className='font-bold'>20</p>
            </div>
            <div className={rowcss}>
              <p>Rating</p>
              <p className='font-bold'>4.5</p>
            </div>
          </div>
          <button>Resume</button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  )
}
