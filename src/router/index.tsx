import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../pages/Home'
import Study from '../pages/Study'
import CourseDetail from '../pages/CourseDetail'
import VideoPlayer from '../components/VideoPlayer'
import Practice from '../pages/Practice'
import Assessment from '../pages/Assessment'
import Exam from '../pages/Exam'
import Analysis from '../pages/Analysis'
import Position from '../pages/Position'
import Profile from '../pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'study',
        element: <Study />,
      },
      {
        path: 'study/:courseId',
        element: <CourseDetail />,
      },
      {
        path: 'study/:courseId/lesson/:lessonId',
        element: <VideoPlayer />,
      },
      {
        path: 'practice',
        element: <Practice />,
      },
      {
        path: 'test',
        element: <Assessment />,
      },
      {
        path: 'exam',
        element: <Exam />,
      },
      {
        path: 'analysis',
        element: <Analysis />,
      },
      {
        path: 'position',
        element: <Position />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
])

export default router