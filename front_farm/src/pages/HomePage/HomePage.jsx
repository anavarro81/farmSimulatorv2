import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { Link } from "react-router-dom"


const userID = localStorage.getItem("UserId");

const HomePage = () => {
  const [parcelData, setParcelData] = useState([]);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("user/userAllParcels/" + userID);
      const data = response.data;
      
      setParcelData(data);
      

    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getUser();
    //window.location.reload();
  }, []);

  return (
    <div>
      <div id="c_0abf44853601b19b9fb79857b54ebbc3" className="ancho">
        <iframe
          title="weather"
          id="fr_0abf44853601b19b9fb79857b54ebbc3"
          className="ancho 725 95"
          src="https://www.eltiempo.es/widget/get_widget/0abf44853601b19b9fb79857b54ebbc3?v=11000"
          frameBorder="0"
          width="100%"
          height="100%"
          allowtransparency="true"
        ></iframe>
      </div>
      <h2>Tus parcelas:</h2>
      <div>
        {parcelData.map((parcel) => (
          <div key={parcel._id}>
            <h3 className="myHeader">Nombre: {parcel.name}</h3>
            <p>Has: {parcel.has}</p>
            <p>Plant: {parcel.plant}</p>
            <Link to={"/parcel/"+parcel._id}>
              <img src={parcel.img} alt={parcel.name} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;