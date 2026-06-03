import { Button } from 'antd'

function Home() {
  return (
    <div className="space-y-8">

      {/* Banner */}
      <div className="bg-blue-600 text-white rounded-2xl p-12 text-center">
        <h1 className="text-5xl font-bold mb-6">
          公考上岸，从这里开始
        </h1>

        <p className="text-xl mb-8">
          学、练、测、考、评、岗一体化学习平台
        </p>

        <Button size="large" type="primary">
          开始学习
        </Button>
      </div>

      {/* 数据统计 */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">今日学习</h3>
          <p className="text-3xl font-bold mt-3">2h</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">今日刷题</h3>
          <p className="text-3xl font-bold mt-3">50</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">模考成绩</h3>
          <p className="text-3xl font-bold mt-3">78</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">连续打卡</h3>
          <p className="text-3xl font-bold mt-3">15天</p>
        </div>
      </div>

      {/* 功能入口 */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          功能入口
        </h2>

        <div className="grid grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            学
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            练
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            测
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            考
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            评
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            岗
          </div>
        </div>
      </div>

      {/* 最近学习和公告 */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            最近学习
          </h2>

          <ul className="space-y-3">
            <li>行测基础课程</li>
            <li>言语理解专项训练</li>
            <li>判断推理专题</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            公告通知
          </h2>

          <ul className="space-y-3">
            <li>2026国考公告发布</li>
            <li>河北省考报名开启</li>
            <li>本周新增模拟试卷</li>
          </ul>
        </div>

      </div>

    </div>
  )
}

export default Home