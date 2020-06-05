import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Upload from "../../components/Upload/Upload";
import logo from "../../assets/logo.jpg";


const NewfilePage = () => {
  return (
    <React.Fragment>
      <Navbar />
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
        <Upload />
      </div>
    </React.Fragment>
  );
};

export default NewfilePage;
