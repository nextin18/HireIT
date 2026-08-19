type SkeletonProps = {
  className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`home-skeleton rounded-lg ${className}`} />;
}

function JobCardSkeleton() {
  return (
    <div className="flex min-h-48.75 flex-col justify-between rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-4">
      <div>
        <Skeleton className="h-8 w-3/4" />
        <div className="mt-3 flex items-center gap-4">
          <Skeleton className="h-7 w-24 rounded" />
          <Skeleton className="h-5 w-36" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-start gap-2">
          <Skeleton className="h-18 w-18 shrink-0 rounded-full" />
          <div className="mt-2 ml-1 space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
        <Skeleton className="h-7 w-7 rounded-md" />
      </div>
    </div>
  );
}

export default function JobSearchLoading() {
  return (
    <div className="min-h-full w-full sm:px-7 lg:px-6 xl:px-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
