import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axiosConfig'

function MyOrdersPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const res = await API.get(`/orders/${user.id}/history`)
      if (res.data.success) {
        setOrders(res.data.data)
      }
    } catch (err) {
      console.error('Orders fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':     return 'bg-yellow-50 text-yellow-500'
      case 'PROCESSING':  return 'bg-blue-50 text-blue-500'
      case 'SHIPPED':     return 'bg-purple-50 text-purple-500'
      case 'DELIVERED':   return 'bg-green-50 text-green-500'
      case 'CANCELLED':   return 'bg-red-50 text-red-400'
      default:            return 'bg-gray-50 text-gray-400'
    }
  }

  const getStatusEmoji = (status) => {
    switch (status) {
      case 'PENDING':     return '⏳'
      case 'PROCESSING':  return '⚙️'
      case 'SHIPPED':     return '🚚'
      case 'DELIVERED':   return '✅'
      case 'CANCELLED':   return '❌'
      default:            return '📦'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 page-transition">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-orange-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">😊</span>
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
            SmileMart
          </h1>
        </div>
        <button
          onClick={() => navigate('/')}
          className="btn-shine bg-orange-50 hover:bg-orange-100 text-orange-500 text-sm px-4 py-2 rounded-xl font-semibold transition"
        >
          ← Back to Shop
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 animate-fadeIn">
          📋 My Orders
        </h2>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-gray-400">Loading orders...</p>
          </div>

        ) : orders.length === 0 ? (
          <div className="text-center py-24 animate-fadeIn">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl font-semibold text-gray-600">No orders yet!</p>
            <p className="text-sm text-gray-400 mt-2 mb-6">
              Start shopping and your orders will appear here
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-shine bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-orange-200"
            >
              Shop Now 🛍️
            </button>
          </div>

        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-bold text-gray-800">
                      Order #{order.id}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {new Date(order.orderedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusEmoji(order.status)} {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="flex flex-col gap-2 mb-4">
                  {order.orderItems?.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {item.product?.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : '🛍️'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700">
                          {item.product?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          Qty: {item.quantity} × ₹{item.unitPrice}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-orange-500">
                        ₹{(item.unitPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Shipping to:</p>
                    <p className="text-sm text-gray-600 font-medium">
                      {order.shippingAddress}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-lg font-extrabold text-orange-500">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-center py-6 mt-10">
        <p className="text-gray-400 text-sm">
          © 2026 <span className="text-orange-500 font-semibold">SmileMart</span> — Made with 😊
        </p>
      </footer>

    </div>
  )
}

export default MyOrdersPage