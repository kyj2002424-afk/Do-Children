"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, Send } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const quickQuestions = [
  { id: 1, text: "🧠 치매란 무엇인가?", keyword: "치매란" },
  { id: 2, text: "🔍 조기 발견이 중요한 이유", keyword: "조기발견" },
  { id: 3, text: "💭 기억력 저하의 특징", keyword: "기억력" },
  { id: 4, text: "🏠 일상생활 능력 변화", keyword: "일상생활" },
  { id: 5, text: "📋 치매 선별검사", keyword: "선별검사" },
  { id: 6, text: "📅 검진 주기 및 절차", keyword: "검진절차" },
  { id: 7, text: "⚠️ 치매 의심 시 대처법", keyword: "대처방법" },
  { id: 8, text: "🏃 치매 예방 생활습관", keyword: "예방습관" },
]

const responses: Record<string, string> = {
  치매란:
    "치매는 뇌 기능이 서서히 저하되면서 기억력, 판단력, 말하기, 일상생활 수행능력 등이 점점 어려워지는 질환입니다.\n\n단순한 건망증과 달리, 일상에서 하던 일들을 점점 혼자 하기 어려워집니다.\n\n하지만 초기에 발견하면 약물과 생활 관리로 진행 속도를 늦출 수 있습니다.",

  조기발견:
    "치매는 빠르게 발견할수록 치료 효과가 더 좋고, 증상의 악화를 늦출 수 있는 가능성이 높습니다.\n\n또, 초기에는 우울, 약물 부작용, 영양 문제 등 치료 가능한 원인이 치매처럼 보일 수 있어 조기 검사가 중요합니다.\n\n조기 발견은 본인과 가족의 돌봄 계획, 안전 관리, 경제적 준비에도 큰 도움이 됩니다.",

  기억력:
    "치매에서 나타나는 기억력 저하는 최근에 있었던 일을 더 잘 잊어버리는 것이 특징입니다.\n\n같은 질문을 여러 번 하거나, 물건을 둔 곳을 자주 잊고, 약속을 기억하지 못하기도 합니다. 힌트를 줘도 떠올리기 어려운 경우가 많습니다.\n\n반면 정상적인 노화에서는 힌트를 주면 기억이 돌아오는 경우가 많습니다.",

  일상생활:
    "치매가 진행되면 일상에서 하던 일들을 점점 혼자 하기 어려워집니다.\n\n예시:\n• 약 시간 관리가 어렵다\n• 돈 계산이나 은행 업무가 헷갈린다\n• 요리를 하다 순서가 생각나지 않는다\n• 세탁기나 TV 조작을 어려워한다\n\n초기에는 이런 변화가 서서히 나타나기 때문에 가족이 평소 변화를 유심히 관찰하는 것이 중요합니다.",

  선별검사:
    "치매 선별검사는 짧은 질문과 간단한 과제를 통해 기억력과 판단력 상태를 확인하는 검사입니다.\n\n보건소 치매안심센터에서 무료로 받을 수 있으며, 검사 시간은 10~15분 정도입니다.\n\n검사 결과에 따라 필요하면 전문병원에서 정밀검사를 안내받게 됩니다.",

  검진절차:
    "치매 검진은 1년에 한 번 정기적으로 받는 것을 권장합니다.\n\n검사 절차:\n① 치매안심센터 방문 또는 전화 예약\n② 간단한 선별검사 진행\n③ 필요한 경우 전문의 진료 및 정밀검사 연계\n④ 결과에 따른 프로그램 또는 관리 계획 안내",

  대처방법:
    "기억력이나 행동 변화가 평소와 다르게 지속된다면 너무 걱정만 하지 않고 검사를 받아보는 것이 중요합니다.\n\n대처 방법:\n• 증상 발생 시기를 기록해두기\n• 치매안심센터나 병원 방문해 상담받기\n• 가스 차단, 문 잠금장치, 금전관리 보호 등 안전 환경 정비하기",

  예방습관:
    "치매 예방에는 꾸준한 생활 관리가 가장 중요합니다.\n\n예방 습관:\n• 걷기 등 규칙적인 운동\n• 채소·생선·견과류 위주의 균형 잡힌 식사\n• 충분한 수면과 스트레스 관리\n• 친구·가족과의 대화 등 사회적 활동 유지\n• 고혈압·당뇨 등 기저질환 관리\n\n작은 실천을 매일 조금씩 지속하는 것이 좋습니다.",

  default:
    "좋은 질문이에요! 위의 버튼을 눌러 다양한 치매 관련 정보를 확인하실 수 있습니다.\n\n더 자세한 정보는 보건소 치매안심센터(☎ 1899-9988)로 문의해주세요.",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [showGreeting, setShowGreeting] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Only show cycling greeting on home page
    if (pathname === "/") {
      const interval = setInterval(() => {
        setShowGreeting((prev) => !prev)
      }, 5000)

      return () => clearInterval(interval)
    } else {
      // Hide greeting on other pages
      setShowGreeting(false)
    }
  }, [pathname])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting
      setMessages([
        {
          id: Date.now(),
          text: "안녕하세요! 저는 치매예방 챗봇 기억이예요 😊\n아래 버튼을 눌러 빠르게 정보를 볼 수 있습니다.\n궁금한 내용을 직접 입력하셔도 돼요!",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  const handleQuickQuestion = (question: string, keyword: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Add bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: responses[keyword] || responses.default,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    setTimeout(() => {
      let responseText = responses.default
      const input = inputValue.toLowerCase()

      if (input.includes("치매") && (input.includes("무엇") || input.includes("뭐") || input.includes("정의"))) {
        responseText = responses.치매란
      } else if (input.includes("조기") || (input.includes("발견") && input.includes("중요"))) {
        responseText = responses.조기발견
      } else if (input.includes("기억") || input.includes("건망증")) {
        responseText = responses.기억력
      } else if (input.includes("일상") || input.includes("생활능력") || input.includes("능력변화")) {
        responseText = responses.일상생활
      } else if (input.includes("선별") || input.includes("검사소개")) {
        responseText = responses.선별검사
      } else if (input.includes("검진") || input.includes("절차") || input.includes("주기")) {
        responseText = responses.검진절차
      } else if (input.includes("의심") || input.includes("대처")) {
        responseText = responses.대처방법
      } else if (input.includes("예방") || input.includes("습관") || input.includes("생활")) {
        responseText = responses.예방습관
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center text-white overflow-hidden"
        aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
      >
        {isOpen ? (
          <X className="h-8 w-8" />
        ) : (
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOh68Is5aMpvn5UPZpjCDFfBF1SaU2.png"
            alt="기억이"
            className="h-full w-full object-cover"
          />
        )}
      </button>

      {/* Greeting Message Bubble */}
      {!isOpen && showGreeting && (
        <div className="fixed bottom-24 right-6 z-40 bg-white rounded-2xl shadow-xl p-4 max-w-[280px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">안녕하세요 기억이에요</p>
          <p className="text-base text-gray-600 mt-1">도움이 필요하시면 저를 눌러주세요.</p>
          {/* Triangle pointer */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 shadow-xl" />
        </div>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[480px] h-[75vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HOh68Is5aMpvn5UPZpjCDFfBF1SaU2.png"
                alt="기억이"
                className="h-10 w-10 rounded-full object-cover border-2 border-white"
              />
              <h3 className="text-xl font-bold text-black">치매예방 챗봇 기억이</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="닫기"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-green-500 text-black"
                      : "bg-white text-black shadow-sm border border-gray-200"
                  }`}
                >
                  <p className="text-lg leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="grid grid-cols-4 gap-2">
              {quickQuestions.map((q) => (
                <Button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q.text, q.keyword)}
                  variant="outline"
                  className="h-auto py-2 text-xs font-medium hover:bg-green-50 hover:border-green-300 whitespace-normal text-left leading-tight"
                >
                  {q.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="궁금한 내용을 입력하세요..."
                className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button
                onClick={handleSendMessage}
                className="h-12 w-12 bg-green-500 hover:bg-green-600 rounded-xl"
                aria-label="전송"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
