import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthRole from "../../auth/AuthRole";
import SearchText from "../../components/SearchText/SearchText";
import './ParcelPage.scss';

export default function ParcelPage() {
  const role = localStorage.getItem("role");
  console.log("El Rol del usuario es: ", role);
  const userID = localStorage.getItem("UserId");
  console.log("Estoy en parcelas y estoy conectado con el user: ", userID);

  const [parcels, setParcels] = useState([]);
  const [parcelsForEdit, setParcelsForEdit] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const [parcelsCopy, setparcelsCopy] = useState([]);

  const GetParcels = async () => {
    console.log("userID", userID);

    try {
      const res = await axiosInstance.get("user/userAllParcels/" + userID);
      setParcels(res.data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserByRol = async () => {
    const res = await axiosInstance.get(`/user/getUserByRol/user`);
    setUsers(res.data);
  };

  useEffect(() => {
    if (role === "user") {
      console.log("Recupero las parcelas");
      GetParcels();
    }
    if (role === "admin") {
      console.log("Recupero los roles");
      getUserByRol();
    }
  }, []);
  useEffect(() => {
    setparcelsCopy([...parcels]);
  }, [parcels]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      user: e.target.user.value,
      name: e.target.name.value,
      plant: e.target.plant.value,
      has: e.target.has.value,
      img: e.target.img.value,
    };

    console.log(e.target.user.value);

    try {
      const res = await axiosInstance.post("/parcel/", data);
      alert("Parcela añadida");
    } catch (err) {
      console.log(err);
    }
  };

  const getAllParcels = async (e) => {
    console.log(e.target.value);
    const res = await axiosInstance.get(
      `/user/userAllParcels/${e.target.value}`
    );
    setParcelsForEdit(res.data);
    setUser(e.target.value);
  };

  const deleteParcel = async (id) => {
    console.log("Estoy borrando la parcela");

    try {
      const res = await axiosInstance.delete(`/parcel/delete/${id}/${user}`);
      alert("Parcela eliminada corectamente");
      window.location.reload();
    } catch (err) {
      console.log("No se ha podido borrar la parcela");
    }
  };

  const updateFilter = (name) => {
    console.log(name);
    const parcelsAux = parcels.filter((parcel) =>
      parcel.name.toLowerCase().includes(name.toLowerCase())
    );
    setparcelsCopy(parcelsAux);
  };
  return (
    <>
      {role === "user" && <SearchText  search={updateFilter} />}

      <div className="flex flex-wrap px-5">
        {parcelsCopy.map((item) => (
          <div key={item._id} className="p-4 md:w-1/3">
            <div className="h-full border-2 border-gray-500 border-opacity-60 rounded-lg overflow-hidden">
              <img
                className="lg:h-48 md:h-36 w-full object-contain object-center"
                src={item.img}
                alt={item.name}
              />
              <div className="p-6">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                  Número de contador:
                </h2>
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                  {item.name}
                </h1>
                <p className="leading-relaxed mb-3">Plantación: {item.plant}</p>
                <p className="leading-relaxed mb-3">Hectáreas: {item.has}</p>
                <div className="flex items-center flex-wrap">
                  <Link
                    to={`/calendar/${item._id}`}
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    Programar riego
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <AuthRole>
          <form onSubmit={onSubmit}>
            <h2 className="title"> Alta de parcela </h2>
            {/* Listado de usurios */}

            <select name="user" id="user" className="select">
              <option value="" className="py-10"> Seleccionar usuario </option>
              {users?.map((item) => (
                <option value={item._id}> {item.name} </option>
              ))}
            </select>

            <div>
              <label htmlFor="">Nombre de parcela</label>
              <input type="text" name="name" className="shadow appearance-none border border-black-500 rounded w-full py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <div>
              <label htmlFor="">Plantación</label>
              <input type="text" name="plant" className="shadow appearance-none border border-black-500 rounded w-full py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div>
              <label htmlFor="">Hectáreas</label>
              <input type="number" name="has" className="shadow appearance-none border border-black-500 rounded w-full py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>

            <div>
              <label htmlFor="">Imagen</label>
              <input type="text" name="img" className="shadow appearance-none border border-black-500 rounded w-full py-1 px-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <button className="update-button"> Subir Parcela </button>
          </form>

          <div className="mx-10">
            <h2 className="title">Editar/Borrar parcelas del usuario</h2>
            <select className="select" name="user" id="user" onChange={(e) => getAllParcels(e)}>
              <option value="" > Seleccionar usuario </option>
              {users?.map((item) => (
                <option value={item._id}> {item.name} </option>
              ))}
            </select>

            {parcelsForEdit && parcelsForEdit.map((item) => (
              <div key={item?._id} >
                <h3>Número de contador: {item?.name}</h3>
                <h3>Plantación: {item?.plant}</h3>
                <h3>Hectáreas: {item?.has}</h3>
                <img src={item?.img} alt={item?.name} />
                <div className="flex flex-wrap">
                  <img
                    src="/borrar_24px.png"
                    alt=""
                    onClick={() => deleteParcel(item._id)}
                  />
                  <Link
                    to={`/update/${item?._id}/${item?.name}/${item?.plant}/${item?.has}/${item?.img} `}
                  >
                    <img src="/editar_24px.png" alt="item.name" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </AuthRole>
      </div>
    </>
  );
}
