import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function PriceChart({ products }) {

  const platforms = ["Amazon", "Flipkart", "Nykaa", "Myntra"]

  const averages = platforms.map(platform => {

    const items = products.filter(
      p => p.platform === platform
    )

    if(items.length === 0) return 0

    const total = items.reduce(
      (sum,p) => sum + Number(p.price),
      0
    )

    return Math.round(total / items.length)

  })

  const data = {
    labels: platforms,
    datasets: [
      {
        label: "Average Price",
        data: averages
      }
    ]
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Price Analytics
      </h2>

      <Bar data={data} />

    </div>
  )
}

export default PriceChart