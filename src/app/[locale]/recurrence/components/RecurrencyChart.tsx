"use client"

import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

type MonthlyData = {
  month: string
  valueInCents: number
  supporters: number
}

type RecurrencyChartProps = {
  data: MonthlyData[]
  currency: string
}

function formatCurrency(cents: number, currency: string) {
  const amount = cents / 100
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "brl",
  }).format(amount)
}

export function RecurrencyChart({ data, currency }: RecurrencyChartProps) {
  const t = useTranslations("recurrence.chart")

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      background: "transparent",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    theme: { mode: "dark" },
    colors: ["#0C53FF", "#10B981"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#2a2a3a",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: data.map((d) => d.month),
      labels: { style: { colors: "#9ca3af" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: t("value-axis"), style: { color: "#9ca3af" } },
        labels: {
          style: { colors: "#9ca3af" },
          formatter: (val) => formatCurrency(val, currency),
        },
      },
      {
        opposite: true,
        title: { text: t("supporters-axis"), style: { color: "#9ca3af" } },
        labels: {
          style: { colors: "#9ca3af" },
          formatter: (val) => String(Math.round(val)),
        },
      },
    ],
    legend: {
      labels: { colors: "#d1d5db" },
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val, { seriesIndex }) =>
          seriesIndex === 0 ? formatCurrency(val, currency) : String(val),
      },
    },
  }

  const series = [
    {
      name: t("monthly-value"),
      data: data.map((d) => d.valueInCents),
    },
    {
      name: t("supporters"),
      data: data.map((d) => d.supporters),
    },
  ]

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-50">{t("title")}</h3>
        <p className="text-sm text-gray-400">{t("description")}</p>
      </div>
      <Chart options={options} series={series} type="area" height={300} />
    </div>
  )
}
