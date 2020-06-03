import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.jpg";
import { useForm } from "../../functions/useForm";
import * as APIS from "../../constants/apisUrl";
import Axios from "axios";
import { Link } from "react-router-dom";

const IntroPage = () => {
  const { values, handleChange, handleSubmit } = useForm(login);

  async function login() {
    console.log(values);
    const response = await Axios.post(
      APIS.SALUDFOLDER + "users/login",
      values,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      localStorage.set("sessionToken", response.token);
      console.log("Redirigir");
    } else {
    }
  }

  return (
    <React.Fragment>
      <figure className="d-flex justify-content-center">
        <img src={logo} alt="Logo SaludFolder" />
      </figure>
      <Container>
        <Row>
          <Col className="text-center">
            <h1 className="pb-5">Bienvenido a su carpeta ciudadana</h1>
            <h2 className="pb-5 pt-4" style={{ color: "#34a1cc" }}>
              Salud Folder
            </h2>
            <h4 className="pt-5">Por favor inicie sesión</h4>
          </Col>
          <Col className="border-left border-dark">
            <form align="center" onSubmit={handleSubmit}>
              <h3>Digite su correo electrónico:</h3>
              <input
                value={values.email}
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="correoejemplo@hotmail.com"
                className="form-input"
              />
              <h3>Digite su contraseña:</h3>
              <input
                value={values.password}
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="contraseña"
                className="form-input"
              />
              <div>
                <button className="btn btn-primary btn-lg mt-5">
                  Entrar a mi carpeta
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      <div className="text-center pt-5">
        <h4>
          Regístrese <Link to="signup">aquí</Link>
        </h4>
      </div>
    </React.Fragment>
  );
};

export default IntroPage;
