import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { selectIsLogged } from "../../features/user/userSlice"
export default function ProtectRoute({ children }) {
  const isLogged = useSelector(selectIsLogged)
  if (isLogged) return children
  return <Navigate to='/' replace={true} />
}
