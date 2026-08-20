"use client";

import { LuFilter, LuLocateFixed, LuMapPin } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import SearchInput from "@/components/ui/SearchInput";

type JobSearchProps = {
    keyword: string;
    location: string;
    activeSearch: string;

    setKeyword: React.Dispatch<React.SetStateAction<string>>;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setActiveSearch: React.Dispatch<React.SetStateAction<string>>;

    onSearch: () => void;
};

// const popularSearches = [
//     "Front-end",
//     "Back-end",
//     "Development",
//     "PHP",
//     "Laravel",
//     "Bootstrap",
//     "Developer",
//     "Team Lead",
//     "Product Testing",
//     "Javascript",
// ];

export default function JobSearch({ keyword, location, activeSearch, setKeyword, setLocation, setActiveSearch, onSearch, }: JobSearchProps) {

    const handlePopularSearch = (item: string) => {
        setKeyword(item);
        setActiveSearch(item);
    };

    return (
        <section className="my-4 sm:my-6 lg:my-8">
            <div className="mx-4 max-w-277.5 sm:mx-6 lg:mx-auto">
                {/* Search Box */}
                <form onSubmit={(event) => { event.preventDefault(); onSearch(); }} className="flex flex-col rounded-[30px] bg-(--primaryColor) py-2 shadow-[0_3px_10px_rgba(38,38,38,0.11)] md:flex-row md:items-center md:px-3" >
                    {/* Keyword Search */}
                    <div className="ml-2 min-w-0 flex-1 border-b border-(--secondryText) py-0 md:border-b-0 md:border-r md:pr-7">
                        <SearchInput value={keyword} onChange={(value) => { setKeyword(value); setActiveSearch(""); }} placeholder="Search by: Job title, Position, Keyword..." iconClassName="text-(--secondaryText)" />
                    </div>

                    {/* Location Search */}
                    <div className="min-w-0 flex-1 py-3 md:px-6 md:py-0">
                        <SearchInput
                            value={location}
                            onChange={setLocation}
                            icon={CiLocationOn}
                            iconClassName="text-(--secondryText)"
                            placeholder="City, state or zip code"
                        />
                    </div>

                    {/* Current Location */}
                    <button
                        type="button"
                        aria-label="Use current location"
                        className="hidden shrink-0 text-(--primaryText) transition hover:text-(--secondryColor) lg:block"
                    >
                        <LuLocateFixed size={25} />
                    </button>

                    {/* Actions */}
                    <div className="mt-2 flex gap-2 px-2 pb-1 md:ml-6 md:mt-0 md:px-0 md:pb-0">
                        {/* Filters */}
                        <button type="button" className="flex items-center gap-2 rounded-full bg-(--secondryText)/20 px-4 py-2.5 text-sm text-(--secondryText) transition hover:bg-(--secondryText)/35">
                            <LuFilter size={17} />
                            Filters
                        </button>

                        {/* Find Job */}
                        <button type="submit" className="rounded-full bg-(--secondryColor) px-5 py-2.5 text-sm font-medium text-(--primaryColor) transition hover:bg-(--secondryColor)/50">
                            Find Job
                        </button>
                    </div>
                </form>

                {/* Popular Searches */}
                {/* <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-(--secondryText)">
                    <span className="font-medium text-(--primaryText)">
                        Popular searches:
                    </span>

                    {popularSearches.map((item) => {
                        const isActive = activeSearch === item;

                        return (
                            <button key={item} type="button" onClick={() => handlePopularSearch(item)}
                                className={
                                    isActive
                                        ? "rounded-full bg-(--secondryColor) px-4 py-2 text-(--primaryColor)"
                                        : "rounded-full px-1 py-1 transition hover:text-(--secondryColor)"
                                }
                            >
                                {item}
                            </button>
                        );
                    })}

                    {/* Clear */}
                {/* {activeSearch && (
                    <button className="text-xs font-medium text-(--secondryColor) transition hover:text-(--secondryColor)"
                        type="button" onClick={() => { setActiveSearch(""); setKeyword(""); }} >
                        Clear
                    </button>
                )} */}
                {/* </div> */}
            </div>
        </section>
    );
}
