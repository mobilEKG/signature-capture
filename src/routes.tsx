import { createBrowserRouter, createMemoryRouter } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Capture from './pages/Capture.tsx'
import About from './pages/About.tsx'
import Privacy from './pages/Privacy.tsx'
import FAQ from './pages/FAQ.tsx'
import Instructions from './pages/Instructions.tsx'
import NotFound from './pages/NotFound.tsx'

export const routeDefinitions = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Capture /> },
      { path: '/about', element: <About /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/instructions', element: <Instructions /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router =
  typeof document === 'undefined'
    ? createMemoryRouter(routeDefinitions)
    : createBrowserRouter(routeDefinitions)
