import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import IntroPage from "./pages/Intro/IntroPage";
import SignupPage from "./pages/Signup/SignupPage";
import HomePage from "./pages/Home/HomePage";
import NewfilePage from './pages/NewFile/NewfilePage'
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";
import "./Global.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.INTRO} component={IntroPage} />
        <Route path={ROUTES.SIGNUP} component={SignupPage} />
        <ProtectedRoute
          path={ROUTES.HOME}
          component={HomePage}
          redirect={ROUTES.INTRO}
        />
        <ProtectedRoute
          path={ROUTES.NEWFILE}
          component={NewfilePage}
          redirect={ROUTES.INTRO}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
