import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { Link } from "react-router-dom"



const userID  =localStorage.getItem("UserId");
console.log("Estoy en parcelas y estoy conectado con el user: ", userID);

export default function ParcelPage() {

  const [parcels, setParcels]= useState([]);


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
      {parcels.map((item) => <div key={item._id}>
            <h2>Número de contador: {item.name}</h2>
            <h3>Plantación: {item.plant}</h3>
            <h3>Hectáreas: {item.has}</h3>
            <img src={item.img} alt={item.name}/>
        </div>)}
        <Link to={"/calendar"}>Regar/Abrir calendario</Link>
    </div>        
        
       
  )

}