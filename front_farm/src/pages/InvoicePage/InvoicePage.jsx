import React from 'react'
import { axiosInstance } from '../../utils/axios'

export default function InvoicePage() {
 
  
  const onSubmit = async(e) => {
    e.preventDefault()

    const data = {      
        year: e.target.year.value,
        month: e.target.month.value, 
        file: e.target.file.value
    }

    try {

      

      const res = await axiosInstance.post('/invoice/', data)
      console.log(res);
    }
    catch (err) {
      console.log(err);

    }

  }


  return (
    <>
    
    <form onSubmit={onSubmit}>

      <h2> Alta de factura </h2>

        <div>
          <label htmlFor="">año</label>
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
    </>

  )
}
