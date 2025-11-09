import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, RotateCcw, Play } from "lucide-react"

export default async function QuizResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>
  searchParams: Promise<{ score?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  const score = Number.parseInt(resolvedSearchParams.score || "0")
  const total = resolvedParams.type === "math" ? 5 : 3
  const percentage = (score / total) * 100

  const getMessage = () => {
    if (percentage >= 80) return "훌륭합니다!"
    if (percentage >= 60) return "잘하셨습니다!"
    if (percentage >= 40) return "좋아요!"
    return "다시 한번 도전해보세요!"
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        <Card className="text-center">
          <CardContent className="p-8 md:p-12">
            {/* Trophy Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/10 mb-6">
              <Trophy className="w-12 h-12 text-accent" />
            </div>

            {/* Completion Message */}
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">수고하셨습니다!</h1>
            <p className="text-2xl text-muted-foreground mb-8">오늘의 퀴즈 완료</p>

            {/* Score Display */}
            <div className="bg-muted rounded-lg p-8 mb-8">
              <p className="text-xl text-muted-foreground mb-2">점수</p>
              <p className="text-6xl font-bold text-primary mb-2">
                {score} / {total}
              </p>
              <p className="text-2xl font-semibold text-accent">{getMessage()}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button size="lg" variant="outline" className="w-full text-xl font-semibold h-16 bg-transparent" asChild>
                <Link href={`/quiz/${resolvedParams.type}`}>
                  <RotateCcw className="w-6 h-6 mr-2" />
                  다시 풀기
                </Link>
              </Button>

              <Button size="lg" className="w-full text-xl font-semibold h-16" asChild>
                <Link href="/videos">
                  <Play className="w-6 h-6 mr-2" />
                  추천 영상 보기
                </Link>
              </Button>

              <Button size="lg" variant="secondary" className="w-full text-xl font-semibold h-16" asChild>
                <Link href="/">홈으로 돌아가기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
