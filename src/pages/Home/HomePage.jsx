import React, { useEffect, useState } from "react";
import FileCards from "../../components/FileCards/FileCards";
import Navbar from '../../components/Navbar/Navbar'
import * as APIS from "../../constants/apisUrl";

import logo from "../../assets/logo.jpg";
import Axios from "axios";

const HomePage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const email = localStorage.getItem("email");
      const response = await Axios.get(
        APIS.SALUDFOLDER + "users/email/" + email
      );
      if (response.status === 200) {
        localStorage.setItem("user", response.data);
        await Axios.get(
          APIS.SALUDFOLDER + "documentos/owner_id/" + response.data._id
        )
          .then((res) => {
            setDocuments(res.data.documentos);
          })
          .catch((err) => console.log(err));
      }
    }
    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <Navbar/>
      <div className="d-flex mb-3 mt-3">
        <figure>
          <img src={logo} alt="Logo saludfolder" />
        </figure>
        <div className="border-left pl-3 ml-3 w-75 text-center">
          <br />
          <br />
          <h1>Bienvenido a su carpeta de salud</h1>
          <h2>Seleccione el archivo que desee descargar</h2>
        </div>
        <hr />
      </div>
      <div>
        <FileCards documents={documents} />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
