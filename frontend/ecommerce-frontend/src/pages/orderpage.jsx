import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axiosConfig'

function OrderPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchCart()
  }, [user])

  const fetchCart = async () => {
    try {
      const res = await API.get(`/cart/${user.id}`)
      if (res.data.success) {
        setCartItems(res.data.data)
      }
    } catch (err) {
      console.error('Cart fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0).toFixed(2)
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      setError('Shipping address is required!')
      return
    }
    setPlacing(true)
    setError('')
    try {
      const res = await API.post(`/orders/${user.id}`, {
        shippingAddress: address
      })
      if (res.data.success) {
        navigate('/order-success')
      } else {
        setError(res.data.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Order failed! Try again.')
    } finally {
      setPlacing(false)
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
          onClick={() => navigate('/cart')}
          className="btn-shine bg-orange-50 hover:bg-orange-100 text-orange-500 text-sm px-4 py-2 rounded-xl font-semibold transition"
        >
          ← Back to Cart
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 animate-fadeIn">
          📦 Checkout
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-gray-400">Loading...</p>
          </div>

        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left — Shipping Address */}
            <div className="flex flex-col gap-6">

              {/* Address Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  📍 Shipping Address
                </h3>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Full Address
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full shipping address..."
                  rows={4}
                  className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                />

                {error && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 animate-fadeIn">
                    <p className="text-red-500 text-sm">⚠️ {error}</p>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  👤 Customer Details
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name</span>
                    <span className="font-semibold text-gray-700">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="font-semibold text-gray-700">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="flex flex-col gap-6">

              {/* Items */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fadeIn">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  🛍️ Order Items
                </h3>
                <div className="flex flex-col gap-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="bg-orange-50 w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : '🛍️'}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-700 line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-orange-500">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 animate-fadeIn">
                <h3 className="font-bold text-gray-800 text-lg mb-4">
                  💰 Price Summary
                </h3>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{getTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className="text-green-500 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                  <hr className="my-2 border-gray-100" />
                  <div className="flex justify-between font-extrabold text-gray-800 text-lg">
                    <span>Total</span>
                    <span className="text-orange-500">₹{getTotal()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing || cartItems.length === 0}
                  className="btn-shine btn-press mt-5 w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 disabled:opacity-50 transition"
                >
                  {placing ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Placing Order...
                    </span>
                  ) : 'Place Order 🎉'}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 text-center py-6 mt-10">
        <p className="text-gray-400 text-sm">
          © 2025 <span className="text-orange-500 font-semibold">SmileMart</span> — Made with 😊
        </p>
      </footer>

    </div>
  )
}

export default OrderPage