import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import "./Navbar.css";

const Navbar = (props) => {
  const handleSignOut = () => {
    localStorage.removeItem("sessionToken");
    props.history.push(ROUTES.INTRO);
  };
  return (
    <div className="Navbar">
      <Link to={ROUTES.HOME} className="Navbar-ref">
        <strong>Página principal</strong>
      </Link>
      <Link to={ROUTES.NEWFILE} className="Navbar-ref">
        <strong>Crear nuevo documento</strong>
      </Link>
      <button onClick={handleSignOut} className="btn btn-danger mr-4">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Navbar;
