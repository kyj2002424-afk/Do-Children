import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" size="lg" className="mb-6 text-lg">
            <ArrowLeft className="w-6 h-6 mr-2" />
            홈으로
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-center">로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">로그인 기능은 준비중입니다</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
