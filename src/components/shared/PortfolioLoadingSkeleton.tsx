"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function PortfolioLoadingSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0D0D18] p-4">
      <Card className="max-w-md w-full bg-[#0D0D18] text-white border-none rounded-xl shadow-xl">
        <CardContent className="space-y-6 p-6">
          {/* Profile Row */}
          <div className="flex gap-3 items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-60" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-[80%]" />
            <Skeleton className="h-3 w-[90%]" />
          </div>

          {/* CTA Button */}
          <Skeleton className="h-9 w-40 rounded-md" />

          {/* Social Media */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <div className="flex gap-3">
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-5 h-5 rounded-full" />
              <Skeleton className="w-5 h-5 rounded-full" />
            </div>
          </div>

          {/* Gallery */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-32" />
              <div className="flex gap-1">
                <Skeleton className="h-6 w-6 rounded" />
                <Skeleton className="h-6 w-6 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="w-20 h-20 rounded-lg" />
              <Skeleton className="w-20 h-20 rounded-lg" />
              <Skeleton className="w-20 h-20 rounded-lg" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t border-gray-800 justify-center">
          <Skeleton className="h-3 w-48" />
        </CardFooter>
      </Card>
    </div>
  );
}
