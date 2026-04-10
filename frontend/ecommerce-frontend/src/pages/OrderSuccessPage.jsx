import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function OrderSuccessPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 page-transition">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fadeIn">

        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">🎉</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Order Placed!
        </h1>
        <p className="text-gray-400 text-sm mb-8">
          Thank you for shopping at SmileMart 😊
          <br />
          Your order is being processed.
        </p>

        {/* Status Steps */}
        <div className="flex justify-between items-center mb-8 px-2">

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-lg font-bold">
              ✅
            </div>
            <p className="text-xs text-gray-400 font-medium">Ordered</p>
          </div>

          <div className="flex-1 h-1 bg-orange-100 mx-1 rounded"/>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-orange-100 text-orange-400 rounded-full flex items-center justify-center text-lg">
              📦
            </div>
            <p className="text-xs text-gray-400 font-medium">Packing</p>
          </div>

          <div className="flex-1 h-1 bg-gray-100 mx-1 rounded"/>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center text-lg">
              🚚
            </div>
            <p className="text-xs text-gray-400 font-medium">Shipped</p>
          </div>

          <div className="flex-1 h-1 bg-gray-100 mx-1 rounded"/>

          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 bg-gray-100 text-gray-300 rounded-full flex items-center justify-center text-lg">
              🏠
            </div>
            <p className="text-xs text-gray-400 font-medium">Delivered</p>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/')}
            className="btn-shine btn-press w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200"
          >
            Continue Shopping 🛍️
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="btn-shine w-full bg-orange-50 hover:bg-orange-100 text-orange-500 font-semibold py-3 rounded-xl transition"
          >
            View My Orders 📋
          </button>
        </div>

      </div>
    </div>
  )
}

export default OrderSuccessPage