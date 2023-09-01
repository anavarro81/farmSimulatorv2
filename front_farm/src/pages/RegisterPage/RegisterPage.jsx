import React, { useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [isError, setIsError] = useState(false)


  const onSubmit = async (e) => {
      e.preventDefault()
      setIsError(false)

      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      }

      try{
          const res = await axiosInstance.post('user/register', data)
          localStorage.setItem('token', res.data.token)
          navigate('/home')
        
      }catch(err){
        console.log(err)
        setIsError(true)
      }
  
  }

  return (
    <div>
      
      <form onSubmit={onSubmit}>
        <h1>Register</h1>
        { isError && <p>Credenciales incorrectas</p>}

        <div>
          <label htmlFor="">Nombre</label>
          <input type="text" name='name' />
        </div>



        <div>
          <label htmlFor="">Email</label>
          <input type="email" name='email' />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" />
        </div>

        <button> Registro </button>

      </form>
    </div>
  )
}
