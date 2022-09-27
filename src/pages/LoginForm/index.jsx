import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectIsLogged } from "../../features/user/userSlice"
import { APILogin } from "../../features/serverRequests"
import {
  selectUserName,
  saveRememberMe,
  selectRememberMe,
  selectLogFailed,
} from "../../features/user/userSlice"
function LoginForm() {
  const userName = useSelector(selectUserName)
  const [credentials, setCredentials] = useState({
    email: userName ? userName : "",
    password: "",
    remmemberMe: false,
  })

  const savedRememberMe = useSelector(selectRememberMe)
  const [isRememberMe, setRememberMe] = useState(savedRememberMe)
  const isLogged = useSelector(selectIsLogged)
  const logFailed = useSelector(selectLogFailed)
  const dispatch = useDispatch()

  function submitHandler(e) {
    e.preventDefault()
    dispatch(
      saveRememberMe({ credentials: credentials, rememberMe: isRememberMe })
    )
    dispatch(APILogin(credentials))
  }
  const handleToggle = (e) => setRememberMe((prev) => !prev)

  return (
    <main className='main bg-dark'>
      {isLogged && <Navigate to='/dashboard' replace={true} />}
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
            <input
              type='checkbox'
              id='remember-me'
              onChange={handleToggle}
              checked={isRememberMe}
            />
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
