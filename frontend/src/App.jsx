import RegisterModal from "./components/RegisterModal"
import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import SearchSection from "./components/SearchSection"
import Categories from "./components/Categories"
import Platforms from "./components/Platforms"
import TrendingProducts from "./components/TrendingProducts"
import LoginModal from "./components/LoginModal"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showWishlist, setShowWishlist] = useState(false)

  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "Amazon",
    "Flipkart",
    "Nykaa",
    "Myntra"
  ])

  const [sortOrder, setSortOrder] = useState("default")

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const loadWishlist = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/wishlist?username=${user?.username}`
    )
    const data = await response.json()
    setWishlist(data.wishlist || [])
  }

  const getCheapestProduct = () => {
    if (products.length === 0) return null
    return products.reduce((min, product) =>
      Number(product.price) < Number(min.price)
        ? product
        : min
    )
  }

  const filteredProducts = products.filter(product =>
    selectedPlatforms.includes(product.platform)
  )

  const sortedProducts = [...filteredProducts]

  if (sortOrder === "low") {
    sortedProducts.sort((a, b) => Number(a.price) - Number(b.price))
  }

  if (sortOrder === "high") {
    sortedProducts.sort((a, b) => Number(b.price) - Number(a.price))
  }

  const prices = sortedProducts.map(product => Number(product.price))
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0
  const highestPrice = prices.length > 0 ? Math.max(...prices) : 0
  const averagePrice =
    prices.length > 0
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        user={user}
        setUser={setUser}
      />

      <Hero />
      <SearchSection setProducts={setProducts} />
      <Categories />
      <Platforms />
      <TrendingProducts />

      <div className="max-w-6xl mx-auto p-8">
        {/* Platform Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {["Amazon", "Flipkart", "Nykaa", "Myntra"].map((platform) => (
            <label key={platform} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={() => {
                  if (selectedPlatforms.includes(platform)) {
                    setSelectedPlatforms(
                      selectedPlatforms.filter(p => p !== platform)
                    )
                  } else {
                    setSelectedPlatforms([...selectedPlatforms, platform])
                  }
                }}
              />
              {platform}
            </label>
          ))}
        </div>

        {/* Sorting Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setSortOrder("default")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Default
          </button>
          <button
            onClick={() => setSortOrder("low")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Lowest Price
          </button>
          <button
            onClick={() => setSortOrder("high")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Highest Price
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Products Found</h3>
            <p className="text-2xl font-bold">{sortedProducts.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Lowest Price</h3>
            <p className="text-2xl font-bold text-green-600">₹ {lowestPrice}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Highest Price</h3>
            <p className="text-2xl font-bold text-red-600">₹ {highestPrice}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-gray-500">Average Price</h3>
            <p className="text-2xl font-bold text-blue-600">₹ {averagePrice}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-6">Search Results</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {sortedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              {product.price == getCheapestProduct()?.price && (
                <div className="bg-green-500 text-white px-2 py-1 rounded mb-2 inline-block">
                  🏆 Best Deal
                </div>
              )}

              {/* ✅ Image Click opens Modal */}
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-contain mb-4 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              />

              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-pink-500 font-bold mt-2">₹ {product.price}</p>
              <p className="text-gray-500 mt-2">Platform: {product.platform}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[500px] relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-4 text-2xl"
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-64 w-full object-contain"
            />

            <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-pink-500 text-xl font-bold mt-2">
              ₹ {selectedProduct.price}
            </p>
            <p className="text-gray-500 mt-2">
              Platform: {selectedProduct.platform}
            </p>

            <a
              href={selectedProduct.link}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded text-center"
            >
              View Product
            </a>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-8">
        <button
          onClick={() => {
            loadWishlist()
            setShowWishlist(!showWishlist)
          }}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg"
        >
          {showWishlist ? "Hide Wishlist" : "Wishlist"}
        </button>
      </div>

      {showWishlist && (
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-3xl font-bold mb-6">Wishlist</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-pink-500 font-bold mt-2">₹ {item.price}</p>
                <button
                  onClick={async () => {
                    const response = await fetch(
                                        `http://127.0.0.1:8000/wishlist/delete?username=${user?.username}&name=${item.name}`,
                      {
                        method: "DELETE",
                      }
                    )
                    const data = await response.json()
                    alert(data.message)
                    loadWishlist()
                  }}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[500px] relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-4 text-2xl"
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="h-64 w-full object-contain"
            />

            <h2 className="text-2xl font-bold mt-4">{selectedProduct.name}</h2>
            <p className="text-pink-500 text-xl font-bold mt-2">
              ₹ {selectedProduct.price}
            </p>
            <p className="text-gray-500 mt-2">
              Platform: {selectedProduct.platform}
            </p>

            <a
              href={selectedProduct.link}
              target="_blank"
              rel="noreferrer"
              className="block mt-4 bg-blue-500 text-white px-4 py-2 rounded text-center"
            >
              View Product
            </a>
          </div>
        </div>
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  )
}

export default App
