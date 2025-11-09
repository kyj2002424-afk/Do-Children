import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Brain, ClipboardCheck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">두뇌 건강</h1>
          <p className="text-xl text-muted-foreground">집중력 및 기억력 향상 프로그램</p>
        </div>

        {/* Main Action Buttons */}
        <div className="w-full max-w-md space-y-6">
          <Link href="/screening" className="block">
            <Button
              size="lg"
              className="w-full h-20 text-2xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <ClipboardCheck className="w-8 h-8 mr-3" />
              치매 선별검사(보호자용)
            </Button>
          </Link>

          <Link href="/videos" className="block">
            <Button
              size="lg"
              className="w-full h-20 text-2xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Play className="w-8 h-8 mr-3" />
              동영상 보러가기
            </Button>
          </Link>

          <Link href="/quiz" className="block">
            <Button
              size="lg"
              className="w-full h-20 text-2xl font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Brain className="w-8 h-8 mr-3" />
              퀴즈 풀러가기
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 text-lg text-muted-foreground">
            <Link href="/guide" className="hover:text-foreground transition-colors">
              이용안내
            </Link>
            <span className="text-border">|</span>
            <Link href="/notice" className="hover:text-foreground transition-colors">
              공지사항
            </Link>
            <span className="text-border">|</span>
            <Link href="/login" className="hover:text-foreground transition-colors">
              로그인
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
