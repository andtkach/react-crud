import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'
import ItemsList from './components/ItemsList.tsx'
import ItemDetail from './components/ItemDetail.tsx'
import { MessageProvider } from './context/MessageContext.tsx'
import ItemForm from './components/ItemForm.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to='/dashboard' /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/items', element: <ItemsList /> },
      { path: '/items/:id', element: <ItemDetail /> },
      { path: '/items/create', element: <ItemForm /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MessageProvider>
      <RouterProvider router={router} />
    </MessageProvider>
  </React.StrictMode>,
)
