
type CountryCardSkeletonProps = {
  isDark: boolean;
};

export default function CountryCardSkeleton({
  isDark,
}: CountryCardSkeletonProps) {
  return (
    <article
      className={`h-full overflow-hidden rounded-2xl shadow-sm ${
        isDark
          ? "bg-slate-800 shadow-black/20"
          : "bg-white shadow-slate-200/70"
      }`}
    >
      {/* Flag Placeholder */}
      <div
        className={`h-48 animate-pulse ${
          isDark ? "bg-slate-700" : "bg-slate-200"
        }`}
      />

      {/* Country Information Placeholder */}
      <div className="space-y-5 p-6">
        {/* Country Name */}
        <div
          className={`h-6 w-3/4 animate-pulse rounded ${
            isDark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />

        {/* Population */}
        <div
          className={`h-4 w-2/3 animate-pulse rounded ${
            isDark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />

        {/* Region */}
        <div
          className={`h-4 w-1/2 animate-pulse rounded ${
            isDark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />

        {/* Capital */}
        <div
          className={`h-4 w-3/5 animate-pulse rounded ${
            isDark ? "bg-slate-700" : "bg-slate-200"
          }`}
        />
      </div>
    </article>
  );
}
