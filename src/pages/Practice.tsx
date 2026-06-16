import { useState, useEffect } from 'react'
import { Button, Tag, Progress, Spin } from 'antd'
import { TrophyOutlined, CheckCircleOutlined, CloseCircleOutlined, FireOutlined } from '@ant-design/icons'
import { getWithParams } from '../api/client'

interface Question {
  id: number; type: string; category: string; title: string
  options: string; answer: string; analysis: string | null
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
  const [wrongList, setWrongList] = useState<Question[]>([])
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    getWithParams<Question[]>('/questions', { type: 'practice' })
      .then(setQuestions).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Spin size="large" /></div>
  if (error) return <div className="text-center py-20"><p className="text-4xl mb-3">⚠️</p><p className="text-red-400">加载失败：{error}</p></div>

  const q = questions[currentIndex]
  const parsedOptions: string[] = q ? JSON.parse(q.options) : []
  const accuracy = answeredCount === 0 ? 0 : Math.round((correctCount / answeredCount) * 100)
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSubmit = () => {
    if (!selectedAnswer) return alert('请选择答案')
    setAnsweredCount(answeredCount + 1)
    if (selectedAnswer === q.answer) { setCorrectCount(correctCount + 1) }
    else { setWrongList([...wrongList, q]) }
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) { setCurrentIndex(currentIndex + 1); setSelectedAnswer(''); setShowResult(false) }
    else { setIsFinished(true) }
  }

  const handleRestart = () => { setCurrentIndex(0); setSelectedAnswer(''); setShowResult(false); setAnsweredCount(0); setCorrectCount(0); setWrongList([]); setIsFinished(false) }

  if (isFinished) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-10 text-center text-white shadow-xl">
          <TrophyOutlined className="text-6xl mb-4" />
          <h1 className="text-4xl font-bold mb-2">练习完成！</h1>
          <p className="text-blue-100">继续保持，上岸指日可待</p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '总题数', value: questions.length, color: 'text-gray-700' },
            { label: '答对', value: correctCount, color: 'text-green-500' },
            { label: '正确率', value: `${accuracy}%`, color: 'text-blue-500' },
            { label: '错题', value: wrongList.length, color: 'text-red-500' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow p-5 text-center">
              <p className="text-gray-400 text-sm mb-2">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {wrongList.length > 0 && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><CloseCircleOutlined className="text-red-500" />错题回顾</h2>
            <div className="space-y-3">
              {wrongList.map((w, i) => (
                <div key={i} className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="font-medium mb-1">{w.title}</p>
                  <p className="text-sm text-green-600">正确答案：{w.answer}</p>
                  {w.analysis && <p className="text-sm text-gray-400 mt-1">解析：{w.analysis}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Button size="large" type="primary" onClick={handleRestart}>重新练习</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 顶部 Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-1 flex items-center gap-3"><FireOutlined />题库中心</h1>
        <p className="text-green-100">逐题精练，查漏补缺</p>
      </div>

      {/* 统计条 */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '已做', value: answeredCount, icon: '📝' },
          { label: '正确', value: correctCount, icon: '✅' },
          { label: '正确率', value: `${accuracy}%`, icon: '📊' },
          { label: '进度', value: `${currentIndex + 1}/${questions.length}`, icon: '📍' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 全局进度条 */}
      <Progress percent={Math.round(progress)} strokeColor={{ '0%': '#10b981', '100%': '#3b82f6' }} />

      {/* 题目卡片 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-4">
          <Tag color="green">第 {currentIndex + 1} 题</Tag>
          {q.category && <Tag color="blue">{q.category}</Tag>}
        </div>

        <h2 className="text-xl font-bold mb-6">{q.title}</h2>

        <div className="space-y-3">
          {parsedOptions.map((opt: string) => {
            const letter = opt[0]
            const isSelected = selectedAnswer === letter
            const isCorrect = showResult && letter === q.answer
            const isWrong = showResult && isSelected && letter !== q.answer
            return (
              <div key={opt}
                onClick={() => !showResult && setSelectedAnswer(letter)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-3 ${
                  isCorrect ? 'border-green-400 bg-green-50' :
                  isWrong ? 'border-red-400 bg-red-50' :
                  isSelected ? 'border-blue-400 bg-blue-50 shadow-md' :
                  'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                } ${showResult ? 'cursor-default' : ''}`}
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  isCorrect ? 'bg-green-500 text-white' :
                  isWrong ? 'bg-red-500 text-white' :
                  isSelected ? 'bg-blue-500 text-white' :
                  'bg-gray-100 text-gray-500'
                }`}>{letter}</span>
                <span className="flex-1">{opt.slice(3)}</span>
                {isCorrect && <CheckCircleOutlined className="text-green-500 text-xl" />}
                {isWrong && <CloseCircleOutlined className="text-red-500 text-xl" />}
              </div>
            )
          })}
        </div>

        <div className="flex gap-3 mt-8">
          <Button size="large" type="primary" disabled={showResult || !selectedAnswer} onClick={handleSubmit}>提交答案</Button>
          <Button size="large" style={{ background: '#10b981', borderColor: '#10b981', color: 'white' }} onClick={handleNext}>
            {currentIndex === questions.length - 1 ? '完成练习' : '下一题'}
          </Button>
        </div>

        {showResult && (
          <div className={`mt-6 p-5 rounded-xl border ${selectedAnswer === q.answer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <p className="font-bold mb-2 flex items-center gap-2">
              {selectedAnswer === q.answer ? <CheckCircleOutlined className="text-green-500" /> : <CloseCircleOutlined className="text-red-500" />}
              {selectedAnswer === q.answer ? '回答正确！' : '回答错误'}
            </p>
            <p className="text-sm">正确答案：<span className="font-bold text-green-600">{q.answer}</span></p>
            {q.analysis && <p className="text-sm text-gray-500 mt-2">💡 {q.analysis}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Practice
