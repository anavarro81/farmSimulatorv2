import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'

const role = localStorage.getItem("role");
console.log("rol del usuario", role)
const userID  =localStorage.getItem("UserId");
console.log("Estoy en usuario y estoy conectado con el user: ", userID);

export default function UserPage() {

  const [user, setUser]= useState([]);
  const [parcels, setParcels]= useState([]);

  const GetUser = async () => {

    console.log("userID", userID)

  try{
    const res = await axiosInstance.get("user/"+userID);
    setUser(res.data)
    console.log(res.data)

  
}catch(err){
  console.log(err)
}
}


useEffect(() => {
  GetUser();
}, [])

  return (
    <div>
      <h1>Comunidad de Regantes Estrecho de Peñaroya</h1>
      <h2>Nombre: {user.name}</h2>
      <h2>Email: {user.email}</h2>
      {user.parcel && <h3>Número de parcelas: {user.parcel.length}</h3>}
      <h4>Localidad: Argamasilla de Alba</h4>
    </div>
  )
}
