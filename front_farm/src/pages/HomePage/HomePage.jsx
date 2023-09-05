import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { Link } from "react-router-dom";

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
        <div className="flex flex-wrap">
          {parcelData.map((item) => (
            <div key={item?._id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-500 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-contain object-center"
                  src={item?.img}
                  alt={item?.name}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    Número de contador:
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {item?.name}
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Plantación: {item?.plant}
                  </p>
                  <p className="leading-relaxed mb-3">Hectáreas: {item?.has}</p>
                  <div className="flex items-center flex-wrap"></div>
                </div>
              </div>
            </div>
            
          ))}
        </div>
        <Link
                    to={`/parcel`}
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                  >
                    Ir a mis parcelas
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
  );
};

export default HomePage;
