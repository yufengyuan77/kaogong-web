import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { getWithParams } from '../api/client'

interface Question {
  id: number
  type: string
  category: string
  title: string
  options: string   // JSON string
  answer: string
  analysis: string | null
}

function Exam() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'exam' })
      .then(setQuestions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex justify-center py-20"><Spin size="large" /></div>
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="text-red-400">加载失败：{error}</p>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const parsedOptions: string[] = currentQuestion ? JSON.parse(currentQuestion.options) : []

  const handleNext = () => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1)
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')
    } else {
      setFinished(true)
    }
  }

  if (!started) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">公务员模拟考试</h1>
        <div className="bg-white p-8 rounded-xl shadow">
          <p className="mb-4">总题数：{questions.length}</p>
          <p className="mb-6">考试时间：120分钟</p>
          <button onClick={() => setStarted(true)} className="px-6 py-3 bg-blue-500 text-white rounded-lg">开始考试</button>
        </div>
      </div>
    )
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100)
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">考试结束</h1>
        <div className="bg-white p-8 rounded-xl shadow">
          <p className="text-2xl mb-4">得分：{score}</p>
          <p className="text-2xl mb-6">正确率：{accuracy}%</p>
          <button onClick={() => { setStarted(false); setFinished(false); setCurrentIndex(0); setScore(0); setSelectedAnswer('') }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg">重新考试</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">模拟考试</h1>
      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">第 {currentIndex + 1} 题</h2>
        <p className="mb-6">{currentQuestion.title}</p>

        <div className="space-y-4">
          {parsedOptions.map((option: string) => (
            <div key={option}
              onClick={() => setSelectedAnswer(option[0])}
              className={`p-4 border rounded-lg cursor-pointer ${selectedAnswer === option[0] ? 'bg-blue-50 border-blue-500' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>

        <button onClick={handleNext} className="mt-8 px-6 py-2 bg-green-500 text-white rounded-lg">
          {currentIndex === questions.length - 1 ? '交卷' : '下一题'}
        </button>
      </div>
    </div>
  )
}

export default Exam
