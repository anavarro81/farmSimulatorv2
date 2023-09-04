import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { Link } from "react-router-dom"
import styled from 'styled-components'
import AuthRole from '../../auth/AuthRole';
import SearchText from '../../components/SearchText/SearchText';



export default function ParcelPage() {

  const role = localStorage.getItem("role");
  console.log("El Rol del usuario es: ", role);
  const userID  =localStorage.getItem("UserId");
  console.log("Estoy en parcelas y estoy conectado con el user: ", userID);


  const [parcels, setParcels]= useState([]);
  const [parcelsForEdit, setParcelsForEdit] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState("")
  const [parcelsCopy, setparcelsCopy]= useState([])
  

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



const getUserByRol = async () => {

  const res = await axiosInstance.get(`/user/getUserByRol/user`)
  setUsers(res.data)

}

useEffect(() => {

  if(role === "user"){
    console.log('Recupero las parcelas')
    GetParcels();
  }
  if(role === "admin"){
    console.log('Recupero los roles')
    getUserByRol();
  }
  
}, [])
useEffect(() => {
  setparcelsCopy([...parcels]);
}, [parcels]);

const onSubmit = async (e) => {
  e.preventDefault()

  const data = {
    user: e.target.user.value,
    name: e.target.name.value,
    plant: e.target.plant.value,
    has: e.target.has.value,
    img: e.target.img.value
  }

  console.log(e.target.user.value)

  try {


    const res = await axiosInstance.post('/parcel/', data)
    alert("Parcela añadida");

    
  }
  catch (err) {
    console.log(err);

  }

}

const getAllParcels = async (e) => {
  console.log(e.target.value)
  const res = await axiosInstance.get(`/user/userAllParcels/${e.target.value}`)
  setParcelsForEdit(res.data)
  setUser(e.target.value)

}


const deleteParcel = async (id) => {
  console.log('Estoy borrando la parcela')

  try {
    const res = await axiosInstance.delete(`/parcel/delete/${id}/${user}`)
    alert('Parcela eliminada corectamente'); 
    window.location.reload();

  }
  catch(err) {
    console.log('No se ha podido borrar la parcela')
  }
}

const updateFilter = (name) => {
  console.log(name);
  const parcelsAux = parcels.filter((parcel) =>
    parcel.name.toLowerCase().includes(name.toLowerCase())
  );
  setparcelsCopy(parcelsAux);
};
return  <>


{role === "user" && <SearchText search={updateFilter}/>}


    {parcelsCopy.map((item) => <div key={item._id}>
          <h2>Número de contador: {item.name}</h2>
          <h3>Plantación: {item.plant}</h3>
          <h3>Hectáreas: {item.has}</h3>
          <img src={item.img} alt={item.name}/>
          <Link to={`/calendar/${item._id}`}>Regar/Abrir calendario</Link>
      </div>)
    }

    <AuthRole>
  <form onSubmit={onSubmit}>

    <h2> Alta de parcela </h2>
  {/* Listado de usurios */}

  <select name="user" id="user">
      <option value=""> Seleccionar usuario </option>
      {users?.map((item) => <option value={item._id}> {item.name} </option>

      )}


    </select>

    <div>
      <label htmlFor="">Nombre de parcela</label>
      <input type="text" name='name' />
    </div>

    <div>
      <label htmlFor="">Plantación</label>
      <input type="text" name='plant' />
    </div>

    <div>
      <label htmlFor="">Hectáreas</label>
      <input type="number" name='has' />
    </div>

    <div>
      <label htmlFor="">Imagen</label>
      <input type="text" name='img' />
    </div>

    <button> Subir Parcela </button>

  </form>

  <div>
    <h1>Editar/Borrar parcelas del usuario:</h1>
    <select name="user" id="user" onChange={(e) => getAllParcels(e)}>
      <option value=""> Seleccionar usuario </option>
      {users?.map((item) => <option value={item._id}> {item.name} </option>

      )}

    </select>

    {parcelsForEdit.map((item) => <div key={item._id}>
          <h2>Número de contador: {item.name}</h2>
          <h3>Plantación: {item.plant}</h3>
          <h3>Hectáreas: {item.has}</h3>
          <img src={item.img} alt={item.name}/>
            <div>
          <img src="/borrar_24px.png" alt="" onClick={() => deleteParcel(item._id)}/>
          <Link to={`/update/${item._id}/${item.name}/${item.plant}/${item.has}/${item.img} `}><img src="/editar_24px.png" alt="item.name"/></Link>
        </div>
      </div>)
    }

  </div>

  </AuthRole>

  </>
}