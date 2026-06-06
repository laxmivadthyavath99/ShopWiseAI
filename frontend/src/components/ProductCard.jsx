function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">

        <h3 className="font-semibold text-lg">
          {product.name}
        </h3>

        <p className="text-pink-500 font-bold mt-2">
          ₹ {product.price}
        </p>

        <p className="text-gray-500 text-sm mt-1">
          {product.platform}
        </p>

        <button className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl">
          Compare
        </button>

      </div>

    </div>
  )
}

export default ProductCard