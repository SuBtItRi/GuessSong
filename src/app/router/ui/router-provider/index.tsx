import { BrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'

interface RouterProviderProps {
  children: ReactNode
}

/**
 * Провайдер роутера для оборачивания приложения
 */
export const RouterProvider = ({ children }: RouterProviderProps) => {
  return <BrowserRouter>{children}</BrowserRouter>
}