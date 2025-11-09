import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const notices: Array<{ id: number; title: string; date: string; content: string }> = []

export default function NoticePage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">공지사항</h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {notices.length === 0 ? (
            <Card>
              <CardContent className="py-16">
                <p className="text-2xl text-center text-muted-foreground">공지사항이 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            notices.map((notice) => (
              <Card key={notice.id}>
                <CardHeader>
                  <CardTitle className="text-2xl">{notice.title}</CardTitle>
                  <p className="text-lg text-muted-foreground">{notice.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">{notice.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}
