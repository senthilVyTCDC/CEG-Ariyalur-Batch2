import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axiosConfig'

function HomePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    API.get('/products')
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (user) {
      API.get(`/cart/${user.id}`)
        .then(res => {
          if (res.data.success) {
            setCartCount(res.data.data.length)
          }
        })
        .catch(() => {})
    }
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      await API.post(`/cart/${user.id}`, {
        productId: product.id,
        quantity: 1
      })
      setCartCount(prev => prev + 1)
      alert(`✅ ${product.name} added to cart!`)
    } catch (err) {
      alert('Failed to add to cart!')
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

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* Cart button */}
              <button
                onClick={() => navigate('/cart')}
                className="relative btn-shine bg-orange-50 hover:bg-orange-100 text-orange-500 px-4 py-2 rounded-xl text-sm font-semibold transition"
              >
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-fadeIn">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User greeting */}
              <div className="hidden sm:flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-xl">
                <span className="text-lg">👋</span>
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="btn-shine bg-red-50 hover:bg-red-100 text-red-400 text-sm px-4 py-2 rounded-xl transition font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="btn-shine bg-gradient-to-r from-orange-500 to-orange-400 text-white text-sm px-5 py-2 rounded-xl shadow-md shadow-orange-200 font-semibold"
            >
              Login 🚀
            </button>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-white py-14 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-center select-none">
          🛍️
        </div>
        <div className="relative animate-fadeIn">
          <h2 className="text-4xl font-extrabold mb-3 drop-shadow">
            🛍️ Shop Smart, Smile More!
          </h2>
          <p className="text-orange-100 text-base mb-6">
            Best deals on all your favourite products
          </p>
          {!user && (
            <button
              onClick={() => navigate('/register')}
              className="btn-shine bg-white text-orange-500 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              Join SmileMart Free →
            </button>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800">
             All Products
          </h2>
          <span className="text-sm text-gray-400">
            {products.length} products found
          </span>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <p className="text-gray-400 font-medium">Loading products...</p>
          </div>

        ) : products.length === 0 ? (
          <div className="text-center py-24 text-gray-400 animate-fadeIn">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl font-semibold">No products found</p>
            <p className="text-sm mt-2">if backend is connected then products will be displayed here</p>
          </div>

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, index) => (
              <div
                key={p.id}
                className="card-hover bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Product Image */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 h-44 flex items-center justify-center text-6xl">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : '🛍️'}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-xs font-semibold text-orange-400 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-gray-800 text-sm leading-snug">
                    {p.name}
                  </h3>
                  {p.description && (
                    <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                  )}

                  <div className="flex items-center justify-between mt-1">
                    <p className="text-orange-500 font-extrabold text-lg">
                      ₹{p.price}
                    </p>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.stock > 0 ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                      {p.stock > 0 ? `✅ ${p.stock} left` : '❌ Out of stock'}
                    </span>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => handleAddToCart(p)}
                    disabled={p.stock === 0}
                    className="btn-shine btn-press mt-auto w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white text-sm py-2.5 rounded-xl font-semibold shadow-md shadow-orange-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    {p.stock === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
                  </button>
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

export default HomePage