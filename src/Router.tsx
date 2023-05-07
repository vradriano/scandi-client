import ProductLists from './pages/ProductLists'
import ProductPage from './pages/ProductPage'
import { Route, Routes } from 'react-router-dom'

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<ProductLists />} />
      <Route path='/add-product' element={<ProductPage />} />
    </Routes>
  )
}