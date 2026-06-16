import { useState } from 'react'
import { examQuestions } from '../mock/examQuestions'

function Exam() {

  const [started, setStarted] = useState(false)

  const [finished, setFinished] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(0)

  const [score, setScore] = useState(0)

  const [selectedAnswer, setSelectedAnswer] =
    useState('')

  const currentQuestion =
    examQuestions[currentIndex]

  const handleNext = () => {

    if (
      selectedAnswer ===
      currentQuestion.answer
    ) {
      setScore(score + 1)
    }

    if (
      currentIndex <
      examQuestions.length - 1
    ) {

      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer('')

    } else {

      setFinished(true)

    }
  }

  if (!started) {

    return (

      <div>

        <h1 className="text-3xl font-bold mb-8">
          公务员模拟考试
        </h1>

        <div className="bg-white p-8 rounded-xl shadow">

          <p className="mb-4">
            总题数：
            {examQuestions.length}
          </p>

          <p className="mb-6">
            考试时间：120分钟
          </p>

          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            开始考试
          </button>

        </div>

      </div>

    )
  }

  if (finished) {

    const accuracy = Math.round(
      (score / examQuestions.length) * 100
    )

    return (

      <div>

        <h1 className="text-3xl font-bold mb-8">
          考试结束
        </h1>

        <div className="bg-white p-8 rounded-xl shadow">

          <p className="text-2xl mb-4">
            得分：
            {score}
          </p>

          <p className="text-2xl mb-6">
            正确率：
            {accuracy}%
          </p>

          <button
            onClick={() =>
              window.location.reload()
            }
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            重新考试
          </button>

        </div>

      </div>

    )
  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-8">
        模拟考试
      </h1>

      <div className="bg-white p-8 rounded-xl shadow">

        <h2 className="text-xl font-bold mb-6">
          第 {currentIndex + 1} 题
        </h2>

        <p className="mb-6">
          {currentQuestion.title}
        </p>

        <div className="space-y-4">

          {currentQuestion.options.map(
            (option) => (

              <div
                key={option}
                onClick={() =>
                  setSelectedAnswer(
                    option[0]
                  )
                }
                className={`
                  p-4
                  border
                  rounded-lg
                  cursor-pointer
                  ${
                    selectedAnswer ===
                    option[0]
                      ? 'bg-blue-50 border-blue-500'
                      : ''
                  }
                `}
              >
                {option}
              </div>

            )
          )}

        </div>

        <button
          onClick={handleNext}
          className="mt-8 px-6 py-2 bg-green-500 text-white rounded-lg"
        >
          {
            currentIndex ===
            examQuestions.length - 1
              ? '交卷'
              : '下一题'
          }
        </button>

      </div>

    </div>

  )
}

export default Exam