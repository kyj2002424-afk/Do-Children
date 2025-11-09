"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const mmseQuestions = [
  { id: 1, question: "올해는 몇 년도입니까?", points: 1 },
  { id: 2, question: "지금은 무슨 계절입니까?", points: 1 },
  { id: 3, question: "오늘은 며칠입니까?", points: 1 },
  { id: 4, question: "오늘은 무슨 요일입니까?", points: 1 },
  { id: 5, question: "지금은 몇 월입니까?", points: 1 },
  { id: 6, question: "우리가 있는 이곳은 무슨 도/특별시/광역시입니까?", points: 1 },
  { id: 7, question: "여기는 무슨 시/군/구입니까?", points: 1 },
  { id: 8, question: "여기는 무슨 구/동/읍/면입니까?", points: 1 },
  { id: 9, question: "우리는 지금 이 건물의 몇 층에 있습니까?", points: 1 },
  { id: 10, question: "이 장소의 이름이 무엇입니까?", points: 1 },
  {
    id: 11,
    question:
      "제가 세 가지 물건의 이름을 말씀드리겠습니다. 끝까지 다 들으신 다음에 세 가지 물건의 이름을 모두 말씀해 보십시오. (나무, 자동차, 모자)",
    subQuestions: ["나무", "자동차", "모자"],
    points: 3,
  },
  {
    id: 12,
    question: "100에서 7을 빼면 얼마가 됩니까? (5회 반복)",
    subQuestions: ["100 - 7 = ?", "93 - 7 = ?", "86 - 7 = ?", "79 - 7 = ?", "72 - 7 = ?"],
    points: 5,
  },
  {
    id: 13,
    question: "조금 전에 제가 기억하라고 말씀드렸던 세 가지 물건의 이름이 무엇인지 말씀하여 주십시오.",
    subQuestions: ["나무", "자동차", "모자"],
    points: 3,
  },
  {
    id: 14,
    question: "이것을 무엇이라고 합니까? (실제 시계와 연필을 보여주며)",
    subQuestions: ["시계", "연필"],
    points: 2,
  },
  { id: 15, question: "제가 하는 말을 끝까지 듣고 따라해 보십시오: '간장공장 공장장'", points: 1 },
  {
    id: 16,
    question:
      "지금부터 제가 말씀드리는 대로 해보십시오. 제가 종이를 한 장 드릴 것입니다. 그러면 그 종이를 오른손으로 받아, 반으로 접은 다음, 무릎 위에 올려놓으십시오.",
    subQuestions: ["오른손으로 받는다", "반으로 접는다", "무릎 위에 놓는다"],
    points: 3,
  },
  { id: 17, question: "겹친 오각형 그림을 아래 빈 곳에 그대로 그려보십시오.", points: 1, hasImage: true },
  { id: 18, question: "옷은 왜 빨아서 입습니까?", points: 1 },
  { id: 19, question: "'티끌 모아 태산'은 무슨 뜻입니까?", points: 1 },
]

const thresholdTable = {
  "60-69": {
    male: { "0-3": 20, "4-6": 24, "7-12": 25, "13+": 26 },
    female: { "0-3": 19, "4-6": 23, "7-12": 25, "13+": 26 },
  },
  "70-74": {
    male: { "0-3": 21, "4-6": 23, "7-12": 25, "13+": 26 },
    female: { "0-3": 18, "4-6": 21, "7-12": 25, "13+": 26 },
  },
  "75-79": {
    male: { "0-3": 20, "4-6": 22, "7-12": 25, "13+": 25 },
    female: { "0-3": 17, "4-6": 21, "7-12": 24, "13+": 26 },
  },
  "80+": {
    male: { "0-3": 18, "4-6": 22, "7-12": 24, "13+": 25 },
    female: { "0-3": 16, "4-6": 20, "7-12": 24, "13+": 27 },
  },
}

export default function ScreeningPage() {
  const [step, setStep] = useState<"demographics" | "test" | "result">("demographics")
  const [demographics, setDemographics] = useState({
    age: "",
    gender: "",
    education: "",
  })
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})

  const handleDemographicsSubmit = () => {
    if (!demographics.age || !demographics.gender || !demographics.education) {
      alert("모든 항목을 선택해 주세요.")
      return
    }
    setStep("test")
  }

  const handleAnswerChange = (questionId: number, subIndex: number | null, value: number) => {
    const key = subIndex !== null ? questionId * 100 + subIndex : questionId
    setAnswers({ ...answers, [key]: value })
  }

  const calculateTotalScore = () => {
    let total = 0
    mmseQuestions.forEach((q) => {
      if (q.subQuestions) {
        q.subQuestions.forEach((_, idx) => {
          const key = q.id * 100 + idx
          if (answers[key] === 1) total += 1
        })
      } else {
        if (answers[q.id] === 1) total += 1
      }
    })
    return total
  }

  const getThreshold = () => {
    const ageGroup =
      Number.parseInt(demographics.age) >= 80
        ? "80+"
        : Number.parseInt(demographics.age) >= 75
          ? "75-79"
          : Number.parseInt(demographics.age) >= 70
            ? "70-74"
            : "60-69"
    const gender = demographics.gender === "male" ? "male" : "female"
    const education = demographics.education as "0-3" | "4-6" | "7-12" | "13+"

    return thresholdTable[ageGroup as keyof typeof thresholdTable][gender][education]
  }

  const handleSubmit = () => {
    const totalQuestions = mmseQuestions.reduce((sum, q) => {
      return sum + (q.subQuestions ? q.subQuestions.length : 1)
    }, 0)

    const answeredCount = Object.keys(answers).length

    if (answeredCount < totalQuestions) {
      alert("모든 문항에 답변해 주세요.")
      return
    }
    setStep("result")
  }

  if (step === "demographics") {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="lg" className="mb-4">
              <ArrowLeft className="w-6 h-6 mr-2" />
              <span className="text-xl">돌아가기</span>
            </Button>
          </Link>

          <Card className="p-8">
            <h1 className="text-3xl font-bold text-center mb-2">치매 선별검사 (보호자용)</h1>
            <p className="text-center text-lg text-muted-foreground mb-8">
              치매 선별용 한국어판 간이정신상태검사 (MMSE-DS)
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xl font-bold mb-3">대상자 연령</label>
                <div className="grid grid-cols-2 gap-3">
                  {["60-69세", "70-74세", "75-79세", "80세 이상"].map((age, idx) => (
                    <button
                      key={age}
                      onClick={() =>
                        setDemographics({
                          ...demographics,
                          age: ["65", "72", "77", "85"][idx],
                        })
                      }
                      className={`p-4 text-lg border-2 rounded-lg transition-colors ${
                        demographics.age === ["65", "72", "77", "85"][idx]
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold mb-3">대상자 성별</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "남성", value: "male" },
                    { label: "여성", value: "female" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDemographics({ ...demographics, gender: option.value })}
                      className={`p-4 text-lg border-2 rounded-lg transition-colors ${
                        demographics.gender === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xl font-bold mb-3">대상자 교육 수준</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "무학 (0-3년)", value: "0-3" },
                    { label: "초졸 (4-6년)", value: "4-6" },
                    { label: "중·고졸 (7-12년)", value: "7-12" },
                    { label: "대학 이상 (13년+)", value: "13+" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDemographics({ ...demographics, education: option.value })}
                      className={`p-4 text-lg border-2 rounded-lg transition-colors ${
                        demographics.education === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button onClick={handleDemographicsSubmit} className="w-full h-14 text-xl mt-6">
                검사 시작하기
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "test") {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              size="lg"
              className="mb-4"
              onClick={() => {
                setStep("demographics")
                setAnswers({})
              }}
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              <span className="text-xl">돌아가기</span>
            </Button>
            <h1 className="text-4xl font-bold text-center mb-2">치매 선별검사 (보호자용)</h1>
            <p className="text-xl text-center text-muted-foreground">MMSE-DS (총 30점)</p>
          </div>

          <div className="space-y-6 mb-8">
            {mmseQuestions.map((q) => (
              <Card key={q.id} className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {q.id}. {q.question}
                </h3>

                {q.hasImage && (
                  <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-white rounded-lg border-2 border-border">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TUiWbovEHu7QtKbduH8X9fEHUCqEfW.png"
                        alt="겹친 오각형"
                        width={200}
                        height={150}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {q.subQuestions ? (
                  <div className="space-y-3">
                    {q.subQuestions.map((subQ, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <span className="text-lg">{subQ}</span>
                        <div className="flex gap-4">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`q${q.id}-${idx}`}
                              checked={answers[q.id * 100 + idx] === 0}
                              onChange={() => handleAnswerChange(q.id, idx, 0)}
                              className="w-5 h-5 mr-2"
                            />
                            <span className="text-lg">0점</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name={`q${q.id}-${idx}`}
                              checked={answers[q.id * 100 + idx] === 1}
                              onChange={() => handleAnswerChange(q.id, idx, 1)}
                              className="w-5 h-5 mr-2"
                            />
                            <span className="text-lg">1점</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer flex-1 hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        checked={answers[q.id] === 0}
                        onChange={() => handleAnswerChange(q.id, null, 0)}
                        className="w-5 h-5 mr-3"
                      />
                      <span className="text-lg">0점 (틀림)</span>
                    </label>
                    <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer flex-1 hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name={`q${q.id}`}
                        checked={answers[q.id] === 1}
                        onChange={() => handleAnswerChange(q.id, null, 1)}
                        className="w-5 h-5 mr-3"
                      />
                      <span className="text-lg">1점 (맞음)</span>
                    </label>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="sticky bottom-4">
            <Button onClick={handleSubmit} className="w-full h-16 text-2xl font-bold" size="lg">
              검사 결과 확인하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const totalScore = calculateTotalScore()
  const threshold = getThreshold()
  const needsReferral = totalScore <= threshold

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <CheckCircle2 className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="text-3xl font-bold mb-4">검사 완료</h1>

          <div className="my-8 p-6 bg-muted rounded-lg">
            <p className="text-lg mb-2">MMSE-DS 총점</p>
            <p className="text-5xl font-bold text-primary mb-4">{totalScore} / 30점</p>

            <div className="mt-6 p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">해당 연령/성별/교육수준 기준점</p>
              <p className="text-2xl font-bold">{threshold}점</p>
            </div>

            <div className={`mt-6 p-6 rounded-lg ${needsReferral ? "bg-red-50" : "bg-green-50"}`}>
              <p className={`text-2xl font-bold mb-3 ${needsReferral ? "text-red-600" : "text-green-600"}`}>
                {needsReferral ? "⚠️ 진단검사 권장" : "✓ 정상 범위"}
              </p>
              <p className="text-lg">
                {needsReferral
                  ? "기준점 이하로 인지 기능 저하가 의심됩니다. 병원이나 의원에서 정밀 진단검사를 받으시기 바랍니다."
                  : "현재 인지 기능이 정상 범위에 있습니다. 건강한 생활 습관을 유지하시고 정기적으로 검사를 받으세요."}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => {
                setStep("demographics")
                setAnswers({})
                setDemographics({ age: "", gender: "", education: "" })
              }}
              className="w-full h-14 text-xl"
            >
              다시 검사하기
            </Button>
            <Link href="/" className="block">
              <Button variant="outline" className="w-full h-14 text-xl bg-transparent">
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
