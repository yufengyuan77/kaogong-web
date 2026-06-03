import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 导航栏 */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between px-6">
          <div className="text-2xl font-bold text-blue-600">
            考公学习平台
          </div>

          <div className="flex gap-6">
            <Link to="/">首页</Link>
            <Link to="/study">学</Link>
            <Link to="/practice">练</Link>
            <Link to="/test">测</Link>
            <Link to="/exam">考</Link>
            <Link to="/analysis">评</Link>
            <Link to="/position">岗</Link>
            <Link to="/profile">个人中心</Link>
          </div>
        </div>
      </div>

      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout