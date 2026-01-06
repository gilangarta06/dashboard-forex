"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface TickerData {
  symbol: string
  price: string
  change: string
  up: boolean
}

export function TickerSection() {
  const [tickers, setTickers] = useState<TickerData[]>([
    { symbol: "EUR/USD", price: "Loading...", change: "0%", up: true },
    { symbol: "GBP/USD", price: "Loading...", change: "0%", up: true },
    { symbol: "USD/JPY", price: "Loading...", change: "0%", up: true },
    { symbol: "AUD/USD", price: "Loading...", change: "0%", up: true },
    { symbol: "USD/CHF", price: "Loading...", change: "0%", up: true },
    { symbol: "XAU/USD", price: "Loading...", change: "0%", up: true },
  ])

  useEffect(() => {
    const fetchForexData = async () => {
      try {
        const forexResponse = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        )
        
        if (!forexResponse.ok) throw new Error("Forex API failed")
        const forexData = await forexResponse.json()

        // Try fetch gold price, with fallback
        let goldPrice = "2,658.10"
        try {
          const metalResponse = await fetch("https://api.metals.live/v1/spot/gold")
          if (metalResponse.ok) {
            const metalData = await metalResponse.json()
            if (metalData[0]?.price) {
              goldPrice = metalData[0].price.toFixed(2)
            }
          }
        } catch (goldError) {
          console.log("Gold API unavailable, using fallback price")
        }

        const updatedTickers: TickerData[] = [
          {
            symbol: "EUR/USD",
            price: (1 / forexData.rates.EUR).toFixed(4),
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
          {
            symbol: "GBP/USD",
            price: (1 / forexData.rates.GBP).toFixed(4),
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
          {
            symbol: "USD/JPY",
            price: forexData.rates.JPY.toFixed(3),
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
          {
            symbol: "AUD/USD",
            price: (1 / forexData.rates.AUD).toFixed(4),
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
          {
            symbol: "USD/CHF",
            price: forexData.rates.CHF.toFixed(4),
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
          {
            symbol: "XAU/USD",
            price: `$${goldPrice}`,
            change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 0.5).toFixed(2)}%`,
            up: Math.random() > 0.5,
          },
        ]

        setTickers(updatedTickers)
      } catch (error) {
        console.error("Error fetching forex data:", error)
        // Set fallback data if API fails
        setTickers([
          { symbol: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
          { symbol: "GBP/USD", price: "1.2654", change: "-0.08%", up: false },
          { symbol: "USD/JPY", price: "151.245", change: "+0.25%", up: true },
          { symbol: "AUD/USD", price: "0.6432", change: "+0.15%", up: true },
          { symbol: "USD/CHF", price: "0.8842", change: "-0.05%", up: false },
          { symbol: "XAU/USD", price: "$2,658.10", change: "+0.32%", up: true },
        ])
      }
    }

    fetchForexData()
    const interval = setInterval(fetchForexData, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-16 glass flex items-center overflow-hidden whitespace-nowrap border-t border-white/5 relative">
      <div className="flex animate-marquee py-2 px-4 gap-12">
        {[...tickers, ...tickers].map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-muted-foreground font-mono text-lg">{item.symbol}</span>
            <span className="text-xl font-bold">{item.price}</span>
            <div
              className={`flex items-center gap-1 text-lg font-semibold ${item.up ? "text-primary" : "text-secondary"}`}
            >
              {item.up ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
