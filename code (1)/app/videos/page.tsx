import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Play, ArrowLeft } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "치매예방 손운동",
    duration: "영상1",
    thumbnail: "/elderly-hand-exercises.jpg",
    videoUrl: "https://www.youtube.com/watch?v=FEqlXiczz4g",
  },
  {
    id: 2,
    title: "치매예방체조 1",
    duration: "영상2",
    thumbnail: "/dementia-prevention-exercises.jpg",
    videoUrl: "https://www.youtube.com/watch?v=uiV_1fREGew",
  },
  {
    id: 3,
    title: "힘뇌체조",
    duration: "영상3",
    thumbnail: "/brain-exercises-for-seniors.jpg",
    videoUrl: "https://www.youtube.com/watch?v=DTU72r3ygDE",
  },
  {
    id: 4,
    title: "치매예방체조 2",
    duration: "영상4",
    thumbnail: "/dementia-prevention-workout.jpg",
    videoUrl: "https://www.youtube.com/watch?v=daxSkFOa4kM",
  },
]

export default function VideosPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">치매예방 두뇌자극 영상</h1>
        </div>
      </header>

      {/* Video Grid */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4 p-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{video.title}</h3>
                  <p className="text-lg text-muted-foreground">{video.duration}</p>
                </div>
                <Button size="lg" className="w-full text-lg font-semibold" asChild>
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="w-5 h-5 mr-2" />
                    시청하기
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
