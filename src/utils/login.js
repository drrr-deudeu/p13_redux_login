import axios from "axios"
export const login = (credentials) => {
  let error = false
  let errMsg
  let token = null
  console.log("LOGIN Function")
  console.log(credentials)
  const req = axios.create({
    baseURL: "http://localhost:3001/api/v1/user",
    timeout: 2000,
  })
  req.defaults.headers.common["accept"] = `application/json`
  req.defaults.headers.common["Content-Type"] = `application/json`
  req
    .post("login", credentials)
    .then((res) => {
      token = res.data.body.token
      console.log(token)
    })
    .catch((err) => {
      errMsg = "pas glop"
      error = true
      throw errMsg
    })
    .finally(() => {})
  return [error, errMsg, token]
}
