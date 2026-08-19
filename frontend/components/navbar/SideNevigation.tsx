"use client"

import Link from 'next/link'
import React from 'react'
import { House, Play, Clapperboard, Calendar, Briefcase, FileText, GraduationCap, LayoutGrid, Bookmark, BellRing, Settings, Weight } from 'lucide-react';
import { LuSearch } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { usePathname } from 'next/navigation';

export default function SideNevigation() {

    const pathname = usePathname()

    const isActive = (path: string) => pathname === path


    const getLinkClass = (path: string) =>
        `flex items-center gap-2 rounded-xl p-2 transition-colors px-5 ${isActive(path)
            ? "bg-(--bg) text-(--secondryColor) font-semibold"
            : "hover:bg-(--thirdColor)/5 font-medium text-[.9rem] text-(--secondryText) tracking-wide"
        }`
    const headingCss = "mb-2 px-6 text-[.9rem] text-(--primaryText) font-medium uppercase tracking-wider"


    return (
        <div className='w-full grid gap-5 text-[1rem]'>
            <div className='flex flex-col'>
                <h2 className={`${headingCss} `}>Analytics</h2>
                <div className='flex flex-col gap-2'>
                    <Link href="/home" className={getLinkClass('/home')}> <House strokeWidth={isActive('/home') ? 2.8 : 2} size={16} /> Home </Link>
                    <Link href="/jobsearch" className={getLinkClass('/jobsearch')}><LuSearch strokeWidth={isActive('/jobsearch') ? 2.8 : 2} size={16} />Search</Link>
                    <Link href="/message" className={getLinkClass('/message')}><AiOutlineMessage strokeWidth={isActive('/message') ? 2.8 : 2} size={16} />Message</Link>
                    <Link href="/reels" className={getLinkClass('/reels')}><Clapperboard strokeWidth={isActive('/reels') ? 2.8 : 2} size={16} />Reels</Link>
                </div>

            </div>

            <div className='flex flex-col'>
                <h2 className={headingCss}>Context</h2>
                <div className='flex flex-col'>
                    <Link href="/event" className={getLinkClass('/event')}><Calendar strokeWidth={isActive('/event') ? 2.8 : 2} size={16} />Event</Link>
                    <Link href="/appliedjob" className={getLinkClass('/appliedjob')}><Briefcase strokeWidth={isActive('/appliedjob') ? 2.8 : 2} size={16} />Applied Job</Link>
                    <Link href="/resumebuilder" className={getLinkClass('/resumebuilder')}><FileText strokeWidth={isActive('/resumebuilder') ? 2.8 : 2} size={16} />Resume Builder</Link>
                    <Link href="/learning" className={getLinkClass('/learning')}><GraduationCap strokeWidth={isActive('/learning') ? 2.8 : 2} size={16} />Learning</Link>
                </div>
            </div>

            <div className='flex flex-col'>
                <h2 className={headingCss}>Others</h2>
                <div className='flex flex-col'>
                    <Link href="/savejob" className={getLinkClass('/savejob')}><Bookmark strokeWidth={isActive('/savejob') ? 2.8 : 2} size={16} />Save Job</Link>
                    <Link href="/notification" className={getLinkClass('/notification')}><BellRing strokeWidth={isActive('/notification') ? 2.8 : 2} size={16} />Notification</Link>
                    <Link href="/app" className={getLinkClass('/app')}><LayoutGrid strokeWidth={isActive('/app') ? 2.8 : 2} size={16} />App</Link>
                    <Link href="/setting" className={getLinkClass('/setting')}><Settings strokeWidth={isActive('/setting') ? 2.8 : 2} size={16} />Setting</Link>
                </div>
            </div>
        </div>
    )
}
