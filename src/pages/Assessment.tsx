import { useState, useEffect } from 'react'
import { Button, Tag, Progress, Spin } from 'antd'
import { TrophyOutlined, ThunderboltOutlined, BulbOutlined } from '@ant-design/icons'
import { getWithParams } from '../api/client'

interface Question {
  id: number; type: string; category: string; title: string
  options: string; answer: string; analysis: string | null
}

const dimensionColors: Record<string, string> = {
  '言语理解': 'from-blue-500 to-blue-400',
  '判断推理': 'from-green-500 to-green-400',
  '资料分析': 'from-orange-500 to-orange-400',
}

function Assessment() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [started, setStarted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [finished, setFinished] = useState(false)
  const [languageScore, setLanguageScore] = useState(0)
  const [reasoningScore, setReasoningScore] = useState(0)
  const [dataScore, setDataScore] = useState(0)

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'assessment' })
      .then(setQuestions).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spin size="large" /></div>
  if (error) return <div className="text-center py-20"><p className="text-4xl mb-3">⚠️</p><p className="text-red-400">加载失败：{error}</p></div>

  const q = questions[currentIndex]
  const parsedOptions: string[] = q ? JSON.parse(q.options) : []

  const handleNext = () => {
    if (selectedAnswer === q.answer) {
      if (q.category === '言语理解') setLanguageScore(l => l + 5)
      if (q.category === '判断推理') setReasoningScore(l => l + 5)
      if (q.category === '资料分析') setDataScore(l => l + 5)
    }
    if (currentIndex < questions.length - 1) { setCurrentIndex(currentIndex + 1); setSelectedAnswer('') }
    else { setFinished(true) }
  }

  // 未开始：介绍页
  if (!started) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-10 text-center text-white shadow-xl">
          <ThunderboltOutlined className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">能力测评</h1>
          <p className="text-purple-100 text-lg">科学评估，精准定位薄弱环节</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {['言语理解', '判断推理', '资料分析'].map((d) => (
            <div key={d} className={`bg-gradient-to-br ${dimensionColors[d]} text-white rounded-xl p-6 text-center shadow-lg`}>
              <p className="text-3xl font-bold mb-1">{questions.filter(q => q.category === d).length}</p>
              <p className="text-sm opacity-90">{d}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-gray-500 mb-6">共 {questions.length} 题 · 三个能力维度 · 约需15分钟</p>
          <Button size="large" type="primary" onClick={() => setStarted(true)}
            style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)', border: 'none' }}>
            开始测评
          </Button>
        </div>
      </div>
    )
  }

  // 完成：报告页
  if (finished) {
    const dimensions = [
      { name: '言语理解', score: languageScore, max: questions.filter(q => q.category === '言语理解').length * 5, color: 'blue' },
      { name: '判断推理', score: reasoningScore, max: questions.filter(q => q.category === '判断推理').length * 5, color: 'green' },
      { name: '资料分析', score: dataScore, max: questions.filter(q => q.category === '资料分析').length * 5, color: 'orange' },
    ]
    const weakest = [...dimensions].sort((a, b) => a.score - b.score)
    const totalScore = languageScore + reasoningScore + dataScore
    const totalMax = dimensions.reduce((s, d) => s + d.max, 0)

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-10 text-center text-white shadow-xl">
          <TrophyOutlined className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">测评报告</h1>
          <p className="text-2xl font-bold">{totalScore} / {totalMax} 分</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {dimensions.map((d) => (
            <div key={d.name} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <p className="text-gray-400 mb-2">{d.name}</p>
              <Progress type="circle" percent={d.max > 0 ? Math.round((d.score / d.max) * 100) : 0} size={100}
                strokeColor={d.color === 'blue' ? '#3b82f6' : d.color === 'green' ? '#10b981' : '#f97316'} />
              <p className="text-2xl font-bold mt-3">{d.score}<span className="text-sm text-gray-400">/{d.max}</span></p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><BulbOutlined className="text-amber-500" />AI 学习建议</h2>
          <div className="space-y-3">
            <p className="text-gray-700">🔴 优先强化：<span className="font-bold text-red-500">{weakest[0].name}</span>（得分率最低，建议针对性训练）</p>
            <p className="text-gray-700">🟡 次级强化：<span className="font-bold text-orange-500">{weakest[1].name}</span>（还有提升空间）</p>
            <p className="text-gray-700">🟢 继续保持：<span className="font-bold text-green-500">{weakest[2].name}</span>（表现较好）</p>
          </div>
        </div>

        <div className="text-center">
          <Button size="large" onClick={() => { setStarted(false); setFinished(false); setCurrentIndex(0); setSelectedAnswer(''); setLanguageScore(0); setReasoningScore(0); setDataScore(0) }}>
            重新测评
          </Button>
        </div>
      </div>
    )
  }

  // 答题界面
  const progress = ((currentIndex + 1) / questions.length) * 100
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">能力测评</h1>
        <Tag color="purple">第 {currentIndex + 1}/{questions.length} 题</Tag>
        <Tag color="blue">{q.category}</Tag>
      </div>
      <Progress percent={Math.round(progress)} strokeColor={{ '0%': '#9333ea', '100%': '#ec4899' }} />

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-lg font-bold mb-6">{q.title}</h2>
        <div className="space-y-3">
          {parsedOptions.map((opt: string) => (
            <div key={opt}
              onClick={() => setSelectedAnswer(opt[0])}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                selectedAnswer === opt[0] ? 'border-purple-400 bg-purple-50 shadow-md' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                selectedAnswer === opt[0] ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{opt[0]}</span>
              <span>{opt.slice(3)}</span>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button size="large" type="primary" onClick={handleNext}
            style={{ background: 'linear-gradient(135deg, #9333ea, #ec4899)', border: 'none' }}>
            {currentIndex === questions.length - 1 ? '生成报告' : '下一题'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Assessment
