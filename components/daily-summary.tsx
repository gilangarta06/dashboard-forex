"use client"

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const stats = [
  { label: "Daily Profit", value: "+12.4%", sub: "+$4,240.50", color: "text-primary" },
  { label: "Win Rate", value: "78%", sub: "14W / 4L", color: "text-white" },
  { label: "Closed Trades", value: "18", sub: "Last 24h", color: "text-white" },
]

const winRateData = [
  { name: "Wins", value: 78 },
  { name: "Losses", value: 22 },
]

export function DailySummary() {
  return (
    <div className="flex flex-col h-full p-6 gap-6 bg-white/2 backdrop-blur-md border-l border-white/5 overflow-y-auto">
      <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-2">DAILY PERFORMANCE</h2>

      <div className="flex flex-col gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-none">
            <CardContent className="p-6">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-lg font-medium text-white/60 font-mono">{stat.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex-1 glass rounded-3xl p-6 flex flex-col items-center justify-center relative min-h-[300px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-5xl font-black text-white">78%</span>
          <span className="text-sm font-bold text-muted-foreground uppercase">Accuracy</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={winRateData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="oklch(0.7 0.2 150)" />
              <Cell fill="oklch(0.25 0.03 260)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="p-4 glass rounded-2xl border border-primary/20 bg-primary/5">
        <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-2 text-center">
          Top Performing Asset
        </h4>
        <div className="flex justify-between items-center px-4 py-2">
          <span className="text-2xl font-black tracking-wider text-white">BTC/USD</span>
          <span className="text-2xl font-mono text-primary font-bold">+6.2%</span>
        </div>
      </div>
    </div>
  )
}
