//import useLogin from "../../utils/hooks/useLogin"
import LoginForm from "../../components/LoginForm"
import { signout } from "../../features/user/userSlice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
function Login() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signout())
  }, [dispatch])
  return (
    <div className='app'>
      <LoginForm />
    </div>
  )
}

export default Login
