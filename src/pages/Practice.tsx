import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { getWithParams } from '../api/client'

interface Question {
  id: number
  type: string
  category: string
  title: string
  options: string   // JSON string from API
  answer: string
  analysis: string | null
}

function Practice() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([])
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'practice' })
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
  if (!currentQuestion && !isFinished) {
    return <div className="text-center py-20 text-gray-400">暂无题目</div>
  }

  const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100)
  // 解析 options JSON
  const parsedOptions: string[] = currentQuestion
    ? JSON.parse(currentQuestion.options)
    : []

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('请选择答案')
      return
    }
    setAnsweredCount(answeredCount + 1)
    if (selectedAnswer === currentQuestion.answer) {
      setCorrectCount(correctCount + 1)
    } else {
      setWrongQuestions([...wrongQuestions, currentQuestion.id])
    }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')
      setShowResult(false)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedAnswer('')
    setShowResult(false)
    setAnsweredCount(0)
    setCorrectCount(0)
    setWrongQuestions([])
    setIsFinished(false)
  }

  if (isFinished) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-10">
          <h1 className="text-4xl font-bold text-center mb-10">🎉 练习完成</h1>
          <div className="grid grid-cols-4 gap-6 mb-10">
            <div className="bg-gray-50 p-6 rounded-xl"><p className="text-gray-500">总题数</p><p className="text-3xl font-bold">{questions.length}</p></div>
            <div className="bg-gray-50 p-6 rounded-xl"><p className="text-gray-500">答对题数</p><p className="text-3xl font-bold text-green-600">{correctCount}</p></div>
            <div className="bg-gray-50 p-6 rounded-xl"><p className="text-gray-500">正确率</p><p className="text-3xl font-bold text-blue-600">{accuracy}%</p></div>
            <div className="bg-gray-50 p-6 rounded-xl"><p className="text-gray-500">错题数</p><p className="text-3xl font-bold text-red-500">{wrongQuestions.length}</p></div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4">错题记录</h2>
            {wrongQuestions.length === 0
              ? <p className="text-green-600 font-bold">恭喜！全部答对！</p>
              : <ul className="space-y-2">{wrongQuestions.map((id) => <li key={id} className="text-red-500">第 {id} 题</li>)}</ul>
            }
          </div>
          <div className="text-center">
            <button onClick={handleRestart} className="px-8 py-3 bg-blue-500 text-white rounded-lg">重新练习</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">已做题数</p><p className="text-2xl font-bold">{answeredCount}</p></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">答对题数</p><p className="text-2xl font-bold text-green-600">{correctCount}</p></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">正确率</p><p className="text-2xl font-bold text-blue-600">{accuracy}%</p></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-gray-500">当前进度</p><p className="text-2xl font-bold">{currentIndex + 1}/{questions.length}</p></div>
      </div>

      <h1 className="text-3xl font-bold mb-8">题库中心</h1>

      <div className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-6">第 {currentIndex + 1} 题</h2>
        <p className="mb-6">{currentQuestion.title}</p>

        <div className="space-y-4">
          {parsedOptions.map((option: string) => (
            <div key={option}
              onClick={() => setSelectedAnswer(option[0])}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-blue-50 ${selectedAnswer === option[0] ? 'border-blue-500 bg-blue-50' : ''}`}
            >
              {option}
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button disabled={showResult} onClick={handleSubmit} className="px-6 py-2 bg-blue-500 text-white rounded-lg">提交答案</button>
          <button onClick={handleNext} className="px-6 py-2 bg-green-500 text-white rounded-lg">
            {currentIndex === questions.length - 1 ? '完成练习' : '下一题'}
          </button>
        </div>

        {showResult && (
          <div className="mt-8 p-6 bg-gray-100 rounded-xl">
            <p className="mb-3">你的答案：<span className="font-bold">{selectedAnswer}</span></p>
            <p className="mb-3">正确答案：<span className="font-bold text-green-600">{currentQuestion.answer}</span></p>
            {currentQuestion.analysis && <p>解析：{currentQuestion.analysis}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Practice
