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

function Assessment() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [finished, setFinished] = useState(false)
  const [languageScore, setLanguageScore] = useState(0)
  const [reasoningScore, setReasoningScore] = useState(0)
  const [dataScore, setDataScore] = useState(0)

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'assessment' })
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
      if (currentQuestion.category === '言语理解') setLanguageScore(languageScore + 100)
      if (currentQuestion.category === '判断推理') setReasoningScore(reasoningScore + 100)
      if (currentQuestion.category === '资料分析') setDataScore(dataScore + 100)
    }
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')
    } else {
      setFinished(true)
    }
  }

  if (finished) {
    const weakest = [
      { name: '言语理解', score: languageScore },
      { name: '判断推理', score: reasoningScore },
      { name: '资料分析', score: dataScore },
    ].sort((a, b) => a.score - b.score)

    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">能力测评报告</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow"><h2>言语理解</h2><p className="text-3xl text-blue-500">{languageScore}</p></div>
          <div className="bg-white p-6 rounded-xl shadow"><h2>判断推理</h2><p className="text-3xl text-green-500">{reasoningScore}</p></div>
          <div className="bg-white p-6 rounded-xl shadow"><h2>资料分析</h2><p className="text-3xl text-red-500">{dataScore}</p></div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl mt-8">
          <h2 className="font-bold text-xl mb-4">AI推荐学习方向</h2>
          <p>优先强化：{weakest[0].name}</p>
          <p>次级强化：{weakest[1].name}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">公务员能力测评</h1>
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
        <button onClick={handleNext} className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg">
          {currentIndex === questions.length - 1 ? '生成报告' : '下一题'}
        </button>
      </div>
    </div>
  )
}

export default Assessment
