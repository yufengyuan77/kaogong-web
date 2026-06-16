import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button, Tag, Progress, Spin } from 'antd'
import {
  ArrowLeftOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  CheckCircleFilled,
} from '@ant-design/icons'
import { get } from '../api/client'

interface Course {
  id: number; title: string; category: string; description: string
  instructor: string; thumbnail: string; totalLessons: number; duration: string
}

interface Lesson {
  id: number; courseId: number; title: string; duration: string
  videoUrl: string; orderNum: number
}

const categoryColors: Record<string, { gradient: string; light: string; tag: 'blue' | 'orange' | 'purple' }> = {
  '行测': { gradient: 'from-blue-600 to-cyan-500', light: 'bg-blue-50 text-blue-600', tag: 'blue' },
  '申论': { gradient: 'from-orange-600 to-red-500', light: 'bg-orange-50 text-orange-600', tag: 'orange' },
  '面试': { gradient: 'from-purple-600 to-pink-500', light: 'bg-purple-50 text-purple-600', tag: 'purple' },
}

function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([
      get<Course>(`/courses/${courseId}`),
      get<Lesson[]>(`/courses/${courseId}/lessons`),
    ])
      .then(([c, l]) => {
        setCourse(c)
        setLessons(l)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [courseId])

  if (loading) {
    return <div className="flex justify-center py-20"><Spin size="large" /></div>
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">⚠️</p>
        <h2 className="text-2xl font-bold text-gray-500 mb-4">加载失败</h2>
        <p className="text-gray-400 mb-4">{error}</p>
        <Button type="primary" onClick={() => navigate('/study')}>返回课程中心</Button>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-2xl font-bold text-gray-500 mb-4">课程未找到</h2>
        <Button type="primary" onClick={() => navigate('/study')}>返回课程中心</Button>
      </div>
    )
  }

  const completedCount = 1
  const progressPercent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0
  const colors = categoryColors[course.category] || categoryColors['行测']

  return (
    <div>
      <button
        onClick={() => navigate('/study')}
        className="flex items-center gap-2 text-gray-400 hover:text-blue-500 mb-6 transition group"
      >
        <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />
        <span>返回课程中心</span>
      </button>

      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} p-8 mb-8 shadow-lg`}>
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute bottom-0 right-20 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative flex items-start gap-8">
          <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-6xl shrink-0 shadow-inner">
            {course.thumbnail}
          </div>
          <div className="flex-1 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Tag color={colors.tag} className="bg-white/20 border-0 text-white">{course.category}</Tag>
            </div>
            <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
            <p className="text-white/80 mb-4 leading-relaxed max-w-2xl">{course.description}</p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-1.5"><UserOutlined />{course.instructor}</span>
              <span className="flex items-center gap-1.5"><ClockCircleOutlined />{course.duration}</span>
              <span className="flex items-center gap-1.5"><BookOutlined />共 {course.totalLessons} 课时</span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col items-center">
            <Progress type="circle" percent={progressPercent} size={100}
              strokeColor="white" trailColor="rgba(255,255,255,0.2)"
              format={() => <span className="text-white text-lg font-bold">{progressPercent}%</span>} />
            <span className="text-white/70 text-xs mt-2">学习进度</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">📖</span>课程目录
          </h2>
          <span className="text-sm text-gray-400">已学 {completedCount}/{lessons.length} 节</span>
        </div>

        <div className="space-y-1">
          {lessons.map((lesson, idx) => {
            const isCompleted = idx === 0 // 第一节标记为已学
            return (
              <div key={lesson.id}
                onClick={() => navigate(`/study/${courseId}/lesson/${lesson.id}`)}
                className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-l-4 ${
                  isCompleted
                    ? 'border-l-green-400 bg-green-50/50 hover:bg-green-50'
                    : 'border-l-transparent hover:border-l-blue-400 hover:bg-blue-50/50'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all ${
                  isCompleted ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                }`}>
                  {isCompleted ? <CheckCircleFilled /> : <PlayCircleOutlined />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${isCompleted ? 'text-green-700' : 'text-gray-800 group-hover:text-blue-600'} transition-colors`}>
                    {lesson.title}
                  </h3>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                  <ClockCircleOutlined />{lesson.duration}
                </span>
                <PlayCircleOutlined className={`text-xl transition-all ${isCompleted ? 'text-green-400' : 'text-blue-400 group-hover:text-blue-500 group-hover:scale-110'}`} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
