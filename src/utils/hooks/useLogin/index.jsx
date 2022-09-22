import { useState, useEffect } from "react"
import axios from "axios"
export default function useLogin(credentials) {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [token, setToken] = useState("")
  const req = axios.create({
    baseURL: "http://localhost:3001/api/v1/user",
    timeout: 2000,
  })
  req.defaults.headers.common["accept"] = `application/json`
  req.defaults.headers.common["Content-Type"] = `application/json`

  useEffect(() => {
    if (isLoading) return
    setLoading(true)
    req
      .post("login", credentials)
      .then((res) => {
        setToken(res.data.body.token)
        console.log(token)
      })
      .catch((err) => {
        setErrMsg(err.message)
        setError(true)
      })
    setLoading(false)
  }, [isLoading, error, credentials, req, token])

  return [isLoading, error, errMsg, token]
}
