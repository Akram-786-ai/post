import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import AuthService from './appwrite/Auth'
import { login } from "./store/authSlice"
import { logout } from './store/authSlice'
import { Footer, Header } from './component'

import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()


  useEffect(() => {
    AuthService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({
            userData
          }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className=' min-h-screen content-between bg-gray-400 flex flex-wrap'>
      <div className=' w-full  block'>
        <Header />
        <main>
          TODO:  <Outlet />
        </main>
        <Footer />

      </div></div>
  ) : (null)
}

export default App
