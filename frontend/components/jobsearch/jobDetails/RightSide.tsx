import { Calendar, GraduationCap, Layers2, Timer } from 'lucide-react'
import React from 'react'
import { BiWorld } from 'react-icons/bi'



export default function RightSide({ salary, location, posted_date, expire_date, job_level, education }: { salary: string, location: string, posted_date: string, expire_date: string, job_level: string, education: string }) {


    const textP = "text-xs font-medium uppercase tracking-wide text-(--secondryText)"
    const heading = "text-xl font-bold text-(--primaryText)"
    const colorIcon = "text-(--secondryColor) text-2xl"
    // section 2
    const TextP = "text-xs font-medium uppercase text-(--secondryText)"
    const DataText = "mt-1 text-sm font-semibold text-(--primaryText)"
    const Icon = "mb-2 text--(--secondryText)"

    return (
        <div className="rightSide w-full h-full flex flex-col gap-5">

            {/* section1, Salary */}

            <div className="w-full rounded-2xl border border-(--secondryColor) bg-(--primaryColor) px-4 py-4 sm:px-6">
                <div className="flex flex-col justify-between">
                    <p className={`${heading}`}>SALARY</p>
                    <p className="text-xl font-semibold mt-2">{salary}</p>
                    <p className={`${textP}`} >Yearly salary</p>
                </div>

                <hr className="border-(--secondryText)/50 my-3" />

                <div className=" flex gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-(--bg)"><BiWorld className={`${colorIcon}`} /></div>
                    <div>
                        <p className={`${textP}`}>
                            Job Location
                        </p> 
                        <p className={`${textP} text-(--primaryText)`}>
                            {location}
                        </p>
                    </div>


                </div>
            </div>


            {/* Section2, Job Overview */}

            <div className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-4 sm:p-6">
                <h2 className={`${heading}`}>
                    Job Overview
                </h2>

                <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8">

                    {/* Job Posted */}
                    <div>
                        <Calendar className={`${Icon}`} size={20} />

                        <p className={`${TextP}`}>
                            Job Posted:
                        </p>

                        <p className={`${DataText}`}>
                            {posted_date}
                        </p>
                    </div>

                    {/* Job Expire */}
                    <div>
                        <Timer className={`${Icon}`} size={20} />


                        <p className={`${TextP}`}>
                            Job Expire In:
                        </p>

                        <p className={`${DataText}`}>
                            {expire_date}
                        </p>
                    </div>

                    {/* Job Level */}
                    <div>
                        <Layers2 className={`${Icon}`} size={20} />

                        <p className={`${TextP}`}>
                            Job Level:
                        </p>

                        <p className={`${DataText}`}>
                            {job_level}
                        </p>
                    </div>

                    {/* Education */}
                    <div>
                        <GraduationCap className={`${Icon}`} size={20} />
                        <p className={`${TextP}`}>
                            Education:
                        </p>

                        <p className={`${DataText}`}>
                            {education}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
