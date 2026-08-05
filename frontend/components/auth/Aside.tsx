import React from 'react'
import NextIn from '../ui/NextIn'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
function Aside() {
    return (

        <aside className="relative hidden min-h-screen overflow-hidden bg-[#2f2825] px-13 py-7 text-white lg:flex lg:w-1/2 lg:flex-col xl:w-[53%]">
            {/* Highlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_82%,rgba(141,63,27,0.46),transparent_38%),radial-gradient(circle_at_85%_5%,rgba(123,67,42,0.28),transparent_40%)]" />
            <NextIn />
            <div className="relative mt-21 max-w-147.5">
                <h1 className="text-[42px] font-semibold leading-[1.1] tracking-[-1.6px] xl:text-[47px]">
                    Your next career breakthrough starts here.
                </h1>
                <p className="mt-7 max-w-142.5 text-[15px] leading-6 text-white/60">
                    Join a network of top-tier professionals, get direct access to modern tech startups,
                    and apply to vetted roles in minutes.
                </p>
            </div>

            {/* Review cards */}
            <div className="relative mt-auto mb-28 ml-14 w-102.5 rounded-2xl bg-[#1f2024]/95 px-8 py-8 shadow-2xl">
                <p className="text-[18px] leading-7 text-white/95">
                    This analytics platform is a game-changer! It&apos;s easy to use, provides valuable
                    insights. I highly recommend it.
                </p>
                <div className="mt-7 flex items-center gap-3">
                    {/* <div className="grid size-8 place-items-center rounded-full bg-[#f9ad8f] text-sm"><p className="text-xl">T</p></div> */}
                    <Avatar>
                        <AvatarImage src="https://scontent.cdninstagram.com/v/t51.82787-19/730009957_18109232171055632_6790540065408262591_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=109&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=4AbnLw6_SP4Q7kNvwFO5DZo&_nc_oc=AdqxHTI2YiKBIseRZaNb644aOSkJgH2zy4oTxEMFiQmrtCUkUNuAakwwi0ALs3u60p0&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_gid=qjIneb6z5gsBUl6Kli5pqw&_nc_ss=7b689&oh=00_AQHKPCw6SKQK5mrGNQ_O6PNXyFRsyMrASSmjEJgZ-ZQqsg&oe=6A79449F" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <p className="text-sm font-medium">Taksin Raja</p>
                        <p className="text-[11px] text-white/55">UI UX designer, Kolkata</p>
                    </div>
                </div>
            </div>

        </aside>

    )
}

export default Aside