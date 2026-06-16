import { useState, useEffect } from 'react'
import { Progress, Spin, Tag } from 'antd'
import { TrophyOutlined, RiseOutlined, FireOutlined, BulbOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { get } from '../api/client'

interface Stats {
  todayStudyHours: string; todayQuestions: number; examScore: number
  streakDays: number; totalCourses: number; totalQuestions: number; totalPositions: number
}

function Analysis() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get<Stats>('/stats').then(setStats).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const s = stats || { todayStudyHours: '2h', todayQuestions: 50, examScore: 78, streakDays: 15, totalCourses: 6, totalQuestions: 180, totalPositions: 5 }

  const abilities = [
    { name: '言语理解', score: 72, color: '#3b82f6' },
    { name: '数量关系', score: 58, color: '#f97316' },
    { name: '判断推理', score: 80, color: '#10b981' },
    { name: '资料分析', score: 65, color: '#8b5cf6' },
    { name: '常识判断', score: 55, color: '#ef4444' },
  ]

  const studyTrend = [
    { day: '周一', hours: 2.5 }, { day: '周二', hours: 3.0 }, { day: '周三', hours: 1.5 },
    { day: '周四', hours: 4.0 }, { day: '周五', hours: 2.0 }, { day: '周六', hours: 5.5 }, { day: '周日', hours: 3.5 },
  ]
  const maxHours = Math.max(...studyTrend.map(t => t.hours))

  if (loading) return <div className="flex justify-center py-20"><Spin size="large" /></div>

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3"><RiseOutlined />学习分析</h1>
        <p className="text-indigo-100">数据驱动，精准提升</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '累计学习', value: s.todayStudyHours, icon: <ThunderboltOutlined />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '刷题总数', value: s.todayQuestions, icon: <FireOutlined />, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '模考平均分', value: s.examScore, icon: <TrophyOutlined />, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: '连续打卡', value: `${s.streakDays}天`, icon: <RiseOutlined />, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center text-xl ${item.color}`}>{item.icon}</div>
            <div><p className="text-xs text-gray-400">{item.label}</p><p className={`text-2xl font-bold ${item.color}`}>{item.value}</p></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-6">🎯 能力评估</h2>
          <div className="space-y-5">
            {abilities.map(a => (
              <div key={a.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-600">{a.name}</span>
                  <span className="font-bold" style={{ color: a.color }}>{a.score}分</span>
                </div>
                <Progress percent={a.score} showInfo={false} strokeColor={a.color} trailColor="#f1f5f9" size="small" />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-6">📊 本周学习时长</h2>
          <div className="flex items-end justify-between gap-1 h-48 px-2">
            {studyTrend.map(t => (
              <div key={t.day} className="flex flex-col items-center gap-2 flex-1">
                <span className="text-xs font-bold text-gray-600">{t.hours}h</span>
                <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                  style={{ height: `${(t.hours / maxHours) * 140}px`, background: 'linear-gradient(to top, #6366f1, #818cf8)' }} />
                <span className="text-xs text-gray-400">{t.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">⚠️ 薄弱环节</h2>
          <div className="space-y-3">
            {abilities.filter(a => a.score < 65).map(a => (
              <div key={a.name} className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                <span className="font-medium text-gray-700">{a.name}</span>
                <Tag color="red">{a.score}分 — 需加强</Tag>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow p-6 border border-amber-200">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BulbOutlined className="text-amber-500" />AI 学习建议</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-amber-500">💡</span><span>每天1小时专攻<span className="font-bold text-red-500">常识判断</span>，积累时政和法律知识</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-500">💡</span><span><span className="font-bold text-orange-500">数量关系</span>先掌握基础题型再挑战难题</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-500">💡</span><span><span className="font-bold text-green-500">判断推理</span>得分最高，可适当减少时间</span></li>
            <li className="flex items-start gap-2"><span className="text-amber-500">💡</span><span>周末学习时长久，建议保持节奏</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Analysis
