import React, { useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)


  const onSubmit = async (e) => {
      e.preventDefault()
      setIsError(false)

      const data = {
        email: e.target.email.value,
        password: e.target.password.value
      }

      try{
          const res = await axiosInstance.post('/user/login', data)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('role', res.data.role)
          localStorage.setItem('UserId', res.data.id)
          navigate('/home')
        
      }catch(err){
        console.log(err)
        setIsError(true)
      }
  
  }

  return (
    <div>
      
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        { isError && <p>Credenciales incorrectas</p>}
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name='email' />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" />
        </div>

        <button>Login</button> 
        <p> ¿No tienes cuenta? <Link to='/register'> Regístrate </Link> </p>
        

      </form>
    </div>
  )
}
