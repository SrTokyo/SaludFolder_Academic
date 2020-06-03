import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.jpg";
import { useForm } from "../../functions/useForm";
import { Link } from "react-router-dom";
import * as APIS from "../../constants/apisUrl";
import * as ROUTES from "../../constants/routes";
import "./SignupPage.css";
import Axios from "axios";

const IntroPage = () => {
  const { values, handleChange, handleSubmit } = useForm(signup);

  async function signup() {
    if (validateGovCarpeta === 200 && registerGovCarpeta === 200) {
      registerSaludFolder().then((res) => {
        console.log(res);
        console.log("Pasar al login");
      }).catch(err => {
        console.log(err)
        console.log("mostrar error saludfolder")
      });
    } else {
      console.log("mostrar error govCarpeta")
    }
  }

  async function validateGovCarpeta() {
    const response = await Axios.get(
      APIS.GOVCARPETA + "validateCitizen/" + values.nit
    );
    return response.status;
  }

  async function registerGovCarpeta() {
    const govData = {
      id: values.nit,
      name: values.nombre,
      address: "Carrera 80",
      email: values.email,
      operatorId: 495604,
      operatorName: "SaludFolder",
    };
    const response = await Axios.post(
      APIS.GOVCARPETA + "registerCitizen",
      govData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.status;
  }

  async function registerSaludFolder() {
    switch (values.user_tipo) {
      case "paciente":
        values.accesoLVL = 4;
        break;
      case "empleado":
        values.accesoLVL = 3;
        break;
      case "entidad":
        values.accesoLVL = 2;
        break;
      default:
        values.accesoLVL = 4;
        break;
    }
    values.documentos = [];
    const response = await Axios.post(
      APIS.SALUDFOLDER + "users/signup",
      values,
      { headers: { "Content-Type": "application/json" } }
    );
    return response;
  }

  return (
    <React.Fragment>
      <figure className="d-flex justify-content-center">
        <img src={logo} alt="Logo SaludFolder" />
      </figure>
      <div className="title">
        <h1>Regístrese</h1>
        <h3>Rellene el siguiente formulario:</h3>
      </div>
      <form align="center" onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
              <h4>Escriba su nombre:</h4>
              <input
                value={values.nombre}
                onChange={handleChange}
                type="text"
                name="nombre"
                placeholder="Nombre..."
                className="form-input"
              />
              <h4>Escriba sus apelidos:</h4>
              <input
                value={values.apellidos}
                onChange={handleChange}
                type="text"
                name="apellidos"
                placeholder="Apellidos..."
                className="form-input"
              />
              <h4>Escoja su tipo de documento:</h4>
              <select
                name="nit_tipo"
                value={values.nit_tipo}
                className="form-input"
              >
                <option value="cc">Cédula de ciudadanía</option>
                <option value="ti">Tarjeta de identidad</option>
                <option value="nit">NIT</option>
                <option value="other">Otro</option>
              </select>
            </Col>
            <Col className="border-left border-dark">
              <h4>Digite su número de documento:</h4>
              <input
                value={values.nit}
                onChange={handleChange}
                type="number"
                name="nit"
                placeholder="Número de documento..."
                className="form-input"
              />
              <h4>Escriba su correo electrónico:</h4>
              <input
                value={values.email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="Correo electrónico..."
                className="form-input"
              />
              <h4>Escoja su rol en el centro de salud:</h4>
              <select
                name="user_tipo"
                value={values.user_tipo}
                className="form-input"
              >
                <option value="paciente">Paciente</option>
                <option value="empleado">Doctor o empleado</option>
                <option value="entidad">Entidad de salud</option>
              </select>
            </Col>
          </Row>
        </Container>
        <div className="pb-5">
          <button className="btn btn-primary btn-lg mt-5 mb-2">
            Registrarse
          </button>
          <p>
            ¿Ya tiene una cuenta? <Link to={ROUTES.INTRO}>Inicie sesión</Link>
          </p>
        </div>
      </form>
    </React.Fragment>
  );
};

export default IntroPage;
