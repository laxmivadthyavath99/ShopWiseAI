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
)}

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
        <h2 className="text-3xl font-bold mb-6">Search Results</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
  key={index}
  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
>

  {product.price == getCheapestProduct()?.price && (
    <div className="bg-green-500 text-white px-2 py-1 rounded mb-2 inline-block">
      🏆 Best Deal
    </div>
  )}

  <img
    src={product.image}
    alt={product.name}
    className="h-48 w-full object-contain mb-4"
  />

  <h3 className="text-xl font-semibold">
    {product.name}
  </h3>
              <p className="text-pink-500 font-bold mt-2">₹ {product.price}</p>

              <a
  href={product.link}
  target="_blank"
  rel="noreferrer"
  className="text-blue-500 underline block mt-2"
>
  View Product
</a>

<p className="text-gray-500 mt-2">
  Platform: {product.platform}
</p>

              <div className="flex gap-3 mt-4">
                <button
  onClick={() => {
    setSelectedProduct(product)
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    })
  }}
  className="bg-pink-500 text-white px-4 py-2 rounded-lg"
>
  Compare
</button>

                <button
                  onClick={async () => {
                    const response = await fetch(
                      `http://127.0.0.1:8000/wishlist/add?username=${user?.username}&name=${product.name}&price=${product.price}`,
                      {
                        method: "POST",
                      }
                    )
                    const data = await response.json()
                    alert(data.message)
                  }}
                  className="border px-4 py-2 rounded-lg"
                >
                  ♡
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
  <div className="max-w-4xl mx-auto p-8">
    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
      <h2 className="text-3xl font-bold mb-4">Product Comparison</h2>

      <h3 className="text-2xl font-semibold">{selectedProduct.name}</h3>

      <p className="text-pink-500 text-xl font-bold mt-3">
        ₹ {selectedProduct.price}
      </p>

      <a
        href={selectedProduct.link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline block mt-2"
      >
        View Product
      </a>

      <p className="text-gray-500 mt-2">
        Platform: {selectedProduct.platform}
      </p>

            <div className="mt-6 p-4 bg-green-100 rounded-xl">
  <h4 className="font-bold text-green-700">
    Best Deal Found
  </h4>

  <p>
    Cheapest Price: ₹ {getCheapestProduct()?.price}
  </p>

  <p>
    Best Platform: {getCheapestProduct()?.platform}
  </p>
</div>
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

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  )
}

export default App
