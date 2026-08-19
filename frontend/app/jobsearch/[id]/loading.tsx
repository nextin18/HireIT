type SkeletonProps = {
  className?: string;
};

function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`home-skeleton rounded-lg ${className}`} />;
}

function DetailTextSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[94%]" />
      <Skeleton className="h-4 w-[88%]" />
      <Skeleton className="h-4 w-[72%]" />
    </div>
  );
}

function OverviewItemSkeleton() {
  return (
    <div>
      <Skeleton className="h-5 w-5 rounded-md" />
      <Skeleton className="mt-3 h-3 w-20" />
      <Skeleton className="mt-2 h-4 w-24" />
    </div>
  );
}

export default function JobDetailLoading() {
  return (
    <div className="flex flex-col gap-10 px-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="flex w-full flex-col gap-5">
          <section className="flex w-full items-center justify-between gap-5 rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-6">
            <div className="flex min-w-0 items-center gap-5">
              <Skeleton className="h-18 w-18 shrink-0 rounded-full" />
              <div className="min-w-0">
                <Skeleton className="h-8 w-64 max-w-full" />
                <div className="mt-3 flex gap-5">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                </div>
              </div>
            </div>
            <div className="hidden items-center gap-5 sm:flex">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-13 w-42 rounded-full" />
            </div>
          </section>

          <section className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-6">
            <Skeleton className="h-7 w-48" />
            <div className="mt-6"><DetailTextSkeleton /></div>

            <Skeleton className="mt-8 h-7 w-36" />
            <div className="mt-6"><DetailTextSkeleton /></div>

            <Skeleton className="mt-8 h-7 w-24" />
            <div className="mt-6"><DetailTextSkeleton /></div>
          </section>
        </div>

        <aside className="flex w-full flex-col gap-5">
          <section className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) px-6 py-4">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="mt-4 h-6 w-36" />
            <Skeleton className="mt-2 h-3 w-24" />
            <div className="my-4 h-px bg-(--darkGrey)" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-(--secondryColor) bg-(--primaryColor) p-6">
            <Skeleton className="h-7 w-40" />
            <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <OverviewItemSkeleton key={index} />
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section>
        <Skeleton className="h-10 w-56" />
        <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(280px,380px))] gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-44 rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
