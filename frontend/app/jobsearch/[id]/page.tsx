import jobs from "@/lib/data/job.json"; 
import LeftSide from "@/components/jobsearch/jobDetails/LeftSide";
import RightSide from "@/components/jobsearch/jobDetails/RightSide";
import RelatedJob from "@/components/jobsearch/jobDetails/RelatedJob";



export default async function JobDetails({ params, }: { params: Promise<{ id: string }>; }) {


    const { id } = await params;

    const job = jobs.find((job) => String(job.id) === id);

    if (!job) {
        return <div>Job not found</div>;
    }



    return (
        <div className="flex flex-col gap-10 px-10">

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">

                <LeftSide company_name={job.company_name} company_logo={job.company_logo} title={job.title} description={job.description ?? ""} requirements={job.requirements ?? []} benefits={job.benefits ?? []} job_type={job.job_type} />
                <RightSide salary={job.salary} location={job.location} posted_date={job.posted_date ?? ""} expire_date={job.expire_date ?? ""} job_level={job.job_level ?? ""} education={job.education ?? ""} />

            </div>

            {/* Related Jobs */}

            <RelatedJob />

        </div>








    );
}