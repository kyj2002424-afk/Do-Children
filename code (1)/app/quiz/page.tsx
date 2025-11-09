import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Lightbulb, Brain, Calculator, ArrowLeft } from "lucide-react"

const quizTypes = [
  {
    id: "judgment",
    title: "판단력 퀴즈",
    icon: Lightbulb,
    description: "상황을 판단하는 퀴즈",
  },
  {
    id: "spatial",
    title: "시공간 퀴즈",
    icon: Eye,
    description: "위치와 방향을 인지하는 퀴즈",
  },
  {
    id: "memory",
    title: "기억력 향상 퀴즈",
    icon: Brain,
    description: "단어를 기억하는 퀴즈",
  },
  {
    id: "math",
    title: "수학 퀴즈",
    icon: Calculator,
    description: "간단한 사칙연산 퀴즈",
  },
]

export default function QuizSelectionPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <Link href="/">
            <Button variant="ghost" size="lg" className="mb-4 text-lg">
              <ArrowLeft className="w-6 h-6 mr-2" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">오늘의 두뇌 퀴즈</h1>
        </div>
      </header>

      {/* Quiz Type Selection */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {quizTypes.map((quiz) => {
            const Icon = quiz.icon
            return (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-4 text-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {quiz.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-6">{quiz.description}</p>
                  <Button size="lg" className="w-full text-xl font-semibold h-14" asChild>
                    <Link href={`/quiz/${quiz.id}`}>시작하기</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
