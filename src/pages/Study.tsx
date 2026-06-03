import { useState } from 'react'

import { courses } from '../mock/courses'

function Study() {

  const [category, setCategory] = useState('行测')

console.log(category)

const filteredCourses = courses.filter(
  (course) => course.category === category
)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        课程中心
      </h1>

      {/* 课程分类 */}
      <div className="flex gap-4 mb-8">
        <button
        onClick={() => setCategory('行测')}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg">
          行测
        </button>

        <button 
        onClick={() => setCategory('申论')}
        className="px-6 py-2 bg-white rounded-lg shadow">
          申论
        </button>

        <button 
        onClick={() => setCategory('面试')}
        className="px-6 py-2 bg-white rounded-lg shadow">
          面试
        </button>
      </div>

      {/* 课程列表 */}
      <div className="grid grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.title}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <div className="text-4xl text-blue-500 mb-4">
            </div>

            <h2 className="text-xl font-bold mb-2">
              {course.title}
            </h2>

            <p className="text-gray-500">
              共 {course.lessons} 课时
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Study