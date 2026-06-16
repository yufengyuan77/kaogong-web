function Analysis() {

  const statistics = {
    courses: 12,
    questions: 356,
    accuracy: 78,
    exams: 5,
    bestScore: 86,
  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        学习分析中心
      </h1>

      <div className="grid grid-cols-5 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            学习课程
          </p>

          <p className="text-3xl font-bold">
            {statistics.courses}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            刷题数量
          </p>

          <p className="text-3xl font-bold">
            {statistics.questions}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            正确率
          </p>

          <p className="text-3xl font-bold text-blue-500">
            {statistics.accuracy}%
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            模考次数
          </p>

          <p className="text-3xl font-bold">
            {statistics.exams}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <p className="text-gray-500">
            最高分
          </p>

          <p className="text-3xl font-bold text-green-500">
            {statistics.bestScore}
          </p>

        </div>

      </div>

      <div className="bg-white p-8 rounded-xl shadow mt-8">

        <h2 className="text-2xl font-bold mb-6">
          AI学习建议
        </h2>

        <ul className="space-y-3">

          <li>
            ✓ 判断推理正确率偏低，建议加强专项训练
          </li>

          <li>
            ✓ 资料分析提升空间较大
          </li>

          <li>
            ✓ 保持每日刷题 20 题以上
          </li>

        </ul>

      </div>

    </div>

  )
}

export default Analysis