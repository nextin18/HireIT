"use client"

import React, { useState } from 'react'
import JobSearch from '@/components/jobsearch/JobSearch'
import JobCard from '@/components/jobsearch/JobCard';



export default function page() {

    // const [keyword, setKeyword] = useState("");
    // const [location, setLocation] = useState("");
    // const [activeSearch, setActiveSearch] = useState("");

    // const handleSearch = () => {
    //     console.log({
    //         keyword,
    //         location,
    //     });
    // };

    return (
        <div className='min-h-full w-full sm:px-7 lg:px-6 xl:px-10'>
            {/* <JobSearch
                keyword={keyword}
                location={location}
                activeSearch={activeSearch}
                setKeyword={setKeyword}
                setLocation={setLocation}
                setActiveSearch={setActiveSearch}
                onSearch={handleSearch}
            /> */}

            <JobCard />

        </div>
    )
}
