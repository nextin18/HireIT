"use client";

import JobSearch from "@/components/jobsearch/JobSearch";
import { useState } from "react";

export default function JobsSearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [activeSearch, setActiveSearch] = useState("");

    const handleSearch = () => {
        console.log({
            keyword,
            location,
        });
    };
    return (
        <>
            <JobSearch
                keyword={keyword}
                location={location}
                activeSearch={activeSearch}
                setKeyword={setKeyword}
                setLocation={setLocation}
                setActiveSearch={setActiveSearch}
                onSearch={handleSearch}
            />
            {children}
        </>
    );
}