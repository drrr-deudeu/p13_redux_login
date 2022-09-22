import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login, selectIsLogged } from "../../features/user/userSlice"
import axios from "axios"
function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [tokenret, setToken] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  //const [isLogged, setIsLogged] = useState(false)
  const [logFailed, setLogFailed] = useState(false)
  const reduxIsLogged = useSelector(selectIsLogged)
  const dispatch = useDispatch()
  function submitHandler(e) {
    e.preventDefault()
    setIsSubmit(true)
  }

  //   useEffect(() => {
  //     if (isSubmit) {
  //       try {
  //         const [error, errMsg, token] = login(credentials)
  //         if (token) {
  //           setToken(token)
  //           setIsLogged(true)
  //           setIsSubmit(false)
  //         }
  //       } catch (err) {
  //         setIsSubmit(false)
  //       } finally {
  //       }
  //     }
  //   }, [isSubmit, credentials, tokenret])

  useEffect(() => {
    if (isSubmit && !reduxIsLogged) {
      const req = axios.create({
        baseURL: "http://localhost:3001/api/v1/user",
        timeout: 2000,
      })
      req.defaults.headers.common["accept"] = `application/json`
      req.defaults.headers.common["Content-Type"] = `application/json`
      req
        .post("login", credentials)
        .then((res) => {
          setToken(res.data.body.token)
        })
        .catch((err) => {
          setToken(null)
          //         setIsLogged(false)
          setLogFailed(true)
          setIsSubmit(false)
        })
        .finally(() => {
          if (tokenret) {
            dispatch(login({ token: tokenret, email: credentials.email }))
            setIsSubmit(false)
          }
        })
    }
  }, [isSubmit, credentials, tokenret, dispatch, reduxIsLogged])

  return (
    <main className='main bg-dark'>
      {reduxIsLogged && <Navigate to='/dashboard' replace={true} />}
      <section className='sign-in-content'>
        <i className='fa fa-user-circle sign-in-icon'></i>
        <h1>Sign In</h1>
        {logFailed && <div>Log failed</div>}
        <form onSubmit={submitHandler}>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email}
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              value={credentials.password}
            />
          </div>
          <div className='input-remember'>
            <input type='checkbox' id='remember-me' />
            <label htmlFor='remember-me'>Remember me</label>
          </div>
          <button type='submit' className='sign-in-button'>
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginForm
