import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import SignUpPage from '../pages/cadastro/SignUpPage'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/cadastro' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
