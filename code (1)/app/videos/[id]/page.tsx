import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

const videos = [
  {
    id: 1,
    title: "치매예방 손운동",
    duration: "영상1",
    videoUrl: "https://www.youtube.com/embed/FEqlXiczz4g",
  },
  {
    id: 2,
    title: "치매예방체조 1",
    duration: "영상2",
    videoUrl: "https://www.youtube.com/embed/uiV_1fREGew",
  },
  {
    id: 3,
    title: "힘뇌체조",
    duration: "영상3",
    videoUrl: "https://www.youtube.com/embed/DTU72r3ygDE",
  },
  {
    id: 4,
    title: "치매예방체조 2",
    duration: "영상4",
    videoUrl: "https://www.youtube.com/embed/daxSkFOa4kM",
  },
]

export default function VideoPlayerPage({ params }: { params: { id: string } }) {
  const video = videos.find((v) => v.id === Number.parseInt(params.id))

  if (!video) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <Link href="/videos">
            <Button variant="ghost" size="lg" className="text-lg">
              <ArrowLeft className="w-6 h-6 mr-2" />
              목록으로
            </Button>
          </Link>
        </div>
      </header>

      {/* Video Player */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
            <iframe
              className="w-full h-full"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">{video.title}</h1>
            <p className="text-xl text-muted-foreground mb-2">재생시간: {video.duration}</p>
            <p className="text-xl text-muted-foreground mb-8">매일 꾸준히 따라하면 두뇌 건강에 도움이 됩니다</p>

            <Link href="/quiz">
              <Button size="lg" className="text-xl px-8 py-6">
                퀴즈 풀러가기
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
