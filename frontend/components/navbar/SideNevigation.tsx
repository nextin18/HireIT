"use client"

import Link from 'next/link'
import React from 'react'
import { House, Clapperboard, Calendar, Briefcase, FileText, GraduationCap, LayoutGrid, Bookmark, BellRing, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { LuSearch } from "react-icons/lu";
import { AiOutlineMessage } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

type SideNevigationProps = {
    isCollapsed: boolean;
    onToggle: () => void;
};

export default function SideNevigation({ isCollapsed, onToggle }: SideNevigationProps) {

    const pathname = usePathname()

    const isActive = (path: string) => pathname === path


    const getLinkClass = (path: string) =>
        `flex items-center rounded-xl p-2 transition-colors ${isCollapsed ? "justify-center px-2" : "gap-2 px-5"} ${isActive(path)
            ? "bg-(--bg) text-(--secondryColor) font-semibold"
            : "hover:bg-(--thirdColor)/5 font-medium text-[.9rem] text-(--secondryText) tracking-wide"
        }`
    const headingCss = "mb-2 px-6 text-[.9rem] text-(--primaryText) font-medium uppercase tracking-wider"
    const labelAnimation = {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -8 },
        transition: { duration: 0.16 },
    };
    const linkLabel = (label: string) => (
        <AnimatePresence initial={false}>
            {!isCollapsed && <motion.span {...labelAnimation}>{label}</motion.span>}
        </AnimatePresence>
    );


    return (
        <div className='flex h-full w-full flex-col text-[1rem]'>
            <div className='grid gap-5'>
            <div className='flex flex-col'>
                {!isCollapsed && <h2 className={headingCss}>Analytics</h2>}
                <div className='flex flex-col gap-2'>
                    <Link href="/home" className={getLinkClass('/home')}> <House strokeWidth={isActive('/home') ? 2.8 : 2} size={16} /> {linkLabel('Home')} </Link>
                    <Link href="/jobsearch" className={getLinkClass('/jobsearch')}><LuSearch strokeWidth={isActive('/jobsearch') ? 2.8 : 2} size={16} />{linkLabel('Search')}</Link>
                    <Link href="/message" className={getLinkClass('/message')}><AiOutlineMessage strokeWidth={isActive('/message') ? 2.8 : 2} size={16} />{linkLabel('Message')}</Link>
                    <Link href="/reels" className={getLinkClass('/reels')}><Clapperboard strokeWidth={isActive('/reels') ? 2.8 : 2} size={16} />{linkLabel('Reels')}</Link>
                </div>

            </div>

            <div className='flex flex-col'>
                {!isCollapsed && <h2 className={headingCss}>Context</h2>}
                <div className='flex flex-col'>
                    <Link href="/event" className={getLinkClass('/event')}><Calendar strokeWidth={isActive('/event') ? 2.8 : 2} size={16} />{linkLabel('Event')}</Link>
                    <Link href="/appliedjob" className={getLinkClass('/appliedjob')}><Briefcase strokeWidth={isActive('/appliedjob') ? 2.8 : 2} size={16} />{linkLabel('Applied Job')}</Link>
                    <Link href="/resumebuilder" className={getLinkClass('/resumebuilder')}><FileText strokeWidth={isActive('/resumebuilder') ? 2.8 : 2} size={16} />{linkLabel('Resume Builder')}</Link>
                    <Link href="/learning" className={getLinkClass('/learning')}><GraduationCap strokeWidth={isActive('/learning') ? 2.8 : 2} size={16} />{linkLabel('Learning')}</Link>
                </div>
            </div>

            <div className='flex flex-col'>
                {!isCollapsed && <h2 className={headingCss}>Others</h2>}
                <div className='flex flex-col'>
                    <Link href="/savejob" className={getLinkClass('/savejob')}><Bookmark strokeWidth={isActive('/savejob') ? 2.8 : 2} size={16} />{linkLabel('Save Job')}</Link>
                    <Link href="/notification" className={getLinkClass('/notification')}><BellRing strokeWidth={isActive('/notification') ? 2.8 : 2} size={16} />{linkLabel('Notification')}</Link>
                    <Link href="/app" className={getLinkClass('/app')}><LayoutGrid strokeWidth={isActive('/app') ? 2.8 : 2} size={16} />{linkLabel('App')}</Link>
                    <Link href="/setting" className={getLinkClass('/setting')}><Settings strokeWidth={isActive('/setting') ? 2.8 : 2} size={16} />{linkLabel('Setting')}</Link>
                </div>
            </div>
            </div>

            <button
                type="button"
                onClick={onToggle}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className={`mt-auto flex h-10 items-center rounded-xl bg-(--bg) text-sm font-semibold text-(--secondryColor) transition-colors hover:bg-(--secondryColor)/15 ${isCollapsed ? "justify-center" : "gap-2 px-4"}`}
            >
                {isCollapsed ? <ChevronRight size={19} /> : <><ChevronLeft size={19} /><span>Collapse</span></>}
            </button>
        </div>
    )
}
