"use client"

import { SignalsPanel } from "@/components/signals-panel"
import { AnalystSummary } from "@/components/analyst-summary"
import { TickerSection } from "@/components/ticker-section"
import { Clock } from "lucide-react"
import { useEffect, useState } from "react"

export default function TradingDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [forexSession, setForexSession] = useState("Market Open")

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)

      // Detect forex session based on UTC time
      const utcHour = now.getUTCHours()
      let session = ""

      if (utcHour >= 0 && utcHour < 7) {
        session = "Tokyo Session"
      } else if (utcHour >= 7 && utcHour < 15) {
        session = "London Session"
      } else if (utcHour >= 15 && utcHour < 21) {
        session = "New York Session"
      } else {
        session = "Sydney Session"
      }

      setForexSession(session)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const currentTimeString = currentTime.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return (
    <main className="flex flex-col h-screen text-white select-none">
      {/* Top Header */}
      <header className="h-24 glass flex items-center justify-between px-10 border-b border-white/5 z-20">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center rotate-45 glow-green">
            <div className="-rotate-45 font-black text-primary-foreground text-2xl">AG</div>
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter leading-none italic uppercase">AG Forex</h1>
            <span className="text-primary font-mono text-sm tracking-[0.3em] font-bold">TRADING TERMINAL</span>
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-muted-foreground font-bold text-sm tracking-widest uppercase">{currentDate}</p>
            <div className="flex items-center justify-end gap-3">
              <Clock className="text-primary" size={24} />
              <p className="text-4xl font-black font-mono tracking-tighter tabular-nums">{currentTimeString}</p>
            </div>
          </div>
          <div className="h-12 w-[1px] bg-white/10" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary animate-ping rounded-full opacity-30" />
              <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-black tracking-widest uppercase">{forexSession}</p>
              <p className="text-xs text-muted-foreground font-bold tracking-wider">ACTIVE NOW</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[450px] flex-shrink-0">
          <SignalsPanel />
        </aside>

        <section className="flex-1 bg-gradient-to-b from-transparent to-primary/5">
          <AnalystSummary />
        </section>
      </div>

      {/* Bottom Ticker Section */}
      <TickerSection />

      {/* CSS for Ticker Animation */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `,
        }}
      />
    </main>
  )
}
