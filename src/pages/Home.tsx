import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spin, Progress } from 'antd'
import {
  ThunderboltOutlined, BookOutlined, EditOutlined,
  TrophyOutlined, RiseOutlined, CalendarOutlined,
} from '@ant-design/icons'
import { get } from '../api/client'

interface Stats {
  todayStudyHours: string; todayQuestions: number; examScore: number
  streakDays: number; totalCourses: number; totalQuestions: number; totalPositions: number
}

const navItems = [
  { label: '学', path: '/study', icon: '📖', desc: '课程中心', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
  { label: '练', path: '/practice', icon: '✏️', desc: '题库练习', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', text: 'text-green-600' },
  { label: '测', path: '/test', icon: '📊', desc: '能力测评', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', text: 'text-purple-600' },
  { label: '考', path: '/exam', icon: '📝', desc: '模拟考试', color: 'from-red-500 to-orange-500', bg: 'bg-red-50', text: 'text-red-600' },
  { label: '评', path: '/analysis', icon: '📈', desc: '学习分析', color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  { label: '岗', path: '/position', icon: '💼', desc: '岗位查询', color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50', text: 'text-teal-600' },
]

function Home() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    get<Stats>('/stats').then(setStats).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const s = stats || { todayStudyHours: '2h', todayQuestions: 50, examScore: 78, streakDays: 15, totalCourses: 6, totalQuestions: 180, totalPositions: 5 }

  return (
    <div className="space-y-8">
      {/* ====== Banner ====== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white p-14 shadow-2xl text-center">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full" />
        <div className="absolute top-10 right-40 w-4 h-4 bg-white/20 rounded-full animate-ping" />
        <div className="absolute bottom-20 left-40 w-3 h-3 bg-white/20 rounded-full" />
        <div className="relative">
          <div className="text-sm tracking-[0.3em] mb-4 opacity-70 font-mono">KAOGONG LEARNING PLATFORM</div>
          <h1 className="text-7xl font-extrabold mb-6 tracking-tight">公考上岸，从这里开始</h1>
          <p className="text-xl mb-10 opacity-85 font-light">学 · 练 · 测 · 考 · 评 · 岗 — 一站式备考解决方案</p>
          <div className="flex justify-center gap-4">
            <Button size="large" onClick={() => navigate('/study')}
              className="!h-12 !px-8 !text-lg !font-bold !rounded-xl"
              style={{ background: 'white', color: '#1d4ed8', border: 'none' }}>
              <BookOutlined /> 开始学习
            </Button>
            <Button size="large" onClick={() => navigate('/practice')}
              className="!h-12 !px-8 !text-lg !font-bold !rounded-xl !border-white !text-white"
              style={{ background: 'transparent' }}>
              <EditOutlined /> 开始刷题
            </Button>
          </div>
        </div>
      </div>

      {/* ====== 数据统计 ====== */}
      {loading ? <div className="flex justify-center py-8"><Spin /></div> : (
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: '今日学习', value: s.todayStudyHours, icon: <ThunderboltOutlined />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: '今日刷题', value: s.todayQuestions, icon: <EditOutlined />, color: 'text-green-600', bg: 'bg-green-50' },
            { label: '模考成绩', value: s.examScore, icon: <TrophyOutlined />, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: '连续打卡', value: `${s.streakDays}天`, icon: <CalendarOutlined />, color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center text-xl ${item.color}`}>{item.icon}</div>
                <span className="text-gray-400 text-sm">{item.label}</span>
              </div>
              <p className={`text-4xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* ====== 功能导航 ====== */}
      <div>
        <h2 className="text-2xl font-bold mb-2">功能导航</h2>
        <p className="text-gray-400 mb-6 text-sm">六大核心模块，全方位助力备考</p>
        <div className="grid grid-cols-6 gap-4">
          {navItems.map((item) => (
            <div key={item.label} onClick={() => navigate(item.path)}
              className="group bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl ${item.bg} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <p className={`text-2xl font-extrabold mb-1 ${item.text} group-hover:scale-105 transition-transform`}>{item.label}</p>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ====== 底部信息 ====== */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><RiseOutlined className="text-blue-500" />最近学习</h2>
          <div className="space-y-4">
            {[
              { title: '行测基础课程', progress: 60, time: '2小时前' },
              { title: '言语理解专项训练', progress: 35, time: '昨天' },
              { title: '判断推理专题', progress: 20, time: '2天前' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-2xl">{['📘','📗','📙'][i]}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                  <Progress percent={item.progress} showInfo={false} size="small" strokeColor="#3b82f6" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold mb-4">📢 公告通知</h2>
          <div className="space-y-4">
            {[
              { title: '2026国考公告发布', time: '6月15日', tag: '重要' },
              { title: '河北省考报名开启', time: '6月12日', tag: '报名' },
              { title: '本周新增模拟试卷60道', time: '6月10日', tag: '更新' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                <span className="text-2xl">📢</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
                <span className="text-xs bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
