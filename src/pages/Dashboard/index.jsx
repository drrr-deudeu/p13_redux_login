import { useSelector, useDispatch } from "react-redux"
import {
  selectToken,
  selectIsLogged,
  selectProfile,
  saveProfile,
} from "../../features/user/userSlice"
import { useEffect, useState } from "react"
import axios from "axios"
export default function Dashboard() {
  const token = useSelector(selectToken)
  const isLogged = useSelector(selectIsLogged)
  const profile = useSelector(selectProfile)
  const [editProfile, setEditProfile] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [saveProfileBDD, setSaveProfileBDD] = useState(false)
  //const profileLoaded = useSelector(selectProfileLoaded)
  const dispatch = useDispatch()
  const editHandler = (e) => {
    setEditProfile(true)
  }
  const submitCancelHandler = (e) => {
    e.preventDefault()
    setEditProfile(false)
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    setSaveProfileBDD(true)
    setEditProfile(false)
  }
  useEffect(() => {
    if (saveProfileBDD) {
      dispatch(saveProfile({ firstName: firstName, lastName: lastName }))
      setSaveProfileBDD(false)

      const req = axios.create({
        baseURL: "http://localhost:3001/api/v1/user",
        timeout: 2000,
      })
      req.defaults.headers.common["accept"] = `application/json`
      req.defaults.headers.common["Content-Type"] = `application/json`
      req.defaults.headers.common["Authorization"] = `Bearer ${token}`
      req
        .put("profile", { firstName: firstName, lastName: lastName })
        .then((res) => {})
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    }
  }, [
    isLogged,
    token,
    saveProfileBDD,
    firstName,
    lastName,
    editProfile,
    dispatch,
  ])

  return (
    <main className='main bg-dark'>
      {isLogged && (
        <div>
          <div className='header'>
            {editProfile ? (
              <div className='input-profil'>
                <h1>Edit Profil</h1>
                <form onSubmit={submitFormHandler}>
                  <div className='input-fields'>
                    <div className='input-wrapper'>
                      <label htmlFor='firstName'>First Name</label>
                      <input
                        type='text'
                        id='firstName'
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </div>
                    <div className='input-wrapper'>
                      <label htmlFor='lastName'>Last Name</label>
                      <input
                        type='text'
                        id='lastName'
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </div>
                  </div>
                  <button type='submit' className='edit-button'>
                    Save Changes
                  </button>
                </form>
              </div>
            ) : (
              <h1>
                Welcome back
                <br />
                {profile.firstName}&nbsp;{profile.lastName}!
              </h1>
            )}
            {editProfile ? (
              <button className='edit-button' onClick={submitCancelHandler}>
                Cancel
              </button>
            ) : (
              <button className='edit-button' onClick={editHandler}>
                Edit Name
              </button>
            )}
          </div>

          <h2 className='sr-only'>Accounts</h2>
          <section className='account'>
            <div className='account-content-wrapper'>
              <h3 className='account-title'>Argent Bank Checking (x8349)</h3>
              <p className='account-amount'>$2,082.79</p>
              <p className='account-amount-description'>Available Balance</p>
            </div>
            <div className='account-content-wrapper cta'>
              <button className='transaction-button'>View transactions</button>
            </div>
          </section>
          <section className='account'>
            <div className='account-content-wrapper'>
              <h3 className='account-title'>Argent Bank Savings (x6712)</h3>
              <p className='account-amount'>$10,928.42</p>
              <p className='account-amount-description'>Available Balance</p>
            </div>
            <div className='account-content-wrapper cta'>
              <button className='transaction-button'>View transactions</button>
            </div>
          </section>
          <section className='account'>
            <div className='account-content-wrapper'>
              <h3 className='account-title'>Argent Bank Credit Card (x8349)</h3>
              <p className='account-amount'>$184.30</p>
              <p className='account-amount-description'>Current Balance</p>
            </div>
            <div className='account-content-wrapper cta'>
              <button className='transaction-button'>View transactions</button>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}
