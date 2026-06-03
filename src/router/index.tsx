import { createBrowserRouter } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../pages/Home'
import Study from '../pages/Study'
import Practice from '../pages/Practice'
import Test from '../pages/Test'
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
        path: 'practice',
        element: <Practice />,
      },
      {
        path: 'test',
        element: <Test />,
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