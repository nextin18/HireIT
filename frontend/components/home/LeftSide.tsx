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
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {/* Applied Jobs */}
                <div className="flex items-center gap-5 rounded-2xl bg-(--extralightBlue) p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--lightSkyBlue)/10">
                        <BriefcaseBusiness className="text-(--lightSkyBlue)" size={30} />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold">10</h2>
                        <p className="text-(--secondryText)">Applied Jobs</p>
                    </div>
                </div>

                {/* Favorite Jobs */}
                <div className="flex items-center gap-5 rounded-2xl bg-(--extraLightYellow) p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--lightYellow)">
                        <Bookmark className="text-(--yellow)" size={30} />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold">14</h2>
                        <p className="text-(--secondryText)">Favorite Jobs</p>
                    </div>
                </div>

                {/* Job Alerts */}
                <div className="flex items-center gap-5 rounded-2xl bg-(--extraLightGreen) p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--lightGreen)">
                        <Bell className="text-(--emeraldGreen)" size={30} />
                    </div>

                    <div>
                        <h2 className="text-4xl font-bold">90</h2>
                        <p className="text-(--secondryText)">Job Alerts</p>
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

            <Feeds/>

        </div>
    )
}
