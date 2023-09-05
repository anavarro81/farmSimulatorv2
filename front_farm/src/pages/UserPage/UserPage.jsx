import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../utils/axios';
import AuthRole from '../../auth/AuthRole';
import './UserPage.scss'; 


export default function UserPage() {
  const role = localStorage.getItem("role");
  const userID = localStorage.getItem("UserId");
  console.log("Estoy en usuario y estoy conectado con el user: ", userID);
  console.log("El Rol del usuario es: ", role);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersForAdmin, setUsersForAdmin] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const GetUser = async () => {
    console.log("userID", userID);

    try {
      const res = await axiosInstance.get("user/" + userID);
      setUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const putUser = async (userID) => {
    console.log("holas");
    // e.preventDefault()

    const data = {
      name: name,
      email: email,
    };
    console.log("e", userID);
    console.log(name);
    console.log(email);
    try {
      const res = await axiosInstance.put("user/" + userID, data);
      alert("Usuario modificado")
      
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userID) => {
    try {
      console.log(userID);
      const res = await axiosInstance.delete("user/" + userID);
      alert("Usuario Eliminado")
;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserByRol = async () => {
    const res = await axiosInstance.get(`/user/getUserByRol/user`);
    setUsers(res.data);
  };

  const getUsersForAdmin = async (e) => {
    console.log("userID", userID);

    try {
      const res = await axiosInstance.get("user/" + e.target.value);
      setUsersForAdmin(res.data);
      console.log(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (role === "user") {
      GetUser();
    } else {
      getUserByRol();
    }
  }, []);

  return (
    <div className="user-page">
      {user.role === "user" && (
        <div>
          <h1 className="user-header">Comunidad de Regantes Estrecho de Peñaroya</h1>
          <div className="user-info">
            <h2>Nombre: {user?.name}</h2>
            <h2>Email: {user?.email}</h2>
            {user?.parcel && <h3>Número de parcelas: {user?.parcel.length}</h3>}
            <h4>Localidad: Argamasilla de Alba</h4>
          </div>
          
        </div>
      )}

      <AuthRole>
        <h1>Ver Usuarios</h1>
        <select name="user" id="user" onChange={(e) => getUsersForAdmin(e)}>
          <option value="">Seleccionar usuario</option>
          {users?.map((item) => (
            <option value={item?._id}>{item?.name}</option>
          ))}
        </select>
        {usersForAdmin && (
          <div className="admin-user-info">
            <h1>Comunidad de Regantes Estrecho de Peñaroya</h1>
            <h2>Nombre: {usersForAdmin?.name}</h2>
            <h2>Email: {usersForAdmin?.email}</h2>
            {usersForAdmin.parcel && (
              <h3>Número de parcelas: {usersForAdmin?.parcel.length}</h3>
            )}
            <h4>Localidad: Argamasilla de Alba</h4>

            <button
              className="delete-button"
              onClick={() => deleteUser(usersForAdmin._id)}
            >
              Eliminar usuario
            </button>

            <form onSubmit={() => putUser(usersForAdmin._id)}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                value={name}
                name="name"
                className="shadow appearance-none border border-black-500 rounded w-80 py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                value={email}
                name="email"
                className="shadow appearance-none border border-black-500 rounded w-80 py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleEmailChange}
              />
              <button className="update-button">Actualizar datos</button>
            </form>
          </div>
        )}
      </AuthRole>
    </div>
  );
}