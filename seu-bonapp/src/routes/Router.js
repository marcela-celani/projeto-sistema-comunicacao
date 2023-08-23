import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'
import SignUpPage from '../pages/cadastro/SignUpPage'
import HomePage from '../pages/home/HomePage'
import { AuthContext } from '../context/AuthContext'
import ErrorPage from '../pages/error/ErrorPage'
import Messages from '../components/Messages'


const Router = () => {
  const {currentUser} = useContext(AuthContext)


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/homepage' element={currentUser ? <HomePage /> : <ErrorPage />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
