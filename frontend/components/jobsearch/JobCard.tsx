import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/shadcn/avatar'
import { CiLocationOn } from "react-icons/ci";
import { Bookmark } from 'lucide-react';
import jobs from '@/lib/data/job.json';
import { useRouter } from 'next/navigation';

export default function JobCard() {


  const router = useRouter()

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 cursor-pointer">
      {jobs.map((job) => (
        <div key={job.id} onClick={() => router.push(`/jobsearch/${job.id}`)} className="flex min-w-0 min-h-48.75 w-full flex-col justify-between rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-4">
          <div>
            <h2 className='text-2xl font-bold text-(--thirdColor)'>{job.title}</h2>
            <div className='flex gap-4 items-center mt-2'>
              <div className='text-center'>
                <p className='bg-(--bg) text-(--secondryColor) font-medium rounded px-2'>{job.job_type}</p>
              </div>
              <p className='font-medium text-[1rem]'>Salary: {job.salary}</p>
            </div>
          </div>

          <div className='flex justify-between mt-5 items-center'>
            <div className='flex items-start gap-2'>
              <div className='h-18 w-18 rounded-full bg-(--secondryColor) overflow-hidden'>
                <img src={job.company_logo}
                  alt={`${job.company_name} logo`}
                  className="h-full w-full object-contain" />
              </div>
              <div className='flex flex-col mt-2 ml-1'>
                <p className='font-medium'>{job.company_name}</p>
                <div className='flex items-center gap-1'>
                  <p><CiLocationOn /></p>
                  <p className='text-(--secondryText) font-medium'>{job.location}</p>
                </div>
              </div>
            </div>
            <div><Bookmark /></div>
          </div>

        </div>
      ))}

    </div>
  )
}
