import { useState } from 'react'
import { positions } from '../mock/positions'

function Position() {

  const [keyword, setKeyword] = useState('')

  const [selectedMajor, setSelectedMajor] =
    useState('计算机类')

  const filteredPositions =
    positions.filter((position) => {

      return (
        position.name.includes(keyword) ||
        position.major.includes(keyword)
      )

    })

  const recommendedPositions =
    positions
      .filter(
        (position) =>
          position.major === selectedMajor ||
          position.major === '不限专业'
      )
      .sort((a, b) => a.ratio - b.ratio)

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        岗位库
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-bold mb-4">
          我的专业
        </h2>

        <select
          value={selectedMajor}
          onChange={(e) =>
            setSelectedMajor(e.target.value)
          }
          className="border p-2 rounded-lg"
        >
          <option>计算机类</option>
          <option>法学</option>
          <option>会计学</option>
        </select>

      </div>

      <div className="bg-yellow-50 p-6 rounded-xl mb-8">

        <h2 className="text-xl font-bold mb-4">
          推荐岗位
        </h2>

        {
          recommendedPositions.map((position) => (

            <div
              key={position.id}
              className="mb-3"
            >

              <span className="font-bold">
                {position.name}
              </span>

              <span className="ml-4 text-green-600">
                竞争比：
                {position.ratio}:1
              </span>

            </div>

          ))
        }

      </div>

      <input
        type="text"
        placeholder="请输入岗位名称或专业"
        value={keyword}
        onChange={(e) =>
          setKeyword(e.target.value)
        }
        className="
          w-full
          p-3
          border
          rounded-xl
          mb-8
        "
      />

      <div className="grid grid-cols-2 gap-6">

        {filteredPositions.map((position) => (

          <div
            key={position.id}
            className="
              bg-white
              p-6
              rounded-xl
              shadow
            "
          >

            <h2 className="text-xl font-bold mb-4">
              {position.name}
            </h2>

            <p>
              学历要求：
              {position.education}
            </p>

            <p>
              专业要求：
              {position.major}
            </p>

            <p>
              招录人数：
              {position.count}
            </p>

            <p>
              竞争比：
              {position.ratio}:1
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Position