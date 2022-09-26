import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  selectProfileLoaded,
  selectToken,
  selectIsLogged,
  logout,
  selectProfile,
  relog,
  selectDate,
} from "../../features/user/userSlice"
import { APIProfile } from "../../features/serverRequests"
import { useEffect } from "react"
export default function Header() {
  const profileLoaded = useSelector(selectProfileLoaded)
  const reduxProfil = useSelector(selectProfile)
  const token = useSelector(selectToken)
  const isLogged = useSelector(selectIsLogged)
  const date = useSelector(selectDate)
  const dispatch = useDispatch()

  function logoutHandler(e) {
    e.preventDefault()
    dispatch(logout())
  }
  useEffect(() => {
    if (token && !isLogged) {
      //const date = parseInt(localStorage.getItem("date"))
      const now = Date.now()
      // 24H
      // if (now - date > 86400000) {
      // 86,4 sec
      if (now - date > 86400) {
        console.log("Now:" + now + " store:" + date + " diff:" + (now - date))
        dispatch(logout())
        return
      }
      dispatch(relog())
    }

    if (!isLogged || profileLoaded) return
    dispatch(APIProfile())
  }, [isLogged, profileLoaded, token, dispatch, date])

  return (
    <nav className='main-nav'>
      <Link className='main-nav-logo' to='/'>
        <img
          className='main-nav-logo-image'
          src='./img/argentBankLogo.png'
          alt='Argent Bank Logo'
        />
        <h1 className='sr-only'>Argent Bank</h1>
      </Link>
      {profileLoaded ? (
        <div>
          <Link className='main-nav-item' to='/dashboard'>
            <i className='fa fa-user-circle'></i>
            {reduxProfil.firstName}
          </Link>
          <Link className='main-nav-item' to='./' onClick={logoutHandler}>
            <i className='fa fa-sign-out'></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className='main-nav-item' to='/sign-in'>
            <i className='fa fa-user-circle'></i>
            <span>Sign In</span>
          </Link>
        </div>
      )}
    </nav>
  )
}
