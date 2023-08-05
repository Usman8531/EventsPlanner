import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgotPassword from './ForgotPassword'
import Login from './Login'
import NoPage from './NoPage'
import Register from './Register'
import ResetPassword from './ResetPassword'

import Header from 'components/Header'
import Footer from 'components/Footer'

export default function index() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}
