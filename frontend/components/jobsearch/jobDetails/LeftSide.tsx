import { ArrowRight, Bookmark } from 'lucide-react'
import React from 'react'

export default function LeftSide({ company_name, company_logo, title, description, requirements, benefits, job_type }: { company_logo: string, company_name: string, title: string, description: string, requirements: string[], benefits: string[], job_type: string }) {



    const p = "text-(--primaryText) mt-5 leading-relaxed"
    const h2 = "text-xl text-(--primaryText) font-semibold"


    return (
        <div className="leftSide flex flex-col gap-5 w-full h-full">

            <div className="companyDetail w-full justify-between bg-(--primaryColor) flex gap-5 items-center p-6 border border-(--secondryColor) rounded-2xl">
                <div className=" flex gap-5 ">
                    <div className='h-18 w-18 rounded-full bg-(--secondryColor) overflow-hidden'>
                        <img src={company_logo}
                            alt={`${company_name} logo`}
                            className="h-full w-full object-contain" />
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-bold text-2xl text-(--primaryText)'>{title}</p>
                        <div className='flex items-center gap-5'>
                            <p className='text-(--secondryText) font-medium'>at  {company_name}</p>
                            <p className='text-(--primaryText) font-medium bg-(--bg) px-4 rounded-full'>{job_type}</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <div className="p-2 bg-(--bg)/80 rounded-full"><Bookmark /></div>
                    <button className="applyBtn flex items-center gap-3 bg-(--secondryColor) px-[1.9rem] w-full py-[.8rem] rounded-full text-[1.20rem] font-semibold text-(--primaryColor) cursor-pointer">
                        Apply Now <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="descriptionDetails flex flex-col gap-5 bg-(--primaryColor) p-6 rounded-2xl border border-(--secondryColor)">

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
