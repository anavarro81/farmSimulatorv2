import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthToken = ({ children }) => {

    const token = localStorage.getItem('token')

    if(!token){
        return <Navigate to="/" />
    }

  return children
}

export default AuthToken