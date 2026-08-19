const Skeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`
        rounded-lg
        home-skeleton
        ${className}
      `}
    />
  );
};

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
      
      {/* ================= LEFT SIDE ================= */}
      <div className="min-w-0">

        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-9 w-72" />
          <Skeleton className="mt-3 h-5 w-96 max-w-full" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          <div className="flex items-center gap-5 rounded-2xl bg-(--extralightBlue) p-6">
            <Skeleton className="h-20 w-20 rounded-2xl" />

            <div className="flex-1">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="mt-2 h-5 w-24" />
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-2xl bg-(--extraLightYellow) p-6">
            <Skeleton className="h-20 w-20 rounded-2xl" />

            <div className="flex-1">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="mt-2 h-5 w-28" />
            </div>
          </div>

          <div className="flex items-center gap-5 rounded-2xl bg-(--extraLightGreen) p-6">
            <Skeleton className="h-20 w-20 rounded-2xl" />

            <div className="flex-1">
              <Skeleton className="h-10 w-16" />
              <Skeleton className="mt-2 h-5 w-24" />
            </div>
          </div>

        </div>

        {/* Profile Banner */}
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-(--bg) p-7">
          <div className="flex items-center gap-5">
            <Skeleton className="h-16 w-16 shrink-0 rounded-full" />

            <div>
              <Skeleton className="h-6 w-80 max-w-full" />
              <Skeleton className="mt-3 h-5 w-96 max-w-full" />
            </div>
          </div>

          <Skeleton className="h-14 w-40 rounded-xl" />
        </div>

        {/* Your Feed */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="space-y-5">

            {/* Feed 1 */}
            <FeedSkeleton hasImage />

            {/* Feed 2 */}
            <FeedSkeleton />

            {/* Feed 3 */}
            <FeedSkeleton hasImage />

          </div>
        </div>
      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="min-w-0 space-y-5">

        {/* People You May Like */}
        <div className="rounded-2xl border border-(--darkGrey) bg-(--primaryColor) p-6">

          <Skeleton className="h-6 w-48" />

          <div className="mt-6 space-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <Skeleton className="h-12 w-12 shrink-0 rounded-full" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-2 h-3 w-36" />
                </div>

                <Skeleton className="h-9 w-20 rounded-full" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-6 h-4 w-24" />
        </div>


        {/* Recommended Jobs */}
        <div className="rounded-2xl border border-(--darkGrey) bg-(--primaryColor) p-6">

          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="mt-6 space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <JobSkeleton key={index} />
            ))}
          </div>

        </div>


        {/* Trending Topics */}
        <div className="rounded-2xl border border-(--darkGrey) bg-(--primaryColor) p-6">

          <Skeleton className="h-6 w-40" />

          <div className="mt-5 space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-2 h-4 w-32" />
                <Skeleton className="mt-2 h-3 w-20" />
              </div>
            ))}
          </div>

          <Skeleton className="mt-5 h-4 w-24" />

        </div>

      </div>

    </div>
  );
}


/* ================================================= */
/* FEED SKELETON */
/* ================================================= */

function FeedSkeleton({
  hasImage = false,
}: {
  hasImage?: boolean;
}) {
  return (
    <div className="rounded-xl border border-(--darkGrey) bg-(--primaryColor) p-5">

      {/* User */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />

          <div>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-2 h-3 w-44" />
          </div>
        </div>

        <Skeleton className="h-8 w-16 rounded-full" />
      </div>


      {/* Text */}
      <div className="mt-5 space-y-3">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[70%]" />
      </div>


      {/* Image */}
      {hasImage && (
        <Skeleton className="mt-5 h-[280px] w-full rounded-lg" />
      )}


      {/* Actions */}
      <div className="mt-5 flex gap-7 border-t border-(--darkGrey) pt-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

    </div>
  );
}


/* ================================================= */
/* JOB SKELETON */
/* ================================================= */

function JobSkeleton() {
  return (
    <div className="rounded-xl bg-(--secondrybg) p-5">

      <div className="flex gap-3">
        <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />

        <div className="flex-1">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="mt-2 h-3 w-40" />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-4 w-20 self-center" />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>

    </div>
  );
}
