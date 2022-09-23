import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLogged } from "../../features/user/userSlice"
import { APILogin, selectStatus } from "../../features/serverRequests"
function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [isSubmit, setIsSubmit] = useState(false)
  const [logFailed, setLogFailed] = useState(false)
  const reduxIsLogged = useSelector(selectIsLogged)
  const login_status = useSelector(selectStatus)
  const dispatch = useDispatch()
  function submitHandler(e) {
    e.preventDefault()
    setIsSubmit(true)
  }

  useEffect(() => {
    if (login_status === "rejected") setLogFailed(true)
    if (isSubmit) {
      dispatch(APILogin(credentials))
      setIsSubmit(false)
    }
  }, [credentials, isSubmit, dispatch, login_status])

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
