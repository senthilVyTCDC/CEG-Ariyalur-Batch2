import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axiosConfig'

function CartPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

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

  const handleRemove = async (cartItemId) => {
    try {
      await API.delete(`/cart/${user.id}/item/${cartItemId}`)
      setCartItems(prev => prev.filter(item => item.id !== cartItemId))
    } catch (err) {
      alert('Failed to remove item!')
    }
  }

  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity)
    }, 0).toFixed(2)
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
          🛒 Your Cart
        </h2>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-gray-400">Loading cart...</p>
          </div>

        ) : cartItems.length === 0 ? (
          <div className="text-center py-24 animate-fadeIn">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl font-semibold text-gray-600">Your cart is empty!</p>
            <p className="text-sm text-gray-400 mt-2 mb-6">Add some products first</p>
            <button
              onClick={() => navigate('/')}
              className="btn-shine bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-orange-200"
            >
              Shop Now 🛍️
            </button>
          </div>

        ) : (
          <div className="flex flex-col gap-4">

            {/* Cart Items */}
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 animate-fadeIn card-hover"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {item.product.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : '🛍️'}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">{item.product.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.product.category}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-orange-500 font-extrabold">
                      ₹{item.product.price}
                    </span>
                    <span className="text-gray-300">×</span>
                    <span className="bg-orange-50 text-orange-500 font-semibold px-3 py-0.5 rounded-lg text-sm">
                      {item.quantity}
                    </span>
                    <span className="text-gray-300">=</span>
                    <span className="font-bold text-gray-700">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="btn-shine bg-red-50 hover:bg-red-100 text-red-400 px-3 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0"
                >
                  🗑️ Remove
                </button>
              </div>
            ))}

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mt-2 animate-fadeIn">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Order Summary</h3>

              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Items ({cartItems.length})</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Delivery</span>
                <span className="text-green-500 font-semibold">FREE</span>
              </div>
              <hr className="my-3 border-gray-100" />
              <div className="flex justify-between font-extrabold text-gray-800 text-lg">
                <span>Total</span>
                <span className="text-orange-500">₹{getTotal()}</span>
              </div>

              <button
                onClick={() => navigate('/order')}
                className="btn-shine btn-press mt-5 w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 transition"
              >
                Proceed to Checkout →
              </button>
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

export default CartPage