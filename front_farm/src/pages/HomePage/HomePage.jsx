import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {

  const getParcel = async () => {
  //   const resultado = await axios(
  //     "http://localhost:5000/user/userAllParcels/64ef5ad09f1468886016542c"
  //   );

  //   console.log(resultado);
  };

  useEffect(() => {
    getParcel();
  }, []);


  return <div>
<h1>Todo correcto</h1>

  </div>;
};

export default HomePage;
