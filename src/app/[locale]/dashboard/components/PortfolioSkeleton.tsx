"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PortfolioSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Cards */}
      <div className="flex flex-wrap gap-4 mt-4">
        {/* Card 1 - Portfólio */}
        <div className="bg-zinc-900 p-4 rounded-lg w-80 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <Skeleton className="h-10 w-10 rounded-full bg-zinc-700" />

            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-24 bg-zinc-700" />
              <Skeleton className="h-3 w-32 bg-zinc-700" />
            </div>
          </div>

          <Skeleton className="h-px w-full bg-zinc-700" />

          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-24 rounded-md bg-zinc-700" />

            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md bg-zinc-700" />
              <Skeleton className="h-8 w-8 rounded-md bg-zinc-700" />
            </div>
          </div>
        </div>

        {/* Card 2 - Upgrade */}
        <div className="bg-zinc-900 p-4 rounded-lg w-64 flex flex-col gap-3">
          <Skeleton className="h-4 w-32 bg-zinc-700" />
          <Skeleton className="h-3 w-40 bg-zinc-700" />
          <Skeleton className="h-8 w-24 rounded-md bg-zinc-700" />
        </div>
      </div>
    </div>
  );
}
