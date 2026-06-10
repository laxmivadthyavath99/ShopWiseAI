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
  const [comparisonProducts, setComparisonProducts] = useState([])
  const [history, setHistory] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  // ✅ Platform Filters
  const [selectedPlatforms, setSelectedPlatforms] = useState([
    "Amazon",
    "Flipkart",
    "Nykaa",
    "Myntra"
  ])

  // ✅ Sorting
  const [sortOrder, setSortOrder] = useState("default")

  // ✅ Load History function
  const loadHistory = async () => {
    if (!user) return
    const response = await fetch(
      `http://127.0.0.1:8000/history?username=${user.username}`
    )
    const data = await response.json()
    setHistory(data.history || [])
  }

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))
    if (savedUser) {
      setUser(savedUser)
      loadHistory()
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
      Number(product.price) < Number(min.price) ? product : min
    )
  }

  // ✅ Filter + Sort Logic
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

  // ✅ Stats Bar Calculations
  const prices = sortedProducts.map(product => Number(product.price))
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0
  const highestPrice = prices.length > 0 ? Math.max(...prices) : 0
  const averagePrice =
    prices.length > 0
      ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)
      : 0

const compareProduct = (product) => {

  const matches = products.filter(item => {

    const words =
      product.name
        .toLowerCase()
        .split(" ")

    return words.some(word =>
      item.name
        .toLowerCase()
        .includes(word)
    )

  })

  setComparisonProducts(matches)

}
  const addRecentlyViewed = (product) => {

  const filtered = recentlyViewed.filter(
    item => item.name !== product.name
  )

  setRecentlyViewed(
    [product, ...filtered].slice(0, 5)
  )
}

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        user={user}
        setUser={setUser}
        wishlist={wishlist}
        showWishlist={showWishlist}
        setShowWishlist={setShowWishlist}
        loadWishlist={loadWishlist}
      />

      <Hero />
      <SearchSection
        setProducts={setProducts}
        user={user}
        loadHistory={loadHistory}
      />
      {history.length > 0 && (

  <div className="max-w-6xl mx-auto px-8 mt-4 mb-6">

    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="text-lg font-bold mb-3">
        Recent Searches
      </h2>

      <div className="flex gap-2 flex-wrap">

        {history
          .slice()
          .reverse()
          .map((item, index) => (

          <button
  key={index}
  onClick={async () => {

    const response = await fetch(
      `http://127.0.0.1:8000/search?keyword=${item.keyword}`
    )

    const data = await response.json()

    setProducts(data.products)

  }}
  className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full hover:bg-pink-200 transition cursor-pointer"
>
  {item.keyword}
</button>

        ))}

      </div>

    </div>

  </div>

)}
{recentlyViewed.length > 0 && (

<div className="max-w-6xl mx-auto px-8 mb-6">

  <div className="bg-white p-4 rounded-xl shadow">

    <h2 className="text-lg font-bold mb-3">
      Recently Viewed
    </h2>

    <div className="flex gap-4 overflow-x-auto">

      {recentlyViewed.map((product,index)=>(

      <div
        key={index}
        className="min-w-[220px] bg-gray-50 p-3 rounded-xl"
      >

        <img
          src={product.image}
          alt={product.name}
          className="h-20 mx-auto object-contain"
        />

        <p className="font-semibold text-sm mt-2 line-clamp-2">
          {product.name}
        </p>

        <p className="text-pink-500 font-bold">
          ₹ {product.price}
        </p>

        <p className="text-gray-500 text-sm">
          {product.platform}
        </p>

      </div>

      ))}

    </div>

  </div>

</div>

)}
      {/* Wishlist Section */}
      {showWishlist && (
        <div className="max-w-6xl mx-auto p-8">
          <h2 className="text-3xl font-bold mb-6">Wishlist</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {wishlist.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-pink-500 font-bold mt-2">₹ {item.price}</p>
                <button
                  onClick={async () => {
                    const response = await fetch(
                      `http://127.0.0.1:8000/wishlist/delete?username=${user?.username}&name=${item.name}`,
                      { method: "DELETE" }
                    )
                    const data = await response.json()
                    alert(data.message)
                    loadWishlist()
                  }}
                  className="mt-4 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-full font-semibold hover:from-red-600 hover:to-pink-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  🗑 Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-6">Search Results</h2>

        {/* Platform Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {["Amazon", "Flipkart", "Nykaa", "Myntra"].map((platform) => (
            <label key={platform} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform)}
                onChange={() => {
                  if (selectedPlatforms.includes(platform)) {
                    setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
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

        {/* Product Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {sortedProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {product.price == getCheapestProduct()?.price && (
                <div className="bg-green-500 text-white px-2 py-1 rounded mb-2 inline-block">
                  🏆 Best Deal
                </div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-contain mb-4 cursor-pointer"
                onClick={() => {

  setSelectedProduct(product)

  addRecentlyViewed(product)

}}
              />

              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-pink-500 font-bold mt-2">₹ {product.price}</p>
                            <p className="text-gray-500 mt-2">Platform: {product.platform}</p>

              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2 hover:text-blue-700"
              >
                View Product
              </a>

              <div className="flex gap-3 mt-4">
                {/* Details button */}
                <button
  onClick={() => {

    setSelectedProduct(product)

    addRecentlyViewed(product)

  }}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
>
  Details
</button>

                {/* Compare button */}
                <button
                  onClick={() => compareProduct(product)}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-600"
                >
                  Compare
                </button>

                {/* Wishlist button */}
                <button
                  onClick={async () => {
                    if (!user) {
                      alert("Please Login First")
                      return
                    }
                    const response = await fetch(
                      `http://127.0.0.1:8000/wishlist/add?username=${user.username}&name=${product.name}&price=${product.price}`,
                      { method: "POST" }
                    )
                    const data = await response.json()
                    alert(data.message)
                    loadWishlist()
                  }}
                  className="border px-4 py-2 rounded-lg cursor-pointer hover:bg-pink-100"
                >
                  ❤️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto p-4">
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

      {/* Comparison Modal */}
      {comparisonProducts.length > 0 && (

<div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 overflow-y-auto p-4">

  <div className="bg-white p-6 rounded-2xl w-[700px] max-h-[90vh] overflow-y-auto">

    <button
      onClick={() => setComparisonProducts([])}
      className="sticky top-0 float-right text-xl bg-white px-2 rounded cursor-pointer"
    >
      ✖
    </button>

    <h2 className="text-2xl font-bold mb-4">
      Product Comparison
    </h2>
            {comparisonProducts.length > 0 && (

<p className="mb-4 text-green-600 font-bold">

🏆 Best Deal:

{
  comparisonProducts
    .sort(
      (a,b)=>
      Number(a.price)-Number(b.price)
    )[0]
    .platform
}

</p>

)}

            {comparisonProducts
              .sort((a, b) => Number(a.price) - Number(b.price))
              .map((item, index) => (
                <div
                  key={index}
                  className={`p-4 mb-3 rounded-xl ${
                    index === 0
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="font-bold">{item.platform}</p>
                  <p>{item.name}</p>
                  <p className="text-pink-500 font-bold">₹ {item.price}</p>
                  {index === 0 && <span>🏆 Best Deal</span>}
                  <p className="mb-4">

You Save ₹ {

  Number(
    comparisonProducts
      .sort(
        (a,b)=>
        Number(b.price)-Number(a.price)
      )[0]
      ?.price || 0
  )

  -

  Number(
    comparisonProducts
      .sort(
        (a,b)=>
        Number(a.price)-Number(b.price)
      )[0]
      ?.price || 0
  )

}

</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Categories, Platforms, Trending moved below results */}
      <Categories />
      <Platforms />
      <TrendingProducts />

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  )
}

export default App
