import { useState } from "react"

function LoginModal({ open, onClose }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

  const response = await fetch(
    `http://127.0.0.1:8000/login?username=${username}&password=${password}`,
    {
      method: "POST"
    }
  )

  const data = await response.json()

  if(data.message === "Login Successful"){

    localStorage.setItem(
      "user",
      JSON.stringify(data)
    )

    window.location.reload()
  }
  else{
    alert(data.message)
  }
}

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-8 rounded-2xl w-96">

        <h2 className="text-2xl font-bold mb-5">
          Login
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
          onClick={login}
          className="w-full bg-pink-500 text-white p-3 rounded"
        >
          Login
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

export default LoginModal