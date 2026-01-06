"use client"

import { Badge } from "@/components/ui/badge"
import { TradingViewWidget } from "@/components/tradingview-widget"

export function AnalystSummary() {
  return (
    <div className="flex flex-col h-full p-8 gap-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-white mb-2 uppercase">TradingView Chart</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-xl">Real-Time Market Data</span>
            <Badge className="bg-primary/20 text-primary border-primary/30 text-xl px-4 py-1 font-bold">
              LIVE
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold">Symbol</p>
          <p className="text-5xl font-black text-primary leading-tight">XAU/USD</p>
        </div>
      </div>

      <div className="flex-1 glass rounded-3xl p-6 relative overflow-hidden">
        <TradingViewWidget symbol="OANDA:XAUUSD" interval="240" theme="dark" />
      </div>
    </div>
  )
}
