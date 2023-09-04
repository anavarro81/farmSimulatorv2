
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/axios'
import { useParams } from 'react-router-dom'
import './CalendarPage.scss';

export default function CalendarPage() {
  const {id} = useParams()

  console.log(id)

   const [isError, setIsError] = useState (false)
   const [parcel, setParcel]= useState([])

  const getCalendars= async()=> {
    const res = await axiosInstance.get(`/parcel/${id}`)
    console.log(res)
    setParcel(res.data)
  }

  const onSubmit = async(e) => {
    e.preventDefault()

    const data = {
        dayOfWeek: e.target.day_of_week.value,
        StartHour: e.target.horaIni.value,
        EndHour: e.target.horaFin.value,
        state: 'solicitado'
    }

    // const dataToParcel = {
    //   parcelId: id,
    //   calendarId: 
    // }

    console.log(data);
    try {
      const res = await axiosInstance.post('/calendar/addCalendar', data)
      console.log('Lo he insertado correctamente');
      setIsError(false)
      console.log("he dado de alta el calendario" , res.data);
      addCalendarToParcel(res.data._id);
    }
    catch (err) {
      console.log('Error al insertar', err);
      setIsError(true)
      console.log("Error = ", err.request.response);
    }

    

  }
  const addCalendarToParcel = async(calendarId) => {

    const data = {
      calendar: calendarId

  } 

  alert ("Riego solicitado correctamente")
  window.location.reload();

  try {
    const res = await axiosInstance.put (`/parcel/${id}`, data)
  } catch (err) {
    console.log('Error al guardar', err);
    setIsError(true)
    console.log("Error = ", err.request.response);
  }
  
  }

  useEffect(() => {
    getCalendars();
  }, []);


  return (
    <div >
         <form className='margin2' action="" onSubmit={onSubmit}>


  <label htmlFor="day_of_week"> Dia de riego: </label>
  <select id="diaSemana" name="day_of_week">
    <option value="lunes">Lunes</option>
    <option value="martes">Martes</option>
    <option value="miercoles">Miércoles</option>
    <option value="jueves">Jueves</option>
    <option value="viernes">Viernes</option>
    <option value="sabado">Sábado</option>
    <option value="domingo">Domingo</option>
</select>


<div>
<label for="horaIni">Selecciona una hora de inicio:</label>
    <select id="horaIni" name="horaIni">
        <option value="00:00">00:00</option>
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="05:00">05:00</option>
        <option value="06:00">06:00</option>
        <option value="07:00">07:00</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
        <option value="23:00">23:00</option>
    </select>
</div>

<div>
<label for="horaFin">Selecciona una hora de fin:</label>
    <select id="horaFin" name="horaFin">
        <option value="00:00">00:00</option>
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="05:00">05:00</option>
        <option value="06:00">06:00</option>
        <option value="07:00">07:00</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
        <option value="23:00">23:00</option>
    </select>
</div>

<button className='update-button margin2'>Solicitar Riego</button>

{isError && <p> Ha dado error en el insert</p>}

</form>

<h1 className='titleCalendar'>Parcela: {parcel.name}</h1>

{ parcel.calendar && 
  parcel.calendar.map((item) => <div className="flex flex-wrap px-5" key={item._id}>
            <h2 className='margin'>Día: {item.dayOfWeek}</h2>
            <h3 className='margin'>Hora inicio: {item.StartHour}</h3>
            <h3 className='margin'>Hora fin: {item.EndHour}</h3>
            <h2 className='margin'>Estado: {item.state}</h2>
            
        </div>)
}
    </div>
  )
}