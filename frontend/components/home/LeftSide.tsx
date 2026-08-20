import { ArrowRight, Bell, Bookmark, BriefcaseBusiness } from 'lucide-react'
import React from 'react'
import Feeds from '@/components/home/Feeds'

export default function LeftSide() {
    return (
        <div className='leftSide flex flex-col gap-8'>

            <header className="mb-0">
                <h1 className="text-3xl font-bold ">
                    Hello, Amir 👋
                </h1>

                <p className="mt-1 text-(--secondryText)">
                    Here is your daily activities and job alerts
                </p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-5">

                {/* Applied Jobs */}
                <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl bg-(--extralightBlue) p-3 sm:p-4 md:flex-row md:gap-5 md:p-6">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--lightSkyBlue)/10 sm:h-12 sm:w-12 md:h-16 md:w-16 md:rounded-2xl">
                        <BriefcaseBusiness
                            className="h-5 w-5 text-(--lightSkyBlue) sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
                        />
                    </div>

                    <div className="min-w-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            10
                        </h2>

                        <p className="text-xs leading-tight text-(--secondryText) sm:text-sm md:text-base">
                            Applied Jobs
                        </p>
                    </div>
                </div>


                {/* Favorite Jobs */}
                <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl bg-(--extraLightYellow) p-3 sm:p-4 md:flex-row md:gap-5 md:p-6">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--lightYellow) sm:h-12 sm:w-12 md:h-16 md:w-16 md:rounded-2xl">
                        <Bookmark
                            className="h-5 w-5 text-(--yellow) sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
                        />
                    </div>

                    <div className="min-w-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            14
                        </h2>

                        <p className="text-xs leading-tight text-(--secondryText) sm:text-sm md:text-base">
                            Favorite Jobs
                        </p>
                    </div>
                </div>


                {/* Job Alerts */}
                <div className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl bg-(--extraLightGreen) p-3 sm:p-4 md:flex-row md:gap-5 md:p-6">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--lightGreen) sm:h-12 sm:w-12 md:h-16 md:w-16 md:rounded-2xl">
                        <Bell
                            className="h-5 w-5 text-(--emeraldGreen) sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
                        />
                    </div>

                    <div className="min-w-0 text-center md:text-left">
                        <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                            90
                        </h2>

                        <p className="text-xs leading-tight text-(--secondryText) sm:text-sm md:text-base">
                            Job Alerts
                        </p>
                    </div>
                </div>

            </div>

            {/* Profile Alert */}
            <div className="mt-0 flex items-center justify-between rounded-2xl bg-(--secondryColor) px-8 py-6">

                <div className="flex items-center gap-5">
                    <img
                        src="https://i.pinimg.com/1200x/d3/2e/38/d32e380d73a5a7aa85c0c8e0fbbd5821.jpg"
                        alt="Profile"
                        className="h-16 w-16 rounded-full border-2 border-(--primaryColor) object-cover"
                    />

                    <div>
                        <h2 className="text-xl font-bold text-(--primaryColor)">
                            Your profile editing is not completed.
                        </h2>

                        <p className="mt-1 text-(--primaryColor)/80">
                            Complete your profile editing & build your custom Resume
                        </p>
                    </div>
                </div>

                <button className="flex items-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-[#ff641f]">
                    Edit Profile
                    <ArrowRight size={20} />
                </button>

            </div>

            <Feeds />

        </div>
    )
}
