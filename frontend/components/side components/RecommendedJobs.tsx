const recommendedJobs = [
  {
    id: 1,
    title: "Product Designer",
    company_name: "Google",
    location: "Bangalore",
    job_type: "Full-time",
    salary: "₹18-25L/yr",
    work_type: "Remote",
    posted: "Posted 2d ago",
    logo: "G",
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company_name: "Microsoft",
    location: "Hyderabad",
    job_type: "Full-time",
    salary: "₹22-35L/yr",
    work_type: "Hybrid",
    posted: "Posted 1d ago",
    logo: "M",
  },
  {
    id: 3,
    title: "Growth Manager",
    company_name: "Flipkart",
    location: "Remote",
    job_type: "Contract",
    salary: "₹12-18L/yr",
    work_type: "Remote",
    posted: "Posted 3h ago",
    logo: "F",
  },
];

export default function RecommendedJobs() {
  return (
    <div className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-(--primaryText)">
          Recommended Jobs
        </h2>

        <button className="text-sm font-semibold text-(--secondryColor) cursor-pointer">
          See all
        </button>
      </div>

      {/* Jobs */}
      <div className="space-y-5">
        {recommendedJobs.map((job) => (
          <div
            key={job.id}
            className="rounded-xl bg-(--darkGrey)/30 p-4"
          >
            {/* Top */}
            <div className="flex items-start gap-3">
              
              {/* Logo */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-(--darkSkyBlue)/70 text-lg font-bold text-(--primaryColor)">
                {job.logo}
              </div>

              {/* Job info */}
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-(--primaryText)">
                  {job.title}
                </h3>

                <p className="truncate text-sm text-(--secondryText)">
                  {job.company_name} · {job.location}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              
              <span className="rounded-full bg-(--lightSkyBlue)/10 px-2.5 py-1 text-xs font-medium text-(--darkSkyBlue)">
                {job.work_type}
              </span>

              <span className="rounded-full bg-(--lightGreen)/70 px-2.5 py-1 text-xs font-medium text-(--emeraldGreen)">
                {job.job_type}
              </span>

              <span className="text-xs text-(--secondryText)">
                {job.salary}
              </span>
            </div>

            {/* Bottom */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-(--secondryText)">
                {job.posted}
              </span>

              <button className="rounded-lg bg-(--secondryColor)/90 cursor-pointer px-4 py-2 text-sm font-semibold text-(--primaryColor) hover:bg-(--secondryColor)">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}