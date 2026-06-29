import { useState } from "react"
import API from "../api"
function RegisterModal({ open, onClose }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const register = async () => {

    const response = await fetch(
      `${API}/register?username=${username}&password=${password}`,
      {
        method: "POST"
      }
    )

    const data = await response.json()

    alert(data.message)

    if(data.message === "User Registered"){
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-2xl w-96">

        <h2 className="text-2xl font-bold mb-5">
          Register
        </h2>

        <input
          className="border w-full p-3 mb-3 rounded"
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-3 mb-4 rounded"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-pink-500 text-white p-3 rounded"
        >
          Register
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 border p-3 rounded"
        >
          Close
        </button>

      </div>

    </div>
  )
}

export default RegisterModal