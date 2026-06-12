import { useState } from 'react'
import { questions } from '../mock/questions'

function Practice() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = questions[currentIndex]

  const handleSubmit = () => {
    if (!selectedAnswer) {
      alert('请选择答案')
      return
    }

    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')
      setShowResult(false)
    } else {
      alert('已经是最后一题')
    }
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        题库中心
      </h1>

      <div className="bg-white p-8 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-6">
          第 {currentIndex + 1} 题
        </h2>

        <p className="mb-6">
          {currentQuestion.title}
        </p>

        <div className="space-y-4">

          {currentQuestion.options.map((option) => (

            <div
              key={option}
              onClick={() => setSelectedAnswer(option[0])}
              className={`
                p-4
                border
                rounded-lg
                cursor-pointer
                hover:bg-blue-50
                ${
                  selectedAnswer === option[0]
                    ? 'border-blue-500 bg-blue-50'
                    : ''
                }
              `}
            >
              {option}
            </div>

          ))}

        </div>

        <div className="mt-8 flex gap-4">

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          >
            提交答案
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-500 text-white rounded-lg"
          >
            下一题
          </button>

        </div>

        {showResult && (

          <div className="mt-8 p-6 bg-gray-100 rounded-xl">

            <p className="mb-3">
              你的答案：
              <span className="font-bold">
                {selectedAnswer}
              </span>
            </p>

            <p className="mb-3">
              正确答案：
              <span className="font-bold text-green-600">
                {currentQuestion.answer}
              </span>
            </p>

            <p>
              解析：
              {currentQuestion.analysis}
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default Practice