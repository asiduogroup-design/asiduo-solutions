import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)
    setError("")

    try {

      const url = isRegister
        ? "http://localhost:5000/api/register"
        : "http://localhost:5000/api/login"

      const res = await axios.post(url, { email, password })

      localStorage.setItem("token", res.data.token)

      alert(isRegister ? "Registered successfully!" : "Login successful!")

      window.location.href = "/"

    } catch (err) {

      setError(err.response?.data?.error || "Server error")

    }

    setLoading(false)

  }

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 px-2">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md flex flex-col gap-6"
      >

        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center">

          {isRegister ? "Register" : "Login"}

        </h1>

        {error && <div className="text-red-600 text-center">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg"
        >

          {loading
            ? "Processing..."
            : isRegister
              ? "Register"
              : "Login"}

        </button>

        <p
          className="text-center cursor-pointer text-blue-600"
          onClick={() => setIsRegister(!isRegister)}
        >

          {isRegister
            ? "Already have an account? Login"
            : "New user? Register"}

        </p>

      </form>

    </div>

  )

}