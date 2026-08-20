import { ArrowRight, Bookmark } from 'lucide-react'
import React from 'react'

export default function LeftSide({ company_name, company_logo, title, description, requirements, benefits, job_type }: { company_logo: string, company_name: string, title: string, description: string, requirements: string[], benefits: string[], job_type: string }) {



    const p = "text-(--primaryText) mt-5 leading-relaxed"
    const h2 = "text-xl text-(--primaryText) font-semibold"


    return (
        <div className="leftSide flex h-full w-full min-w-0 flex-col gap-5">

            <div className="companyDetail flex w-full flex-col gap-5 rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-3 sm:gap-5">
                    <div className='h-16 w-16 shrink-0 overflow-hidden rounded-full bg-(--secondryColor) sm:h-18 sm:w-18'>
                        <img src={company_logo}
                            alt={`${company_name} logo`}
                            className="h-full w-full object-contain" />
                    </div>
                    <div className='min-w-0 flex flex-col'>
                        <p className='break-words text-xl font-bold text-(--primaryText) sm:text-2xl'>{title}</p>
                        <div className='flex flex-wrap items-center gap-2 sm:gap-5'>
                            <p className='text-(--secondryText) font-medium'>at  {company_name}</p>
                            <p className='text-(--primaryText) font-medium bg-(--bg) px-4 rounded-full'>{job_type}</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center gap-3 md:w-auto md:gap-5">
                    <div className="shrink-0 rounded-full bg-(--bg)/80 p-2"><Bookmark /></div>
                    <button className="applyBtn flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-(--secondryColor) px-5 py-3 text-base font-semibold text-(--primaryColor) cursor-pointer sm:px-7 sm:text-[1.20rem] md:flex-none">
                        Apply Now <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="descriptionDetails flex flex-col gap-5 rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-4 sm:p-6">

                <div><h2 className={`${h2}`}>Job Description</h2>
                    <p className={`${p}`}>{description}</p>
                </div>
                <div><h2 className={`${h2}`}>Requirements</h2>
                    <p className={`${p}`}>{requirements}</p>
                </div>
                <div><h2 className={`${h2}`}>Benefits</h2>
                    <p className={`${p}`}>{benefits}</p>
                </div>

            </div>

        </div>
    )
}
