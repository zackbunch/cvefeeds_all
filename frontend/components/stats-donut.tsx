"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, type ChartConfiguration } from "chart.js/auto"

export function StatsDonut() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [chart, setChart] = useState<Chart | null>(null)

  const [stats, setStats] = useState({
    created: { daily: 34, weekly: 1221 },
    updated: { daily: 42, weekly: 2389 },
  })

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const chartConfig: ChartConfiguration = {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [stats.created.daily, stats.updated.daily],
            backgroundColor: ["#4F46E5", "#F97316"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }

    const newChart = new Chart(ctx, chartConfig)
    setChart(newChart)

    return () => newChart.destroy()
  }, [stats])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => ({
        created: {
          daily: prevStats.created.daily + Math.floor(Math.random() * 3),
          weekly: prevStats.created.weekly + Math.floor(Math.random() * 10),
        },
        updated: {
          daily: prevStats.updated.daily + Math.floor(Math.random() * 3),
          weekly: prevStats.updated.weekly + Math.floor(Math.random() * 10),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <canvas ref={chartRef} />
      </div>
      <div className="space-y-4 text-center md:text-left">
        <div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-2xl font-bold">{stats.created.daily}</span>
            <span className="text-sm text-muted-foreground">CVEs created,</span>
            <span className="text-2xl font-bold">{stats.updated.daily}</span>
            <span className="text-sm text-muted-foreground">CVEs updated since yesterday</span>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="text-2xl font-bold">{stats.created.weekly}</span>
            <span className="text-sm text-muted-foreground">CVEs created,</span>
            <span className="text-2xl font-bold">{stats.updated.weekly}</span>
            <span className="text-sm text-muted-foreground">CVEs updated in the last 7 days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

