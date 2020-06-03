import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import IntroPage from "./pages/Intro/IntroPage";
import SignupPage from "./pages/Signup/SignupPage";
import HomePage from "./pages/Home/HomePage";

import "./App.css";
import "./Global.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.INTRO} component={IntroPage} />
        <Route path={ROUTES.SIGNUP} component={SignupPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;