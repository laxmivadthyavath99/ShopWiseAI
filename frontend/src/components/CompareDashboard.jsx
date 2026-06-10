function CompareDashboard({
  products
}) {

  const bestDeal =
    [...products].sort(
      (a,b)=>
      Number(a.price)-
      Number(b.price)
    )[0]

  return (

    <div className="bg-white p-6 rounded-xl shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Product Comparison Dashboard
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="p-4 bg-green-100 rounded-xl">
          <h3>Best Deal</h3>
          <p>
            {bestDeal?.platform}
          </p>
        </div>

        <div className="p-4 bg-blue-100 rounded-xl">
          <h3>Lowest Price</h3>
          <p>
            ₹ {bestDeal?.price}
          </p>
        </div>

        <div className="p-4 bg-pink-100 rounded-xl">
          <h3>Total Products</h3>
          <p>
            {products.length}
          </p>
        </div>

        <div className="p-4 bg-purple-100 rounded-xl">
          <h3>Platforms</h3>
          <p>
            4
          </p>
        </div>

      </div>

    </div>

  )
}

export default CompareDashboard