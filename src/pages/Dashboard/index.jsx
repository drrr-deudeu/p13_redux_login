import { useSelector, useDispatch } from "react-redux"
import {
  selectIsLogged,
  selectProfile,
  saveProfile,
} from "../../features/user/userSlice"
import { APIUpdateProfile } from "../../features/serverRequests"
import { useEffect, useState } from "react"
import Accounts from "../../components/Accounts"

export default function Dashboard() {
  const isLogged = useSelector(selectIsLogged)
  const profile = useSelector(selectProfile)
  const [editProfile, setEditProfile] = useState(false)
  const [firstName, setFirstName] = useState(profile.firstName)
  const [lastName, setLastName] = useState(profile.lastName)
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch()
  const editHandler = (e) => {
    setFirstName(profile.firstName)
    setLastName(profile.lastName)
    setEditProfile(true)
  }
  const submitCancelHandler = (e) => {
    e.preventDefault()
    setEditProfile(false)
  }
  const submitFormHandler = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    setEditProfile(false)
  }
  useEffect(() => {
    if (isSubmit) {
      dispatch(saveProfile({ firstName: firstName, lastName: lastName }))
      setIsSubmit(false)
      dispatch(APIUpdateProfile({ firstName: firstName, lastName: lastName }))
    }
  }, [isLogged, isSubmit, firstName, lastName, editProfile, dispatch])

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
              <>
                <h1 className='dashboard_title'>Welcome back</h1>
                <div className='title_fields'>
                  <div>{profile.firstName}</div>
                  <div>{profile.lastName}!</div>
                </div>
              </>
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
          <Accounts />
        </div>
      )}
    </main>
  )
}
