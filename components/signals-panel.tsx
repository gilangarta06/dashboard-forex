"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"

interface Signal {
  pair: string
  type: "BUY" | "SELL"
  price: string
  tp: string
  sl: string
  status: string
  time: string
}

export function SignalsPanel() {
  const [signals, setSignals] = useState<Signal[]>([
    { pair: "GBP/JPY", type: "BUY", price: "Loading...", tp: "193.200", sl: "191.800", status: "Active", time: "12m ago" },
    { pair: "XAU/USD", type: "SELL", price: "Loading...", tp: "2,642.00", sl: "2,668.50", status: "Active", time: "24m ago" },
    { pair: "USD/JPY", type: "BUY", price: "Loading...", tp: "152.500", sl: "149.800", status: "Pending", time: "1h ago" },
    { pair: "EUR/USD", type: "SELL", price: "Loading...", tp: "1.0780", sl: "1.0910", status: "Closed", time: "2h ago" },
  ])

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch forex prices
        const forexResponse = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        )
        const forexData = await forexResponse.json()

        // Fetch gold price
        const metalResponse = await fetch(
          "https://api.metals.live/v1/spot/gold"
        )
        const metalData = await metalResponse.json()

        const updatedSignals: Signal[] = [
          {
            pair: "GBP/JPY",
            type: "BUY",
            price: ((forexData.rates.JPY / forexData.rates.GBP)).toFixed(3),
            tp: "193.200",
            sl: "191.800",
            status: "Active",
            time: "12m ago",
          },
          {
            pair: "XAU/USD",
            type: "SELL",
            price: metalData[0]?.price ? metalData[0].price.toFixed(2) : "2,658.10",
            tp: "2,642.00",
            sl: "2,668.50",
            status: "Active",
            time: "24m ago",
          },
          {
            pair: "USD/JPY",
            type: "BUY",
            price: forexData.rates.JPY.toFixed(3),
            tp: "152.500",
            sl: "149.800",
            status: "Pending",
            time: "1h ago",
          },
          {
            pair: "EUR/USD",
            type: "SELL",
            price: (1 / forexData.rates.EUR).toFixed(4),
            tp: "1.0780",
            sl: "1.0910",
            status: "Closed",
            time: "2h ago",
          },
        ]

        setSignals(updatedSignals)
      } catch (error) {
        console.error("Error fetching price data:", error)
      }
    }

    fetchPrices()
    const interval = setInterval(fetchPrices, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-6 h-full p-6 bg-white/2 backdrop-blur-md border-r border-white/5 overflow-y-auto">
      <h2 className="text-2xl font-bold tracking-tight text-white/90 mb-2">TRADING SIGNALS</h2>
      {signals.map((signal, i) => (
        <Card
          key={i}
          className={`glass overflow-hidden border-none transition-all ${signal.type === "BUY" ? "glow-green bg-primary/5" : "glow-red bg-secondary/5"}`}
        >
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black tracking-wider leading-none">{signal.pair}</h3>
                <span className="text-sm text-muted-foreground font-mono mt-1 block">{signal.time}</span>
              </div>
              <Badge
                variant={signal.type === "BUY" ? "default" : "destructive"}
                className="text-lg px-3 py-1 font-bold"
              >
                {signal.type}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Entry</span>
                <p className="text-2xl font-mono text-white tracking-tighter">{signal.price}</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Status</span>
                <p
                  className={`text-xl font-bold ${signal.status === "Active" ? "text-primary text-shadow-glow" : "text-muted-foreground"}`}
                >
                  {signal.status}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-2 border-t border-white/5">
              <div className="flex-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Take Profit</span>
                <p className="text-xl font-bold text-primary font-mono">{signal.tp}</p>
              </div>
              <div className="flex-1 text-right">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Stop Loss</span>
                <p className="text-xl font-bold text-secondary font-mono">{signal.sl}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
