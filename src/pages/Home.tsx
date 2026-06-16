import { Button } from 'antd'

function Home() {
  return (
    <div className="space-y-8">

      {/* 顶部Banner */}
      <div
        className="
          bg-gradient-to-r
          from-blue-600
          via-cyan-500
          to-blue-700
          text-white
          rounded-3xl
          p-14
          shadow-xl
          text-center
        "
      >
        <div className="text-sm tracking-widest mb-4 opacity-80">
          KAOGONG LEARNING PLATFORM
        </div>

        <h1 className="text-6xl font-bold mb-6">
          公考上岸，从这里开始
        </h1>

        <p className="text-xl mb-10 opacity-90">
          学 · 练 · 测 · 考 · 评 · 岗
        </p>

        <div className="flex justify-center gap-4">
          <Button size="large" type="primary">
            开始学习
          </Button>

          <Button size="large">
            开始刷题
          </Button>
        </div>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-gray-500">
            今日学习
          </div>

          <div className="text-4xl font-bold mt-3 text-blue-600">
            2h
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-gray-500">
            今日刷题
          </div>

          <div className="text-4xl font-bold mt-3 text-green-600">
            50
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-gray-500">
            模考成绩
          </div>

          <div className="text-4xl font-bold mt-3 text-orange-500">
            78
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-gray-500">
            连续打卡
          </div>

          <div className="text-4xl font-bold mt-3 text-purple-600">
            15天
          </div>
        </div>

      </div>

      {/* 功能导航 */}
      <div>

        <h2 className="text-2xl font-bold mb-6">
          功能导航
        </h2>

        <div className="grid grid-cols-6 gap-6">

          {[
            '学',
            '练',
            '测',
            '考',
            '评',
            '岗',
          ].map((item) => (

            <div
              key={item}
              className="
                bg-white
                p-8
                rounded-2xl
                shadow
                text-center
                text-3xl
                font-bold
                cursor-pointer
                hover:-translate-y-2
                hover:shadow-xl
                transition
              "
            >
              {item}
            </div>

          ))}

        </div>

      </div>

      {/* 学习记录 */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            最近学习
          </h2>

          <ul className="space-y-3">

            <li>
              📘 行测基础课程
            </li>

            <li>
              📗 言语理解专项训练
            </li>

            <li>
              📙 判断推理专题
            </li>

          </ul>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-xl font-bold mb-4">
            公告通知
          </h2>

          <ul className="space-y-3">

            <li>
              📢 2026国考公告发布
            </li>

            <li>
              📢 河北省考报名开启
            </li>

            <li>
              📢 本周新增模拟试卷
            </li>

          </ul>

        </div>

      </div>

    </div>
  )
}

export default Home