import { useState, useEffect } from 'react'
import { Button, Tag, Progress, Spin, Modal } from 'antd'
import { TrophyOutlined, ClockCircleOutlined, FileTextOutlined, WarningOutlined } from '@ant-design/icons'
import { getWithParams } from '../api/client'

interface Question {
  id: number; type: string; category: string; title: string
  options: string; answer: string; analysis: string | null
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
  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'exam' })
      .then(setQuestions).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spin size="large" /></div>
  if (error) return <div className="text-center py-20"><p className="text-4xl mb-3">⚠️</p><p className="text-red-400">加载失败：{error}</p></div>

  const q = questions[currentIndex]
  const parsedOptions: string[] = q ? JSON.parse(q.options) : []
  const progress = ((currentIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(answers).length

  const handleSelect = (letter: string) => {
    setSelectedAnswer(letter)
    setAnswers({ ...answers, [q.id]: letter })
  }

  const handleNext = () => {
    if (selectedAnswer === q.answer) setScore(s => s + 1)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(answers[questions[currentIndex + 1]?.id] || '')
    } else {
      setFinished(true)
    }
  }

  const handleSubmit = () => {
    Modal.confirm({
      title: '确认交卷',
      icon: <WarningOutlined />,
      content: `还有 ${questions.length - answeredCount} 题未作答，确定交卷吗？`,
      okText: '确认交卷',
      cancelText: '继续答题',
      onOk: () => {
        let s = score
        questions.forEach(q => { if (answers[q.id] === q.answer) s++ })
        setScore(s)
        setFinished(true)
      },
    })
  }

  if (!started) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-10 text-center text-white shadow-xl">
          <FileTextOutlined className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">模拟考试</h1>
          <p className="text-red-100 text-lg">真实考场体验，检验备考成果</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: '总题数', value: `${questions.length} 题`, icon: '📝', color: 'from-blue-500 to-blue-400' },
            { label: '考试时间', value: '120 分钟', icon: '⏱', color: 'from-green-500 to-green-400' },
            { label: '总分', value: `${questions.length} 分`, icon: '🎯', color: 'from-purple-500 to-purple-400' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} text-white rounded-xl p-6 text-center shadow-lg`}>
              <p className="text-3xl mb-2">{s.icon}</p>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow p-8 text-center">
          <p className="text-gray-400 mb-6">⚠️ 请在规定时间内完成，超时将自动交卷</p>
          <Button size="large" type="primary" onClick={() => setStarted(true)}
            style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', border: 'none' }}>
            开始考试
          </Button>
        </div>
      </div>
    )
  }

  if (finished) {
    const accuracy = Math.round((score / questions.length) * 100)
    const getLevel = (pct: number) => pct >= 80 ? { text: '优秀', color: 'text-green-500' } : pct >= 60 ? { text: '良好', color: 'text-blue-500' } : { text: '继续努力', color: 'text-orange-500' }
    const level = getLevel(accuracy)
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-10 text-center text-white shadow-xl">
          <TrophyOutlined className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">考试结束</h1>
          <p className="text-red-100">成绩已生成</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-400 mb-2">得分</p>
            <p className="text-6xl font-bold text-red-500">{score}</p>
            <p className="text-sm text-gray-400">/ {questions.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center flex flex-col items-center justify-center">
            <p className="text-gray-400 mb-3">正确率</p>
            <Progress type="circle" percent={accuracy} size={120}
              strokeColor={accuracy >= 80 ? '#10b981' : accuracy >= 60 ? '#3b82f6' : '#f97316'} />
            <p className={`text-xl font-bold mt-2 ${level.color}`}>{level.text}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-400 mb-2">用时</p>
            <p className="text-3xl font-bold text-gray-700">--:--</p>
            <p className="text-sm text-gray-400">分钟</p>
          </div>
        </div>
        <div className="text-center">
          <Button size="large" type="primary" onClick={() => { setStarted(false); setFinished(false); setCurrentIndex(0); setScore(0); setSelectedAnswer(''); setAnswers({}) }}>
            重新考试
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          模拟考试
          <Tag color="red">第 {currentIndex + 1}/{questions.length} 题</Tag>
        </h1>
        <Button danger onClick={handleSubmit} icon={<WarningOutlined />}>交卷</Button>
      </div>
      <Progress percent={Math.round(progress)} strokeColor={{ '0%': '#ef4444', '100%': '#f97316' }} />

      {/* 题号快速导航 */}
      <div className="flex gap-1.5 flex-wrap">
        {questions.map((_, i) => (
          <button key={i}
            onClick={() => { setCurrentIndex(i); setSelectedAnswer(answers[questions[i]?.id] || '') }}
            className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
              i === currentIndex ? 'bg-red-500 text-white shadow scale-110' :
              answers[questions[i]?.id] ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >{i + 1}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-2 mb-4">
          {q.category && <Tag color="orange">{q.category}</Tag>}
        </div>
        <h2 className="text-lg font-bold mb-6">{q.title}</h2>
        <div className="space-y-3">
          {parsedOptions.map((opt: string) => (
            <div key={opt}
              onClick={() => handleSelect(opt[0])}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                selectedAnswer === opt[0] ? 'border-orange-400 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                selectedAnswer === opt[0] ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{opt[0]}</span>
              <span>{opt.slice(3)}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <Button size="large" type="primary" onClick={handleNext}
            style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', border: 'none' }}>
            {currentIndex === questions.length - 1 ? '完成' : '下一题'}
          </Button>
          {currentIndex === questions.length - 1 && (
            <Button size="large" danger onClick={handleSubmit}>交卷</Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Exam
