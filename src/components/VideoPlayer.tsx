import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { courses, lessonsData } from '../mock/courses'
import { Button, Collapse, Progress } from 'antd'
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  MenuOutlined,
  CheckCircleFilled,
  PlayCircleFilled,
} from '@ant-design/icons'

const categoryColors: Record<string, string> = {
  '行测': 'from-blue-600 to-cyan-500',
  '申论': 'from-orange-600 to-red-500',
  '面试': 'from-purple-600 to-pink-500',
}

function VideoPlayer() {
  const { courseId, lessonId } = useParams<{
    courseId: string
    lessonId: string
  }>()
  const navigate = useNavigate()

  const course = courses.find((c) => c.id === Number(courseId))
  const lesson = lessonsData.find((l) => l.id === Number(lessonId))
  const lessons = lessonsData
    .filter((l) => l.courseId === Number(courseId))
    .sort((a, b) => a.order - b.order)

  const currentIndex = lessons.findIndex((l) => l.id === Number(lessonId))
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null

  const progressPercent =
    lessons.length > 0
      ? Math.round(((currentIndex + 1) / lessons.length) * 100)
      : 0

  const colors = course ? categoryColors[course.category] || categoryColors['行测'] : categoryColors['行测']

  if (!course || !lesson) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📭</p>
        <h2 className="text-2xl font-bold text-gray-500 mb-4">内容未找到</h2>
        <Button type="primary" onClick={() => navigate('/study')}>
          返回课程中心
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ====== 返回按钮 ====== */}
      <button
        onClick={() => navigate(`/study/${courseId}`)}
        className="flex items-center gap-2 text-gray-400 hover:text-blue-500 mb-4 transition group"
      >
        <ArrowLeftOutlined className="group-hover:-translate-x-1 transition-transform" />
        <span>返回课程详情</span>
      </button>

      {/* ====== 顶部信息条 ====== */}
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${colors} p-4 mb-4 shadow-md`}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <p className="text-white/70 text-sm mb-1">{course.title}</p>
          <h1 className="text-white text-xl font-bold flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm">
              {lesson.order}
            </span>
            {lesson.title}
          </h1>
        </div>
      </div>

      {/* ====== 视频播放区域 ====== */}
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl mb-4 ring-1 ring-gray-800">
        {/* 装饰顶部栏 */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 z-10" />

        <video
          key={lesson.id}
          controls
          className="w-full max-h-[480px]"
          poster={`data:image/svg+xml,${encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" fill="#0f172a"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><rect width="800" height="450" fill="url(#g)"/><circle cx="400" cy="200" r="60" fill="none" stroke="#3b82f6" stroke-width="3" opacity="0.5"/><polygon points="390,170 390,230 425,200" fill="#3b82f6" opacity="0.8"/><text x="400" y="300" text-anchor="middle" fill="#94a3b8" font-size="18">${lesson.title}</text><text x="400" y="330" text-anchor="middle" fill="#64748b" font-size="13">${course.title} · 第${lesson.order}节</text></svg>`
          )}`}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          您的浏览器不支持视频播放
        </video>
      </div>

      {/* ====== 学习进度条 ====== */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">课程学习进度</span>
          <span className="text-sm font-bold text-blue-500">
            {currentIndex + 1} / {lessons.length} 节
          </span>
        </div>
        <Progress
          percent={progressPercent}
          strokeColor={{
            '0%': '#3b82f6',
            '100%': '#06b6d4',
          }}
          trailColor="#f1f5f9"
          showInfo={false}
        />
      </div>

      {/* ====== 章节快速跳转（可折叠） ====== */}
      <div className="bg-white rounded-xl shadow mb-4 overflow-hidden">
        <Collapse
          ghost
          size="small"
          expandIconPosition="end"
          items={[
            {
              key: 'chapters',
              label: (
                <span className="flex items-center gap-2 text-gray-600 font-medium">
                  <MenuOutlined />
                  章节列表（快速跳转）
                </span>
              ),
              children: (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {lessons.map((l, idx) => {
                    const isCurrent = l.id === lesson.id
                    const isDone = idx < currentIndex
                    return (
                      <div
                        key={l.id}
                        onClick={() =>
                          navigate(`/study/${courseId}/lesson/${l.id}`)
                        }
                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-all ${
                          isCurrent
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        {/* 状态图标 */}
                        {isDone ? (
                          <CheckCircleFilled className="text-green-400 text-sm shrink-0" />
                        ) : isCurrent ? (
                          <PlayCircleFilled className="text-blue-500 text-sm shrink-0 animate-pulse" />
                        ) : (
                          <PlayCircleOutlined className="text-gray-300 text-sm shrink-0" />
                        )}

                        {/* 标题 */}
                        <span
                          className={`text-sm truncate flex-1 ${
                            isCurrent
                              ? 'text-blue-700 font-medium'
                              : isDone
                              ? 'text-gray-400'
                              : 'text-gray-600'
                          }`}
                        >
                          {l.order}. {l.title}
                        </span>

                        {/* 时长 */}
                        <span className="text-xs text-gray-300 flex items-center gap-1 shrink-0">
                          <ClockCircleOutlined />
                          {l.duration}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ),
            },
          ]}
        />
      </div>

      {/* ====== 底部导航栏 ====== */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
        <Button
          onClick={() =>
            prevLesson &&
            navigate(`/study/${courseId}/lesson/${prevLesson.id}`)
          }
          disabled={!prevLesson}
          icon={<LeftOutlined />}
          className={!prevLesson ? 'opacity-40' : ''}
        >
          上一节
        </Button>

        <span className="text-sm text-gray-400 font-medium">
          第 {currentIndex + 1} 节 / 共 {lessons.length} 节
        </span>

        <Button
          type="primary"
          onClick={() =>
            nextLesson &&
            navigate(`/study/${courseId}/lesson/${nextLesson.id}`)
          }
          disabled={!nextLesson}
          icon={<RightOutlined />}
          iconPosition="end"
          className={!nextLesson ? 'opacity-40' : ''}
        >
          下一节
        </Button>
      </div>
    </div>
  )
}

export default VideoPlayer
