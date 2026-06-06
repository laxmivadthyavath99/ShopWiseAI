function Platforms() {

  const platforms = [
    "Amazon",
    "Flipkart",
    "Myntra",
    "Ajio",
    "Nykaa",
    "Purplle"
  ]

  return (
    <section className="py-10">

      <h2 className="text-3xl font-bold text-center mb-8">
        Supported Platforms
      </h2>

      <div className="flex flex-wrap justify-center gap-4">

        {platforms.map((item,index)=>(
          <div
            key={index}
            className="bg-white px-6 py-3 rounded-full shadow"
          >
            {item}
          </div>
        ))}

      </div>

    </section>
  )
}

export default Platforms