import { Button } from 'antd'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          考公学习平台
        </h1>

        <p className="text-gray-500 mb-6">
          React + Ant Design + Tailwind CSS
        </p>

        <Button type="primary" size="large">
          开始学习
        </Button>
      </div>
    </div>
  )
}

export default App