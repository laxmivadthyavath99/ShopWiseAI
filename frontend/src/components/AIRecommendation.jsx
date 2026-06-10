function AIRecommendation({ products }) {

  if (!products || products.length === 0)
    return null

  const validProducts = products.filter(
    p => !isNaN(Number(p.price))
  )

  if (validProducts.length === 0)
    return null

  const sorted = [...validProducts].sort(
    (a, b) =>
      Number(a.price) - Number(b.price)
  )

  const best = sorted[0]

  const worst = sorted[sorted.length - 1]

  const savings =
    Number(worst.price) -
    Number(best.price)

  const score = Math.max(
    60,
    100 -
      (
        Number(best.price) /
        Number(worst.price)
      ) * 20
  )

  return (

    <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">
        🤖 ShopWiseAI Recommendation
      </h2>

      <div className="space-y-2">

        <p>
          <strong>Recommended Platform:</strong>
          {" "}
          {best.platform}
        </p>

        <p>
          <strong>Product Price:</strong>
          {" "}
          ₹{best.price}
        </p>

        <p>
          <strong>You Save:</strong>
          {" "}
          ₹{savings}
        </p>

        <p>
          <strong>Recommendation Score:</strong>
          {" "}
          {Math.round(score)}/100
        </p>

      </div>

      <div className="mt-4 bg-white p-4 rounded-lg">

        <p className="text-gray-700">

          This product is recommended because it
          currently has the lowest price among
          all available platforms and provides
          the best value for money.

        </p>

      </div>

    </div>

  )
}

export default AIRecommendation