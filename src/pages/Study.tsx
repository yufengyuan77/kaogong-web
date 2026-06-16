import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tag, Spin } from 'antd'
import {
  BookOutlined,
  PlayCircleOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { getWithParams } from '../api/client'

// API 返回的课程类型
interface Course {
  id: number
  title: string
  category: string
  description: string
  instructor: string
  thumbnail: string
  totalLessons: number
  duration: string
}

const categories = [
  { key: '行测', icon: '📊', label: '行测' },
  { key: '申论', icon: '✍️', label: '申论' },
  { key: '面试', icon: '🎤', label: '面试' },
]

const categoryColors: Record<string, string> = {
  '行测': 'from-blue-500 to-cyan-500',
  '申论': 'from-orange-500 to-red-500',
  '面试': 'from-purple-500 to-pink-500',
}

const categoryCardBg: Record<string, string> = {
  '行测': 'from-blue-50 to-cyan-50',
  '申论': 'from-orange-50 to-red-50',
  '面试': 'from-purple-50 to-pink-50',
}

const categoryTagColor: Record<string, string> = {
  '行测': 'blue',
  '申论': 'orange',
  '面试': 'purple',
}

function Study() {
  const [category, setCategory] = useState('行测')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // 从后端获取课程数据
  useEffect(() => {
    setLoading(true)
    setError(null)
    getWithParams<Course[]>('/courses', { category })
      .then(setCourses)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  const filteredCourses = courses

  const stats = useMemo(() => {
    const totalCourses = courses.length
    const totalLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0)
    return { totalCourses, totalLessons, categoryCount: categories.length }
  }, [courses])

  return (
    <div>
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 p-8 mb-8 shadow-lg">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📚</span>
            <h1 className="text-3xl font-bold text-white">课程中心</h1>
          </div>
          <p className="text-blue-100 text-lg">系统化学习，从基础到进阶，助你高效备考</p>
        </div>
      </div>

      {/* 统计概览条 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
            <BookOutlined className="text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalCourses}</p>
            <p className="text-sm text-gray-400">精品课程</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
            <PlayCircleOutlined className="text-green-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalLessons}</p>
            <p className="text-sm text-gray-400">课程课时</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
            <AppstoreOutlined className="text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.categoryCount}</p>
            <p className="text-sm text-gray-400">学习分类</p>
          </div>
        </div>
      </div>

      {/* 分类筛选按钮 */}
      <div className="flex gap-3 mb-8">
        {categories.map((cat) => {
          const isActive = category === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => setCategory(cat.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${categoryColors[cat.key]} text-white shadow-lg scale-105`
                  : 'bg-white text-gray-600 shadow hover:shadow-md hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* 课程列表 */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">
          <p className="text-4xl mb-3">⚠️</p>
          <p>加载失败：{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/study/${course.id}`)}
              className="group bg-white rounded-2xl shadow overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer ring-1 ring-gray-100 hover:ring-blue-200"
            >
              <div
                className={`h-28 bg-gradient-to-br ${categoryCardBg[course.category]} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/60 rounded-full" />
                <span className="text-5xl relative z-10 drop-shadow-sm">{course.thumbnail}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag color={categoryTagColor[course.category]}>{course.category}</Tag>
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>👨‍🏫 {course.instructor}</span>
                  <span>⏱ {course.duration}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>共 {course.totalLessons} 课时</span>
                    <span className="text-blue-500 font-medium">开始学习 →</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${categoryColors[course.category]} rounded-full`}
                      style={{ width: '30%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Study
