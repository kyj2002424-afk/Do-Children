import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_KR } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Chatbot } from "@/components/chatbot"

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "두뇌 건강 - 치매예방 프로그램",
  description: "치매예방을 위한 두뇌자극 영상과 퀴즈",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        <Chatbot />
        <Analytics />
      </body>
    </html>
  )
}
