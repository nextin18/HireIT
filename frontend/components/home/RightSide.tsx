import React from 'react'
import PeopleYouMayLike from '@/components/side components/PeopleYouMayLike'
import RecommendedJobs from '@/components/side components/RecommendedJobs'

export default function RightSide() {
  return (
    <div className='flex flex-col gap-8'>
      <PeopleYouMayLike/>
      <RecommendedJobs/>
    </div>
  )
}
