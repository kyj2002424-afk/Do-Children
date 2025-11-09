import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Play, Brain, Trophy } from "lucide-react"

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <Link href="/">
            <Button variant="ghost" size="lg" className="mb-4 text-lg">
              <ArrowLeft className="w-6 h-6 mr-2" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">이용안내</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Play className="w-8 h-8 text-primary" />
                동영상 이용방법
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-3">
              <p>1. 홈 화면에서 "동영상 보러가기" 버튼을 누릅니다.</p>
              <p>2. 원하는 영상을 선택하여 시청합니다.</p>
              <p>3. 매일 꾸준히 따라하면 두뇌 건강에 도움이 됩니다.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Brain className="w-8 h-8 text-secondary" />
                퀴즈 이용방법
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-3">
              <p>1. 홈 화면에서 "퀴즈 풀러가기" 버튼을 누릅니다.</p>
              <p>2. 원하는 퀴즈 종류를 선택합니다.</p>
              <p>3. 천천히 생각하며 답을 선택하세요.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Trophy className="w-8 h-8 text-accent" />
                권장 사용법
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-3">
              <p>• 하루에 1-2개의 영상을 시청하세요.</p>
              <p>• 매일 한 가지 퀴즈를 풀어보세요.</p>
              <p>• 가족과 함께 하면 더욱 좋습니다.</p>
              <p>• 편안한 환경에서 이용하세요.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
