import { Outlet, Link } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* 顶部导航栏 */}
      <header
        className="
          bg-white
          shadow
          sticky
          top-0
          z-50
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-16
            flex
            items-center
            justify-between
          "
        >

          <div className="flex items-center gap-3">

  <div
    className="
      w-10
      h-10
      rounded-xl
      bg-gradient-to-r
      from-blue-500
      to-cyan-500
      text-white
      flex
      items-center
      justify-center
      font-bold
    "
  >
    考
  </div>

  <div>

    <div className="font-bold text-xl">
      考公智学平台
    </div>

    <div className="text-xs text-gray-500">
      Kaogong Learning Platform
    </div>

  </div>

</div>

          <nav className="flex gap-8 font-medium">
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/"
>
  首页
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/study"
>
  学
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/practice"
>
  练
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/test"
>
  测
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/exam"
>
  考
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/analysis"
>
  评
</Link>
            <Link
  className="
    hover:text-blue-600
    transition
  "
  to="/position"
>
  岗
</Link>
          </nav>

          <div
            className="
              w-10
              h-10
              rounded-full
              bg-blue-500
              text-white
              flex
              items-center
              justify-center
              font-bold
            "
          >
            于
          </div>

        </div>
      </header>

      {/* 页面内容 */}
      <main
        className="
          max-w-7xl
          mx-auto
          p-6
        "
      >
        <Outlet />
      </main>

    </div>
  )
}

export default Layout