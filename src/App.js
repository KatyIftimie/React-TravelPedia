import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import Europe from "./components/continents/Europe";
import Africa from "./components/continents/Africa";
import Americas from "./components/continents/Americas";
import Oceania from "./components/continents/Oceania";
import Asia from "./components/continents/Asia";

function App() {
  return (
    <>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/europe" component={Europe}></Route>
        <Route exact path="/africa" component={Africa}></Route>
        <Route exact path="/oceania" component={Oceania}></Route>
        <Route exact path="/americas" component={Americas}></Route>
        <Route exact path="/asia" component={Asia}></Route>
      </Switch>
    </>
  );
}

export default App;
