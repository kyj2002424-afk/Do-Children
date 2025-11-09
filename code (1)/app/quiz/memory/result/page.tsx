"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, RotateCcw } from "lucide-react"

export default function MemoryResultPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const score = Number.parseInt(searchParams.get("score") || "0")
  const totalQuestions = 3
  const maxScore = totalQuestions * 5

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <Link href="/quiz">
            <Button variant="ghost" size="lg" className="text-lg">
              <ArrowLeft className="w-6 h-6 mr-2" />
              퀴즈 선택
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Card>
            <CardContent className="p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">퀴즈 완료!</h1>

              <div className="mb-8">
                <p className="text-2xl text-muted-foreground mb-4">총 {totalQuestions}문항</p>
                <p className="text-6xl font-bold text-primary mb-4">
                  {score} / {maxScore}
                </p>
                <p className="text-2xl text-muted-foreground">정답률: {Math.round((score / maxScore) * 100)}%</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-xl font-semibold h-16 px-8"
                  onClick={() => router.push("/quiz/memory")}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  다시 풀기
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl font-semibold h-16 px-8 bg-transparent"
                  onClick={() => router.push("/quiz")}
                >
                  퀴즈 선택
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
