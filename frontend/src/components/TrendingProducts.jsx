import ProductCard from "./ProductCard"

function TrendingProducts() {

  const products = [
    {
      name: "iPhone 16",
      price: 79999,
      platform: "Amazon",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600"
    },
    {
      name: "Nike Air Max",
      price: 4999,
      platform: "Myntra",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
      name: "Maybelline Lipstick",
      price: 499,
      platform: "Nykaa",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
    },
    {
      name: "Basmati Rice",
      price: 899,
      platform: "JioMart",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
    }
  ]

  return (
    <section className="py-12 px-10">

      <h2 className="text-3xl font-bold mb-8">
        Trending Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {products.map((product,index)=>(
          <ProductCard
            key={index}
            product={product}
          />
        ))}

      </div>

    </section>
  )
}

export default TrendingProducts