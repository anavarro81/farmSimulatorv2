import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../utils/axios";
import { Link, useNavigate } from 'react-router-dom';

export default function EditParcelPage(){
    
const navigate = useNavigate();
 const {id} = useParams()
 console.log(id);
 
 const [ parcel, setParcel ] = useState ({id:"", name:"", has: "", img:""});

  const handleChange = (event) => {
    const {name, value} = event.target;
    setParcel({[name]: value})
    console.log(event)
  }

const getParcelInfo = async () => {
  try {
    const res = await axiosInstance.get(`/parcel/${id}`);
    setParcel({
      name: res.data.name,
      plant: res.data.plant,
      has: res.data.has,
      img: res.data.img

  })
  }
  catch(error) {
    console.log("Se ha producido un error al obtener la parcera, error", error)
  }

}

  

    useEffect(() => {        
      getParcelInfo()      

    }, [])


    const putParcel = async (id)=> {
        console.log('Estoy editando la parcela')

        const data = {
            name: parcel.name,
            plant: parcel.plant,
            has: parcel.has,
            img: parcel.img,
        
            } 
      
        try {
          const res = await axiosInstance.put(`/parcel/update/${id}`, data)
          alert('Parcela modificada corectamente'); 
        }
        
        catch(err) {
          console.log('No se ha podido modificar la parcela')
          alert('Error al modificar')
        }
      }
    return  <>

    

<form onSubmit={()=>putParcel(id)}>
<label for="nombre">Nombre:</label>
        <input type="text" id="nombre" value={parcel.name} onChange={handleChange} name="name" required/>
<label for="plant">Planta:</label>
        <input type="text" id="nombre" value={parcel.plant} onChange={handleChange} name="plant" required/>
 <label for="has">Hectáreas:</label>
        <input type="text" id="nombre" value={parcel.has} onChange={handleChange} name="has" required/>
 <label for="img">Imagen</label>
        <input type="text" id="nombre" value={parcel.img} onChange={handleChange} name="img" required/>
        <button>Actualizar datos</button> 
</form>

            </>

            
}