"use client"

import { useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { DottedMap, GlobeIcon, FlatMapIcon } from "@/lib/dotted-map"
import type { MarkerData, ViewMode } from "@/lib/dotted-map"
import { cn } from "@/lib/utils"

const ACADEMY_LOCATIONS: Array<{ id: string; latitude: number; longitude: number; name: string }> = [
  { id: "sao-paulo", latitude: -23.55, longitude: -46.63, name: "São Paulo" },
  { id: "rio", latitude: -22.91, longitude: -43.17, name: "Rio de Janeiro" },
  { id: "florianopolis", latitude: -27.59, longitude: -48.55, name: "Florianópolis" },
  { id: "los-angeles", latitude: 34.05, longitude: -118.24, name: "Los Angeles" },
  { id: "new-york", latitude: 40.71, longitude: -74.01, name: "New York" },
  { id: "london", latitude: 51.51, longitude: -0.13, name: "London" },
  { id: "tokyo", latitude: 35.68, longitude: 139.69, name: "Tokyo" },
  { id: "abu-dhabi", latitude: 24.45, longitude: 54.37, name: "Abu Dhabi" },
  { id: "lisbon", latitude: 38.72, longitude: -9.14, name: "Lisbon" },
  { id: "sydney", latitude: -33.87, longitude: 151.21, name: "Sydney" },
  { id: "paris", latitude: 48.85, longitude: 2.35, name: "Paris" },
  { id: "moscow", latitude: 55.75, longitude: 37.62, name: "Moscow" },
]

export function AcademiesGlobeSection() {
  const t = useTranslations("home.academies-globe")
  const [viewMode, setViewMode] = useState<ViewMode>("globe")

  const markers: MarkerData[] = useMemo(() => {
    return ACADEMY_LOCATIONS.map((academy) => ({
      id: academy.id,
      latitude: academy.latitude,
      longitude: academy.longitude,
      data: { name: academy.name },
    }))
  }, [])

  return (
    <section className="container mx-auto px-4 pt-10 md:py-20">
      <div className="flex flex-col items-center text-center mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-brand-blue-50 max-w-2xl">
          {t("title")}
        </h2>
        <p className="text-sm md:text-base text-gray-200 mt-2 max-w-xl">
          {t("subtitle")}
        </p>
      </div>

      <div className="w-full max-w-3xl mx-auto rounded-2xl  p-4 md:p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-brand-blue-50">
          </div>

          <div className="inline-flex items-center gap-1 rounded-full border border-gray-700 bg-gray-1300 p-1">
            <button
              type="button"
              onClick={() => setViewMode("flat")}
              aria-pressed={viewMode === "flat"}
              aria-label={t("toggle-flat")}
              className={cn(
                "flex items-center justify-center rounded-full p-1.5 transition-colors",
                viewMode === "flat"
                  ? "bg-brand-blue-600 text-white"
                  : "text-gray-200 hover:text-white"
              )}
            >
              <FlatMapIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("globe")}
              aria-pressed={viewMode === "globe"}
              aria-label={t("toggle-globe")}
              className={cn(
                "flex items-center justify-center rounded-full p-1.5 transition-colors",
                viewMode === "globe"
                  ? "bg-brand-blue-600 text-white"
                  : "text-gray-200 hover:text-white"
              )}
            >
              <GlobeIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative w-full h-[320px] md:h-[420px] rounded-xl overflow-hidden">
          <DottedMap
            className="absolute inset-0 w-full h-full"
            markers={markers}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            darkMode
            autoRotate
            activeMarkerIds={[markers[0].id]}
            theme={{
              dotColor: "#334155",
              globeFill: "#0b1220",
              clusterColor: "#2563eb",
              clusterTextColor: "#ffffff",
              clusterBorderColor: "#60a5fa",
              activeGlow: "#3b82f6",
              activeBadgeColor: "#3b82f6",
            }}
          />
        </div>
      </div>
    </section>
  )
}
