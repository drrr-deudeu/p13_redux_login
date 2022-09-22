import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"
import {
  selectProfileLoaded,
  selectToken,
  profile,
  selectIsLogged,
  logout,
  selectProfile,
  relog,
} from "../../features/user/userSlice"
import { useEffect } from "react"
export default function Header() {
  // const profileDefaut = {
  //   createdAt: "",
  //   email: "",
  //   firstName: "",
  //   id: "",
  //   lastName: "",
  //   updatedAt: "",
  // }
  const profileLoaded = useSelector(selectProfileLoaded)
  const reduxProfil = useSelector(selectProfile)
  const token = useSelector(selectToken)
  const isLogged = useSelector(selectIsLogged)
  const [profileret, setProfile] = useState(null)
  const [signOut, setSignOut] = useState(false)
  const dispatch = useDispatch()

  function signOutHandler(e) {
    e.preventDefault()
    setSignOut(true)
    setProfile(null)
    localStorage.removeItem("token")
    localStorage.removeItem("date")
  }
  useEffect(() => {
    if (signOut) {
      dispatch(logout())
      setSignOut(false)
      return
    }

    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"))
      localStorage.getItem("token")
      const date = parseInt(localStorage.getItem("date"))
      const now = Date.now()
      // 24H
      if (now - date > 86400000) {
        console.log("Now:" + now + " store:" + date + " diff:" + (now - date))
        localStorage.removeItem("token")
        localStorage.removeItem("date")
        return
      }
      dispatch(relog({ token: localStorage.getItem("token"), date: now }))
    }
    if (!isLogged || profileLoaded) return
    const req = axios.create({
      baseURL: "http://localhost:3001/api/v1/user",
      timeout: 2000,
    })
    req.defaults.headers.common["accept"] = `application/json`
    //req.defaults.headers.common["Content-Type"] = `application/json`
    req.defaults.headers.common["Authorization"] = `Bearer ${token}`
    // req.defaults.headers.common["Cache-Control"] = `no-cache`
    // req.defaults.headers.common["Pragma"] = `no-cache`
    // req.defaults.headers.common["Expires"] = `0`
    req
      .post("profile", "")
      .then((res) => {
        setProfile(res.data.body)
      })
      .catch((err) => {})
      .finally(() => {
        dispatch(profile(profileret))
      })
  }, [isLogged, profileLoaded, profileret, token, dispatch, signOut])
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
          {/* <a className='main-nav-item' href='./user.html'> */}
          <Link className='main-nav-item' to='/dashboard'>
            <i className='fa fa-user-circle'></i>
            {reduxProfil.firstName}
          </Link>
          <Link className='main-nav-item' to='./' onClick={signOutHandler}>
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
      {signOut && <Navigate to='/' replace={true} />}
    </nav>
  )
}
