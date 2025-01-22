"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, type ChartConfiguration } from "chart.js/auto"

export function CvssDistribution() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chart, setChart] = useState<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const chartConfig: ChartConfiguration = {
      type: "bar",
      data: {
        labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", "9+"],
        datasets: [
          {
            data: [2276, 96, 841, 2174, 14878, 32531, 33451, 50073, 24900, 35837],
            backgroundColor: "#F97316",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      },
    }

    const newChart = new Chart(ctx, chartConfig)
    setChart(newChart)

    return () => newChart.destroy()
  }, [])

  return (
    <div className="h-[300px] sm:h-[400px]">
      <canvas ref={chartRef} />
      <div className="text-center mt-4 text-sm text-muted-foreground">Weighted Average CVSS Score: 7.6</div>
    </div>
  )
}

