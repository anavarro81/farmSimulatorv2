import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'

const userID  =localStorage.getItem("UserId");
console.log("Estoy en parcelas y estoy conectado con el user: ", userID);

export default function ParcelPage() {

  const [parcels, setParcels]= useState();


  const GetParcels = async () => {

    console.log("userID", userID)

  try{
    const res = await axiosInstance.get("user/userAllParcels/"+userID);
    setParcels(res.data)
    console.log(res)

  
}catch(err){
  console.log(err)
}
}

useEffect(() => {
  GetParcels();
}, [])

  return (
    <div>
      <h1>PArcelas</h1>
    </div>
  )

}