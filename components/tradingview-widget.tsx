"use client"

import { useEffect, useRef } from "react"

interface TradingViewWidgetProps {
  symbol?: string
  interval?: string
  theme?: "light" | "dark"
  width?: string | number
  height?: string | number
}

export function TradingViewWidget({
  symbol = "BINANCE:BTCUSDT",
  interval = "240",
  theme = "dark",
  width = "100%",
  height = "100%",
}: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (typeof window.TradingView !== "undefined") {
        new window.TradingView.widget({
          autosize: true,
          symbol: symbol,
          interval: interval,
          timezone: "Etc/UTC",
          theme: theme,
          style: "1",
          locale: "en",
          toolbar_bg: "rgba(0, 0, 0, 0)",
          enable_publishing: false,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          container_id: containerRef.current?.id || "tradingview_widget",
          studies: ["STD;RSI"],
          backgroundColor: "rgba(0, 0, 0, 0)",
          gridColor: "rgba(255, 255, 255, 0.06)",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          show_popup_button: false,
          popup_width: "1000",
          popup_height: "650",
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [symbol, interval, theme])

  return (
    <div
      ref={containerRef}
      id="tradingview_widget"
      style={{ width: typeof width === "number" ? `${width}px` : width, height: typeof height === "number" ? `${height}px` : height }}
      className="tradingview-widget-container"
    />
  )
}

declare global {
  interface Window {
    TradingView: any
  }
}
