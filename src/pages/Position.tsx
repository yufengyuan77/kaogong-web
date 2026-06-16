import { useState, useEffect } from 'react'
import { Input, Tag, Spin, Select } from 'antd'
import { SearchOutlined, TrophyOutlined, EnvironmentOutlined, TeamOutlined, BankOutlined } from '@ant-design/icons'
import { getWithParams } from '../api/client'

interface Position {
  id: number; name: string; major: string; education: string; count: number; ratio: number
}

function Position() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('计算机类')

  useEffect(() => {
    setLoading(true)
    const params = keyword ? { keyword } : {} as Record<string, string>
    getWithParams<Position[]>('/positions', params)
      .then(setPositions).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [keyword])

  if (error) return <div className="text-center py-20"><p className="text-4xl mb-3">⚠️</p><p className="text-red-400">加载失败：{error}</p></div>

  const recommendedPositions = positions
    .filter((p) => p.major === selectedMajor || p.major === '不限专业')
    .sort((a, b) => a.ratio - b.ratio)

  const getRatioColor = (ratio: number) => ratio <= 25 ? 'text-green-500' : ratio <= 35 ? 'text-orange-500' : 'text-red-500'
  const getRatioBadge = (ratio: number) => ratio <= 25 ? 'green' : ratio <= 35 ? 'orange' : 'red'

  return (
    <div className="space-y-6">
      {/* ====== Banner ====== */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3"><BankOutlined />岗位库</h1>
        <p className="text-teal-100">精准匹配，找到最适合你的岗位</p>
      </div>

      {/* ====== 推荐岗位 ====== */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><TrophyOutlined className="text-amber-500" />推荐岗位</h2>
          <Select value={selectedMajor} onChange={setSelectedMajor} style={{ width: 140 }}
            options={['计算机类', '法学', '会计学'].map(m => ({ value: m, label: m }))} />
        </div>
        {loading ? <div className="flex justify-center py-4"><Spin /></div> : (
          <div className="grid grid-cols-2 gap-3">
            {recommendedPositions.slice(0, 4).map((p, i) => (
              <div key={p.id} className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                <span className="text-2xl font-bold text-amber-500 w-8">{['🥇','🥈','🥉','🏅'][i] || '🏅'}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-400">招{p.count}人 · 学历{p.education}</p>
                </div>
                <div className="text-right">
                  <Tag color={getRatioBadge(p.ratio)}>竞争比 {p.ratio}:1</Tag>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====== 搜索 ====== */}
      <Input
        size="large"
        placeholder="搜索岗位名称或专业..."
        prefix={<SearchOutlined className="text-gray-400" />}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="!rounded-xl"
      />

      {/* ====== 岗位列表 ====== */}
      {loading ? <div className="flex justify-center py-10"><Spin size="large" /></div> : (
        <div className="grid grid-cols-2 gap-4">
          {positions.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-800">{p.name}</h2>
                <Tag color={getRatioBadge(p.ratio)}>{p.ratio}:1</Tag>
              </div>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center gap-2"><EnvironmentOutlined />专业要求：<span className="font-medium text-gray-700">{p.major}</span></p>
                <p className="flex items-center gap-2"><BankOutlined />学历要求：<span className="font-medium text-gray-700">{p.education}</span></p>
                <p className="flex items-center gap-2"><TeamOutlined />招录人数：<span className="font-medium text-gray-700">{p.count} 人</span></p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className={`text-lg font-bold ${getRatioColor(p.ratio)}`}>
                  竞争比 {p.ratio}:1
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  {p.ratio <= 25 ? '👍 竞争较小' : p.ratio <= 35 ? '👉 竞争适中' : '🔥 竞争激烈'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Position
