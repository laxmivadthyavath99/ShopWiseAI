import { useState } from "react"
import { FaSearch } from "react-icons/fa"

function SearchSection({ setProducts }) {

  const [keyword, setKeyword] = useState("")

  const searchProducts = async () => {

  const response = await fetch(
    `http://127.0.0.1:8000/search?keyword=${keyword}`
  )

  const data = await response.json()

  setProducts(data.products)
}


  return (
    <section className="py-16">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-4 flex">

          <input
            type="text"
            placeholder="Search products across Amazon, Flipkart, Myntra..."
            className="flex-1 outline-none text-lg px-4"
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
          />

          <button
            onClick={searchProducts}
            className="bg-pink-500 text-white px-8 py-3 rounded-xl"
          >
            <FaSearch />
          </button>

        </div>

      </div>

    </section>
  )
}

export default SearchSection