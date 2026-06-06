function Categories() {

  const categories = [
    "📱 Electronics",
    "👕 Fashion",
    "💄 Beauty",
    "🛒 Grocery"
  ]

  return (
    <section className="p-10">

      <h2 className="text-3xl font-bold mb-8">
        Categories
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {categories.map((item,index)=>(
          <div
            key={index}
            className="bg-white shadow p-8 rounded-xl text-center text-xl hover:scale-105 transition"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  )
}

export default Categories