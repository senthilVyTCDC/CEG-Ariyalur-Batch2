import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/cartpage'
import OrderPage from './pages/orderpage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import MyOrdersPage from './pages/OrdersPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/register"      element={<RegisterPage />} />
          <Route path="/cart"          element={<CartPage />} />
          <Route path="/order"         element={<OrderPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders"        element={<MyOrdersPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App