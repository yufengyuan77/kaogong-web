import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import { getWithParams } from '../api/client'

interface Position {
  id: number
  name: string
  major: string
  education: string
  count: number
  ratio: number
}

function Position() {
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [keyword, setKeyword] = useState('')
  const [selectedMajor, setSelectedMajor] = useState('计算机类')

  useEffect(() => {
    setLoading(true)
    getWithParams<Position[]>('/positions', keyword ? { keyword } : {} as Record<string, string>)
      .then(setPositions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [keyword])

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-3">⚠️</p>
        <p className="text-red-400">加载失败：{error}</p>
      </div>
    )
  }

  const recommendedPositions = positions
    .filter((p) => p.major === selectedMajor || p.major === '不限专业')
    .sort((a, b) => a.ratio - b.ratio)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">岗位库</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-bold mb-4">我的专业</h2>
        <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}
          className="border p-2 rounded-lg">
          <option>计算机类</option>
          <option>法学</option>
          <option>会计学</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Spin size="large" /></div>
      ) : (
        <>
          <div className="bg-yellow-50 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-bold mb-4">推荐岗位</h2>
            {recommendedPositions.map((p) => (
              <div key={p.id} className="mb-3">
                <span className="font-bold">{p.name}</span>
                <span className="ml-4 text-green-600">竞争比：{p.ratio}:1</span>
              </div>
            ))}
          </div>

          <input type="text" placeholder="请输入岗位名称或专业" value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-3 border rounded-xl mb-8" />

          <div className="grid grid-cols-2 gap-6">
            {positions.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-xl font-bold mb-4">{p.name}</h2>
                <p>学历要求：{p.education}</p>
                <p>专业要求：{p.major}</p>
                <p>招录人数：{p.count}</p>
                <p>竞争比：{p.ratio}:1</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Position
