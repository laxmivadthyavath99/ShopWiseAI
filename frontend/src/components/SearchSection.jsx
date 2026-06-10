import { useState } from "react"
import { FaSearch } from "react-icons/fa"

function SearchSection({
  setProducts,
  user,
  loadHistory
}){
  

  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)

  const searchProducts = async () => {

    if (!keyword.trim()) return

    setLoading(true)

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/search?keyword=${keyword}`
      )

      const data = await response.json()

      setProducts(data.products)
      if(user){

  await fetch(
    `http://127.0.0.1:8000/history/add?username=${user.username}&keyword=${keyword}`,
    {
      method:"POST"
    }
  )

  loadHistory()
}

    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  return (
    <section className="py-16">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-xl p-4 flex border-2 border-transparent hover:border-pink-300 transition-all duration-300">

          <input
            type="text"
            placeholder="Search products across Amazon, Flipkart, Myntra, Nykaa..."
            className="flex-1 outline-none text-lg px-4 cursor-text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchProducts()
              }
            }}
          />

          <button
            onClick={searchProducts}
            className="bg-pink-500 text-white px-8 py-3 rounded-xl cursor-pointer hover:bg-pink-600 transition"
          >
            {loading ? "..." : <FaSearch />}
          </button>

        </div>

      </div>

    </section>
  )
}

export default SearchSection