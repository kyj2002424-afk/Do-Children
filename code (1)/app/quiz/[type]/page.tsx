"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle2, XCircle, Clock } from "lucide-react"

const allJudgmentQuizData = [
  {
    question: "길을 건널 때 가장 먼저 해야 할 일은?",
    options: ["뛰어간다", "신호등을 확인한다", "눈을 감는다", "전화한다"],
    correctAnswer: 1,
  },
  {
    question: "음식이 상했을 때 어떻게 해야 하나요?",
    options: ["먹는다", "버린다", "냉장고에 넣는다", "선물한다"],
    correctAnswer: 1,
  },
  {
    question: "집에 불이 났을 때 가장 먼저 해야 할 일은?",
    options: ["119에 신고한다", "사진을 찍는다", "청소한다", "잠을 잔다"],
    correctAnswer: 0,
  },
  {
    question: "비가 올 때 필요한 것은?",
    options: ["선글라스", "우산", "모자", "장갑"],
    correctAnswer: 1,
  },
  {
    question: "약을 먹을 때 함께 마시는 것은?",
    options: ["커피", "술", "물", "주스"],
    correctAnswer: 2,
  },
  {
    question: "밤에 잠을 잘 때 해야 할 일은?",
    options: ["불을 켠다", "불을 끈다", "음악을 크게 튼다", "운동한다"],
    correctAnswer: 1,
  },
  {
    question: "더운 여름날 적절한 행동은?",
    options: ["두꺼운 옷을 입는다", "물을 많이 마신다", "햇볕에 오래 있는다", "창문을 닫는다"],
    correctAnswer: 1,
  },
  {
    question: "전화번호를 잊어버렸을 때 어떻게 해야 하나요?",
    options: ["포기한다", "전화번호부를 확인한다", "아무 번호나 누른다", "소리를 지른다"],
    correctAnswer: 1,
  },
  {
    question: "길을 잃었을 때 가장 좋은 방법은?",
    options: ["계속 걷는다", "주변 사람에게 물어본다", "앉아서 기다린다", "눈을 감는다"],
    correctAnswer: 1,
  },
  {
    question: "손을 씻어야 하는 때는?",
    options: ["식사 후", "식사 전", "잠자기 전", "운동 후"],
    correctAnswer: 1,
  },
  {
    question: "겨울에 외출할 때 필요한 것은?",
    options: ["반팔", "두꺼운 외투", "샌들", "선글라스"],
    correctAnswer: 1,
  },
  {
    question: "횡단보도에서 신호등이 빨간불일 때는?",
    options: ["빨리 뛰어간다", "멈춰서 기다린다", "천천히 걷는다", "뒤로 간다"],
    correctAnswer: 1,
  },
  {
    question: "배가 아플 때 가장 먼저 해야 할 일은?",
    options: ["운동한다", "병원에 간다", "음식을 많이 먹는다", "잠을 잔다"],
    correctAnswer: 1,
  },
  {
    question: "엘리베이터가 고장났을 때는?",
    options: ["계속 탄다", "계단을 이용한다", "뛰어내린다", "소리를 지른다"],
    correctAnswer: 1,
  },
  {
    question: "낯선 사람이 집에 오라고 할 때는?",
    options: ["따라간다", "거절한다", "선물을 받는다", "혼자 간다"],
    correctAnswer: 1,
  },
]

const getRandomJudgmentQuestions = () => {
  const shuffled = [...allJudgmentQuizData].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

const quizData = {
  judgment: [
    {
      question: "길을 건널 때 가장 먼저 해야 할 일은?",
      options: ["뛰어간다", "신호등을 확인한다", "눈을 감는다", "전화한다"],
      correctAnswer: 1,
    },
    {
      question: "음식이 상했을 때 어떻게 해야 하나요?",
      options: ["먹는다", "버린다", "냉장고에 넣는다", "선물한다"],
      correctAnswer: 1,
    },
    {
      question: "집에 불이 났을 때 가장 먼저 해야 할 일은?",
      options: ["119에 신고한다", "사진을 찍는다", "청소한다", "잠을 잔다"],
      correctAnswer: 0,
    },
  ],
  spatial: [
    {
      question: "시계에서 12시를 가리키는 방향은?",
      options: ["위", "아래", "왼쪽", "오른쪽"],
      correctAnswer: 0,
    },
    {
      question: "책을 읽을 때 글자는 어느 방향으로 읽나요?",
      options: ["위에서 아래로", "왼쪽에서 오른쪽으로", "오른쪽에서 왼쪽으로", "아래에서 위로"],
      correctAnswer: 1,
    },
    {
      question: "엘리베이터에서 위층으로 가려면?",
      options: ["▼ 버튼", "▲ 버튼", "◀ 버튼", "▶ 버튼"],
      correctAnswer: 1,
    },
  ],
}

const cardImages = ["🍎", "🐶", "🌳", "🚗", "📚", "⭐"]

const createShuffledCards = () => {
  const pairs = [...cardImages, ...cardImages]
  return pairs
    .sort(() => Math.random() - 0.5)
    .map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }))
}

const allMemoryQuizData = [
  {
    wordsToShow: ["사과", "강아지", "자동차", "책", "나무"],
    distractors: ["연필", "의자", "컴퓨터", "꽃", "시계"],
  },
  {
    wordsToShow: ["바나나", "고양이", "비행기", "안경", "산"],
    distractors: ["가방", "전화기", "모자", "구름", "별"],
  },
  {
    wordsToShow: ["포도", "토끼", "기차", "우산", "바다"],
    distractors: ["신발", "텔레비전", "공", "달", "태양"],
  },
  {
    wordsToShow: ["딸기", "사자", "배", "지갑", "강"],
    distractors: ["칫솔", "냉장고", "거울", "눈", "구름"],
  },
  {
    wordsToShow: ["수박", "코끼리", "자전거", "시계", "호수"],
    distractors: ["빗", "선풍기", "액자", "비", "무지개"],
  },
  {
    wordsToShow: ["오렌지", "곰", "오토바이", "가방", "폭포"],
    distractors: ["수건", "세탁기", "램프", "천둥", "번개"],
  },
  {
    wordsToShow: ["복숭아", "여우", "버스", "모자", "계곡"],
    distractors: ["비누", "청소기", "시계", "안개", "이슬"],
  },
  {
    wordsToShow: ["배", "늑대", "택시", "신발", "섬"],
    distractors: ["샴푸", "전자레인지", "달력", "서리", "눈보라"],
  },
  {
    wordsToShow: ["감", "호랑이", "트럭", "장갑", "사막"],
    distractors: ["치약", "오븐", "사진", "태풍", "폭풍"],
  },
  {
    wordsToShow: ["자두", "표범", "헬리콥터", "목도리", "초원"],
    distractors: ["칫솔", "믹서기", "그림", "지진", "해일"],
  },
  {
    wordsToShow: ["망고", "기린", "보트", "양말", "숲"],
    distractors: ["수세미", "토스터", "포스터", "화산", "용암"],
  },
  {
    wordsToShow: ["키위", "얼룩말", "요트", "벨트", "정글"],
    distractors: ["스펀지", "커피포트", "스티커", "홍수", "쓰나미"],
  },
  {
    wordsToShow: ["레몬", "판다", "잠수함", "넥타이", "평원"],
    distractors: ["걸레", "주전자", "메모지", "가뭄", "산불"],
  },
]

const getRandomMemoryQuestions = () => {
  const shuffled = [...allMemoryQuizData].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

const allMathQuizData = [
  // Addition problems (25)
  { question: "15 + 23 = ?", options: ["35", "38", "40", "42"], correctAnswer: 1 },
  { question: "27 + 34 = ?", options: ["59", "61", "63", "65"], correctAnswer: 1 },
  { question: "42 + 19 = ?", options: ["59", "61", "63", "65"], correctAnswer: 1 },
  { question: "56 + 28 = ?", options: ["82", "84", "86", "88"], correctAnswer: 1 },
  { question: "33 + 47 = ?", options: ["78", "80", "82", "84"], correctAnswer: 1 },
  { question: "18 + 25 = ?", options: ["41", "43", "45", "47"], correctAnswer: 1 },
  { question: "64 + 17 = ?", options: ["79", "81", "83", "85"], correctAnswer: 1 },
  { question: "29 + 36 = ?", options: ["63", "65", "67", "69"], correctAnswer: 1 },
  { question: "51 + 22 = ?", options: ["71", "73", "75", "77"], correctAnswer: 1 },
  { question: "38 + 45 = ?", options: ["81", "83", "85", "87"], correctAnswer: 1 },
  { question: "12 + 19 = ?", options: ["29", "31", "33", "35"], correctAnswer: 1 },
  { question: "46 + 27 = ?", options: ["71", "73", "75", "77"], correctAnswer: 1 },
  { question: "35 + 38 = ?", options: ["71", "73", "75", "77"], correctAnswer: 1 },
  { question: "59 + 14 = ?", options: ["71", "73", "75", "77"], correctAnswer: 1 },
  { question: "21 + 49 = ?", options: ["68", "70", "72", "74"], correctAnswer: 1 },
  { question: "44 + 26 = ?", options: ["68", "70", "72", "74"], correctAnswer: 1 },
  { question: "37 + 33 = ?", options: ["68", "70", "72", "74"], correctAnswer: 1 },
  { question: "52 + 18 = ?", options: ["68", "70", "72", "74"], correctAnswer: 1 },
  { question: "16 + 54 = ?", options: ["68", "70", "72", "74"], correctAnswer: 1 },
  { question: "63 + 29 = ?", options: ["90", "92", "94", "96"], correctAnswer: 1 },
  { question: "28 + 41 = ?", options: ["67", "69", "71", "73"], correctAnswer: 1 },
  { question: "55 + 24 = ?", options: ["77", "79", "81", "83"], correctAnswer: 1 },
  { question: "39 + 32 = ?", options: ["69", "71", "73", "75"], correctAnswer: 1 },
  { question: "47 + 16 = ?", options: ["61", "63", "65", "67"], correctAnswer: 1 },
  { question: "24 + 58 = ?", options: ["80", "82", "84", "86"], correctAnswer: 1 },

  // Subtraction problems (25)
  { question: "45 - 18 = ?", options: ["25", "27", "29", "31"], correctAnswer: 1 },
  { question: "62 - 27 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "81 - 34 = ?", options: ["45", "47", "49", "51"], correctAnswer: 1 },
  { question: "53 - 19 = ?", options: ["32", "34", "36", "38"], correctAnswer: 1 },
  { question: "76 - 28 = ?", options: ["46", "48", "50", "52"], correctAnswer: 1 },
  { question: "94 - 37 = ?", options: ["55", "57", "59", "61"], correctAnswer: 1 },
  { question: "68 - 25 = ?", options: ["41", "43", "45", "47"], correctAnswer: 1 },
  { question: "85 - 46 = ?", options: ["37", "39", "41", "43"], correctAnswer: 1 },
  { question: "72 - 33 = ?", options: ["37", "39", "41", "43"], correctAnswer: 1 },
  { question: "59 - 24 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "87 - 38 = ?", options: ["47", "49", "51", "53"], correctAnswer: 1 },
  { question: "64 - 29 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "91 - 45 = ?", options: ["44", "46", "48", "50"], correctAnswer: 1 },
  { question: "78 - 32 = ?", options: ["44", "46", "48", "50"], correctAnswer: 1 },
  { question: "55 - 17 = ?", options: ["36", "38", "40", "42"], correctAnswer: 1 },
  { question: "83 - 26 = ?", options: ["55", "57", "59", "61"], correctAnswer: 1 },
  { question: "69 - 35 = ?", options: ["32", "34", "36", "38"], correctAnswer: 1 },
  { question: "96 - 48 = ?", options: ["46", "48", "50", "52"], correctAnswer: 1 },
  { question: "74 - 39 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "88 - 42 = ?", options: ["44", "46", "48", "50"], correctAnswer: 1 },
  { question: "61 - 23 = ?", options: ["36", "38", "40", "42"], correctAnswer: 1 },
  { question: "95 - 57 = ?", options: ["36", "38", "40", "42"], correctAnswer: 1 },
  { question: "77 - 31 = ?", options: ["44", "46", "48", "50"], correctAnswer: 1 },
  { question: "52 - 16 = ?", options: ["34", "36", "38", "40"], correctAnswer: 1 },
  { question: "89 - 44 = ?", options: ["43", "45", "47", "49"], correctAnswer: 1 },

  // Multiplication problems (25)
  { question: "7 × 8 = ?", options: ["54", "56", "58", "60"], correctAnswer: 1 },
  { question: "9 × 6 = ?", options: ["52", "54", "56", "58"], correctAnswer: 1 },
  { question: "8 × 7 = ?", options: ["54", "56", "58", "60"], correctAnswer: 1 },
  { question: "6 × 9 = ?", options: ["52", "54", "56", "58"], correctAnswer: 1 },
  { question: "5 × 8 = ?", options: ["38", "40", "42", "44"], correctAnswer: 1 },
  { question: "7 × 9 = ?", options: ["61", "63", "65", "67"], correctAnswer: 1 },
  { question: "8 × 6 = ?", options: ["46", "48", "50", "52"], correctAnswer: 1 },
  { question: "9 × 7 = ?", options: ["61", "63", "65", "67"], correctAnswer: 1 },
  { question: "6 × 8 = ?", options: ["46", "48", "50", "52"], correctAnswer: 1 },
  { question: "7 × 7 = ?", options: ["47", "49", "51", "53"], correctAnswer: 1 },
  { question: "8 × 9 = ?", options: ["70", "72", "74", "76"], correctAnswer: 1 },
  { question: "9 × 8 = ?", options: ["70", "72", "74", "76"], correctAnswer: 1 },
  { question: "6 × 7 = ?", options: ["40", "42", "44", "46"], correctAnswer: 1 },
  { question: "7 × 6 = ?", options: ["40", "42", "44", "46"], correctAnswer: 1 },
  { question: "8 × 8 = ?", options: ["62", "64", "66", "68"], correctAnswer: 1 },
  { question: "9 × 9 = ?", options: ["79", "81", "83", "85"], correctAnswer: 1 },
  { question: "5 × 7 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "6 × 6 = ?", options: ["34", "36", "38", "40"], correctAnswer: 1 },
  { question: "7 × 5 = ?", options: ["33", "35", "37", "39"], correctAnswer: 1 },
  { question: "8 × 5 = ?", options: ["38", "40", "42", "44"], correctAnswer: 1 },
  { question: "9 × 5 = ?", options: ["43", "45", "47", "49"], correctAnswer: 1 },
  { question: "5 × 9 = ?", options: ["43", "45", "47", "49"], correctAnswer: 1 },
  { question: "5 × 6 = ?", options: ["28", "30", "32", "34"], correctAnswer: 1 },
  { question: "6 × 5 = ?", options: ["28", "30", "32", "34"], correctAnswer: 1 },
  { question: "4 × 9 = ?", options: ["34", "36", "38", "40"], correctAnswer: 1 },

  // Division problems (25)
  { question: "56 ÷ 7 = ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
  { question: "72 ÷ 8 = ?", options: ["7", "9", "11", "13"], correctAnswer: 1 },
  { question: "63 ÷ 9 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "48 ÷ 6 = ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
  { question: "81 ÷ 9 = ?", options: ["7", "9", "11", "13"], correctAnswer: 1 },
  { question: "64 ÷ 8 = ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
  { question: "54 ÷ 6 = ?", options: ["7", "9", "11", "13"], correctAnswer: 1 },
  { question: "49 ÷ 7 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "42 ÷ 6 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "35 ÷ 5 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "45 ÷ 5 = ?", options: ["7", "9", "11", "13"], correctAnswer: 1 },
  { question: "36 ÷ 6 = ?", options: ["4", "6", "8", "10"], correctAnswer: 1 },
  { question: "40 ÷ 5 = ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
  { question: "32 ÷ 4 = ?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
  { question: "28 ÷ 4 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "24 ÷ 4 = ?", options: ["4", "6", "8", "10"], correctAnswer: 1 },
  { question: "30 ÷ 5 = ?", options: ["4", "6", "8", "10"], correctAnswer: 1 },
  { question: "27 ÷ 3 = ?", options: ["7", "9", "11", "13"], correctAnswer: 1 },
  { question: "21 ÷ 3 = ?", options: ["5", "7", "9", "11"], correctAnswer: 1 },
  { question: "18 ÷ 3 = ?", options: ["4", "6", "8", "10"], correctAnswer: 1 },
  { question: "15 ÷ 3 = ?", options: ["3", "5", "7", "9"], correctAnswer: 1 },
  { question: "12 ÷ 3 = ?", options: ["2", "4", "6", "8"], correctAnswer: 1 },
  { question: "20 ÷ 4 = ?", options: ["3", "5", "7", "9"], correctAnswer: 1 },
  { question: "16 ÷ 4 = ?", options: ["2", "4", "6", "8"], correctAnswer: 1 },
  { question: "25 ÷ 5 = ?", options: ["3", "5", "7", "9"], correctAnswer: 1 },
]

const getRandomMathQuestions = () => {
  const shuffled = [...allMathQuizData].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5)
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const quizType = (params?.type as string) || "judgment"

  const [judgmentQuizData] = useState(() => getRandomJudgmentQuestions())
  const [memoryQuizData] = useState(() => getRandomMemoryQuestions())
  const [mathQuizData] = useState(() => getRandomMathQuestions())

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(5).fill(false))

  const [cards, setCards] = useState(createShuffledCards())
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameTime, setGameTime] = useState(60)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [previewPhase, setPreviewPhase] = useState(false)
  const [previewTime, setPreviewTime] = useState(5)

  const [memoryPhase, setMemoryPhase] = useState<"guide" | "memorize" | "select" | "feedback">("guide")
  const [memoryTimer, setMemoryTimer] = useState(10)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [memoryScore, setMemoryScore] = useState(0)
  const [currentQuestionScore, setCurrentQuestionScore] = useState(0)

  useEffect(() => {
    if (quizType === "spatial" && previewPhase && previewTime > 0) {
      const timer = setTimeout(() => setPreviewTime(previewTime - 1), 1000)
      return () => clearTimeout(timer)
    } else if (quizType === "spatial" && previewPhase && previewTime === 0) {
      const resetCards = cards.map((card) => ({ ...card, isFlipped: false }))
      setCards(resetCards)
      setPreviewPhase(false)
      setGameStarted(true)
    }
  }, [previewTime, previewPhase, quizType, cards])

  useEffect(() => {
    if (quizType === "spatial" && gameStarted && !gameOver && gameTime > 0) {
      const timer = setTimeout(() => setGameTime(gameTime - 1), 1000)
      return () => clearTimeout(timer)
    } else if (quizType === "spatial" && gameStarted && gameTime === 0) {
      setGameOver(true)
    }
  }, [gameTime, gameStarted, gameOver, quizType])

  useEffect(() => {
    if (quizType === "spatial" && matchedPairs === 6 && gameStarted) {
      setGameOver(true)
    }
  }, [matchedPairs, gameStarted, quizType])

  useEffect(() => {
    if (quizType === "memory" && memoryPhase === "memorize" && memoryTimer > 0) {
      const timer = setTimeout(() => setMemoryTimer(memoryTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (quizType === "memory" && memoryPhase === "memorize" && memoryTimer === 0) {
      setMemoryPhase("select")
    }
  }, [memoryTimer, memoryPhase, quizType])

  const handleCardClick = (cardId: number) => {
    if (previewPhase || flippedCards.length === 2 || cards[cardId].isMatched || flippedCards.includes(cardId)) {
      return
    }

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    const newCards = [...cards]
    newCards[cardId].isFlipped = true
    setCards(newCards)

    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards
      if (cards[firstId].image === cards[secondId].image) {
        setTimeout(() => {
          const updatedCards = [...cards]
          updatedCards[firstId].isMatched = true
          updatedCards[secondId].isMatched = true
          setCards(updatedCards)
          setMatchedPairs(matchedPairs + 1)
          setFlippedCards([])
        }, 500)
      } else {
        setTimeout(() => {
          const updatedCards = [...cards]
          updatedCards[firstId].isFlipped = false
          updatedCards[secondId].isFlipped = false
          setCards(updatedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return
    setSelectedAnswer(index)
    setShowFeedback(true)

    const correctAnswer = judgmentQuizData[currentQuestion].correctAnswer

    let newScore = score
    if (index === correctAnswer) {
      newScore = score + 1
      setScore(newScore)
    }

    const newAnswered = [...answeredQuestions]
    newAnswered[currentQuestion] = true
    setAnsweredQuestions(newAnswered)
  }

  const handleQuizNext = () => {
    const totalQuestions = quizType === "math" ? mathQuizData.length : judgmentQuizData.length

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    } else {
      router.push(`/quiz/${quizType}/result?score=${score}`)
    }
  }

  const handleMemoryStart = () => {
    setMemoryPhase("memorize")
    setMemoryTimer(10)
  }

  const handleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word))
    } else if (selectedWords.length < 5) {
      setSelectedWords([...selectedWords, word])
    }
  }

  const handleMemorySubmit = () => {
    const currentQuiz = memoryQuizData[currentQuestion]
    const correctWords = currentQuiz.wordsToShow
    const correctCount = selectedWords.filter((word) => correctWords.includes(word)).length

    setCurrentQuestionScore(correctCount)
    const newMemoryScore = memoryScore + correctCount
    setMemoryScore(newMemoryScore)
    setMemoryPhase("feedback")
  }

  const handleMemoryNext = () => {
    if (currentQuestion < memoryQuizData.length - 1) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      setMemoryPhase("memorize") // Always go to memorize phase for subsequent questions
      setSelectedWords([])
      setCurrentQuestionScore(0)
      setMemoryTimer(10) // Always reset timer for next question
    } else {
      router.push(`/quiz/memory/result?score=${memoryScore}`)
    }
  }

  const questions = quizData[quizType as keyof typeof quizData] || quizData.judgment

  console.log("[v0] Checking quiz type conditions:")
  console.log("[v0] Is memory?", quizType === "memory")
  console.log("[v0] Is spatial?", quizType === "spatial")
  console.log("[v0] Is math?", quizType === "math")
  console.log("[v0] Is judgment?", quizType === "judgment")

  if (quizType === "memory") {
    const currentQuiz = memoryQuizData[currentQuestion]

    if (memoryPhase === "guide" && currentQuestion === 0) {
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <Card>
                <CardContent className="p-12">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    화면에 나오는 단어를 기억해 주세요
                  </h1>
                  <p className="text-2xl text-muted-foreground mb-8">
                    문제 {currentQuestion + 1} / {memoryQuizData.length}
                  </p>
                  <Button size="lg" className="text-2xl font-semibold h-20 px-12" onClick={handleMemoryStart}>
                    시작하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      )
    }

    if (memoryPhase === "memorize") {
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-120px)]">
            <div className="max-w-5xl mx-auto w-full">
              <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary mb-8">
                  <Clock className="w-8 h-8" />
                  {memoryTimer}초
                </div>
              </div>

              <Card>
                <CardContent className="p-20">
                  <p
                    className="text-6xl font-bold text-center text-foreground whitespace-nowrap"
                    style={{ wordSpacing: "2rem" }}
                  >
                    {currentQuiz.wordsToShow.join(" ")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      )
    }

    if (memoryPhase === "select") {
      const shuffledWords = [...currentQuiz.wordsToShow, ...currentQuiz.distractors].sort(() => Math.random() - 0.5)

      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">방금 보셨던 단어를 골라주세요</h2>
                <p className="text-xl text-muted-foreground">
                  문제 {currentQuestion + 1} / {memoryQuizData.length}
                </p>
                <p className="text-xl text-muted-foreground mt-2">선택한 단어: {selectedWords.length} / 5</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {shuffledWords.map((word, index) => (
                  <Button
                    key={index}
                    size="lg"
                    variant={selectedWords.includes(word) ? "default" : "outline"}
                    className="h-20 text-2xl font-semibold"
                    onClick={() => handleWordSelect(word)}
                  >
                    {word}
                  </Button>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full text-xl font-semibold h-16"
                onClick={handleMemorySubmit}
                disabled={selectedWords.length !== 5}
              >
                확인
              </Button>
            </div>
          </main>
        </div>
      )
    }

    if (memoryPhase === "feedback") {
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <Card>
                <CardContent className="p-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                    문제 {currentQuestion + 1} 결과
                  </h1>
                  <div className="mb-8">
                    <p className="text-6xl font-bold text-primary mb-4">{currentQuestionScore} / 5</p>
                    <p className="text-2xl text-muted-foreground">
                      {currentQuestionScore === 5
                        ? "완벽합니다! 🎉"
                        : currentQuestionScore >= 3
                          ? "잘하셨어요! 👍"
                          : "다음엔 더 잘할 수 있어요! 💪"}
                    </p>
                  </div>
                  <Button size="lg" className="text-2xl font-semibold h-20 px-12" onClick={handleMemoryNext}>
                    {currentQuestion < memoryQuizData.length - 1 ? "다음 문제" : "결과 보기"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      )
    }

    return null // Explicit return for feedback phase to prevent fallthrough
  } else if (quizType === "spatial") {
    if (previewPhase) {
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">카드를 기억하세요!</h2>
                <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary">
                  <Clock className="w-8 h-8" />
                  {previewTime}초
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="aspect-square rounded-lg text-6xl flex items-center justify-center bg-primary text-primary-foreground"
                  >
                    {card.image}
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )
    }

    if (!gameStarted) {
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <Card>
                <CardContent className="p-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">같은 그림을 찾으세요!</h1>
                  <p className="text-2xl text-muted-foreground mb-4">제한 시간: 1분</p>
                  <p className="text-xl text-muted-foreground mb-8">12장의 카드에서 같은 그림 6쌍을 찾아보세요</p>
                  <Button
                    size="lg"
                    className="text-2xl font-semibold h-20 px-12"
                    onClick={() => {
                      const allFlipped = cards.map((card) => ({ ...card, isFlipped: true }))
                      setCards(allFlipped)
                      setPreviewPhase(true)
                      setPreviewTime(5)
                    }}
                  >
                    시작하기
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      )
    }

    if (gameOver) {
      const finalScore = matchedPairs * 20
      return (
        <div className="min-h-screen">
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-6">
              <Link href="/quiz">
                <Button variant="ghost" size="lg" className="text-lg">
                  <ArrowLeft className="w-6 h-6 mr-2" />
                  퀴즈 선택
                </Button>
              </Link>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <Card>
                <CardContent className="p-12">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">게임 종료!</h1>
                  <p className="text-3xl font-bold text-primary mb-4">{matchedPairs} / 6 쌍 완성</p>
                  <p className="text-2xl text-muted-foreground mb-8">점수: {finalScore}점</p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      size="lg"
                      className="text-xl font-semibold h-16 px-8"
                      onClick={() => {
                        setCards(createShuffledCards())
                        setFlippedCards([])
                        setMatchedPairs(0)
                        setGameTime(60)
                        setGameStarted(false)
                        setGameOver(false)
                        setPreviewPhase(false)
                        setPreviewTime(5)
                      }}
                    >
                      다시 하기
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-xl font-semibold h-16 px-8 bg-transparent"
                      onClick={() => router.push("/quiz")}
                    >
                      퀴즈 선택
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      )
    }

    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-6">
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="text-lg">
                <ArrowLeft className="w-6 h-6 mr-2" />
                퀴즈 선택
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <div className="text-2xl font-bold text-foreground">완성: {matchedPairs} / 6</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <Clock className="w-6 h-6" />
                {gameTime}초
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.isMatched}
                  className={`aspect-square rounded-lg text-6xl flex items-center justify-center transition-all duration-300 ${
                    card.isFlipped || card.isMatched
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  } ${card.isMatched ? "opacity-50" : ""}`}
                >
                  {card.isFlipped || card.isMatched ? card.image : "?"}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  } else if (quizType === "math") {
    const currentQ = mathQuizData[currentQuestion]

    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-6">
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="text-lg">
                <ArrowLeft className="w-6 h-6 mr-2" />
                퀴즈 선택
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-2xl font-bold text-center text-foreground mb-4">
                문제 {currentQuestion + 1} / {mathQuizData.length}
              </p>
              <div className="flex gap-2 justify-center">
                {mathQuizData.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-12 rounded-full ${answeredQuestions[index] ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground leading-relaxed">
                  {currentQ.question}
                </h2>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={
                    showFeedback
                      ? index === currentQ.correctAnswer
                        ? "default"
                        : selectedAnswer === index
                          ? "destructive"
                          : "outline"
                      : selectedAnswer === index
                        ? "default"
                        : "outline"
                  }
                  className="w-full h-auto py-6 text-2xl font-semibold justify-center"
                  onClick={() => {
                    if (showFeedback) return
                    setSelectedAnswer(index)
                    setShowFeedback(true)

                    let newScore = score
                    if (index === currentQ.correctAnswer) {
                      newScore = score + 1
                      setScore(newScore)
                    }

                    const newAnswered = [...answeredQuestions]
                    newAnswered[currentQuestion] = true
                    setAnsweredQuestions(newAnswered)
                  }}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <Card
                className={`mb-8 ${currentQ.correctAnswer === selectedAnswer ? "border-accent" : "border-destructive"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {currentQ.correctAnswer === selectedAnswer ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                        <p className="text-xl font-semibold text-accent">정답입니다! 잘하셨어요!</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                        <p className="text-xl font-semibold text-destructive">
                          아쉽네요. 정답은 {currentQ.options[currentQ.correctAnswer]}입니다.
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {showFeedback && (
              <Button
                size="lg"
                className="w-full text-xl font-semibold h-16"
                onClick={() => {
                  if (currentQuestion < mathQuizData.length - 1) {
                    setCurrentQuestion(currentQuestion + 1)
                    setSelectedAnswer(null)
                    setShowFeedback(false)
                  } else {
                    router.push(`/quiz/${quizType}/result?score=${score}`)
                  }
                }}
              >
                {currentQuestion < mathQuizData.length - 1 ? "다음 문제" : "결과 보기"}
              </Button>
            )}
          </div>
        </main>
      </div>
    )
  } else if (quizType === "judgment") {
    const currentQ = judgmentQuizData[currentQuestion]

    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-6">
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="text-lg">
                <ArrowLeft className="w-6 h-6 mr-2" />
                퀴즈 선택
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-2xl font-bold text-center text-foreground mb-4">
                문제 {currentQuestion + 1} / {judgmentQuizData.length}
              </p>
              <div className="flex gap-2 justify-center">
                {judgmentQuizData.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-12 rounded-full ${answeredQuestions[index] ? "bg-primary" : "bg-muted"}`}
                  />
                ))}
              </div>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8 md:p-12">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground leading-relaxed">
                  {currentQ.question}
                </h2>
              </CardContent>
            </Card>

            <div className="space-y-4 mb-8">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={
                    showFeedback
                      ? index === currentQ.correctAnswer
                        ? "default"
                        : selectedAnswer === index
                          ? "destructive"
                          : "outline"
                      : selectedAnswer === index
                        ? "default"
                        : "outline"
                  }
                  className="w-full h-auto py-6 text-xl font-semibold justify-start"
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                >
                  <span className="mr-4 text-2xl">{String.fromCharCode(65 + index)}</span>
                  {option}
                </Button>
              ))}
            </div>

            {showFeedback && (
              <Card
                className={`mb-8 ${currentQ.correctAnswer === selectedAnswer ? "border-accent" : "border-destructive"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {currentQ.correctAnswer === selectedAnswer ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-accent flex-shrink-0" />
                        <p className="text-xl font-semibold text-accent">정답입니다! 잘하셨어요!</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                        <p className="text-xl font-semibold text-destructive">
                          아쉽네요. 정답은 {String.fromCharCode(65 + currentQ.correctAnswer)}번입니다.
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {showFeedback && (
              <Button size="lg" className="w-full text-xl font-semibold h-16" onClick={handleQuizNext}>
                {currentQuestion < judgmentQuizData.length - 1 ? "다음 문제" : "결과 보기"}
              </Button>
            )}
          </div>
        </main>
      </div>
    )
  } else {
    return (
      <div className="min-h-screen">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 py-6">
            <Link href="/quiz">
              <Button variant="ghost" size="lg" className="text-lg">
                <ArrowLeft className="w-6 h-6 mr-2" />
                퀴즈 선택
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <h1 className="text-3xl font-bold text-foreground mb-4">알 수 없는 퀴즈 유형</h1>
                <p className="text-xl text-muted-foreground mb-8">퀴즈 유형: {quizType}</p>
                <Button size="lg" onClick={() => router.push("/quiz")}>
                  퀴즈 선택으로 돌아가기
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }
}
