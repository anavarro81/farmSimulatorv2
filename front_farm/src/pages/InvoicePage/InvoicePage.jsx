import { axiosInstance } from '../../utils/axios'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import AuthRole from '../../auth/AuthRole';




export default function InvoicePage() {

  const role = localStorage.getItem("role");
  console.log("El Rol del usuario es: ", role);


  const userID = localStorage.getItem('UserId')

  const [invoices, setInvoices] = useState([])
  const [invoicesForEdit, setInvoicesForEdit] = useState([])
  const [users, setUsers] = useState([])
  const [user, setUser] = useState("")



  const getInvoicies = async () => {

    const res = await axiosInstance.get(`/invoice/getAllInvoices/${userID}`)
    setInvoices(res.data)

  }

  const getUserByRol = async () => {

    const res = await axiosInstance.get(`/user/getUserByRol/user`)
    setUsers(res.data)

  }

// Borra factura por ID. 
  const deleteInvoice = async (id) => {
    
    console.log('Estoy en deleteInvoice')
    console.log('Factura = ', id)
    console.log('Usuario = ', user)
    


    try {      
      const res = await axiosInstance.delete(`/invoice/delete/${id}/${user}`)
      console.log('Factura con id = ' +  id + ' borrada con exito')
      alert("factura borrada");
      window.location.reload();
      
    } catch (error) {
      console.log('Se ha producido un error al borrar la factura')
      console.log('error ', error )
    }



  }


  useEffect(() => {
    

    if(role === "user"){
      
      getInvoicies();
    }

    if(role === "admin"){
      
      getUserByRol();
    }

  }, [])


  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      year: e.target.year.value,
      month: e.target.month.value,
      file: e.target.file.value,
      user: e.target.user.value
    }

    try {



      const res = await axiosInstance.post('/invoice/', data)

      alert("factura dada de alta con éxito")
 
      
    }
    catch (err) {
      console.log(err);

    }

  }


  const getAllInvoice = async (e) => {
    console.log(e.target.value)
    const res = await axiosInstance.get(`/invoice/getAllInvoices/${e.target.value}`)
    setInvoicesForEdit(res.data)
    setUser(e.target.value)
  }



  return <>

    {invoices &&
      <ComponetMainInvoices >
     { invoices.map((item) =>
        <div  key={item?._id}>
          <a href={"/FacturaAgosto2023.pdf"}> <img src="/descargar-pdf128.png" alt="" /> </a>
          <p>{item?.month}</p>
        </div>)}
       
      </ComponetMainInvoices>

    }

<AuthRole>
    <form onSubmit={onSubmit}>

      <h2> Alta de factura </h2>

{/* Listado de usurios */}
 
      <select name="user" id="user">
        <option value=""> Seleccionar usuario </option>
        {users?.map((item) => <option value={item._id}> {item.name} </option>
        
        )}

        
      </select>

      
      
      <div>
        <label htmlFor="">Año</label>
        <input type="number" name='year' />
      </div>



      <label for="invoice">Elige un mes</label>

      <select name="month" id="cars">
        <option value="enero">enero</option>
        <option value="febrero">febrero</option>
        <option value="marzo">marzo</option>
        <option value="abril">abril</option>
        <option value="mayo">mayo</option>
        <option value="junio">junio</option>
        <option value="julio">julio</option>
        <option value="agosto">agosto</option>
        <option value="septiembre">septiembre</option>
        <option value="noviembre"> noviembre </option>
        <option value="diciembre"> diciembre </option>
      </select>

      <div>
        <label htmlFor=""> Archivo </label>
        <input type="text" name='file' />
      </div>

      <button> Subir Factura </button>


    </form>

    <div>
       <h1>Ver Facturas</h1>
       <select name="user" id="user" onChange={(e) => getAllInvoice(e)}>
        <option value=""> Seleccionar usuario </option>
        {users?.map((item) => <option value={item._id}> {item.name} </option>
        
        )}

        
      </select>
{/* Facturas de un usuario dato */}
{/* Borrado de */}
      {invoicesForEdit &&
      <ComponetMainInvoices >
     { invoicesForEdit && invoicesForEdit.map((item) =>
        <div  key={item?.id}>
          <a href={"/FacturaAgosto2023.pdf"}> <img src="/descargar-pdf128.png" alt="" /> </a>
          <p> {item?.month} </p>
          <div>
            <img src="/borrar_24px.png" alt="" onClick={() => deleteInvoice(item?._id)}/>
          </div>
        </div>)}
        
      </ComponetMainInvoices>
      

    }


    </div>





</AuthRole>

  </>

}


const ComponetMainInvoices = styled.div`
  display: flex;
  margin: 10px;

  & > div{
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;
    &:hover{
      transform: scale(1.03);
    }

  }
`