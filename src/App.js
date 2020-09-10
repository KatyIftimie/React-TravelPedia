import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import CountryDetails from "./components/countries/CountryDetails";
import Footer from "./components/layout/Footer";
import RegisterUser from "./components/countries/RegisterUser";
import Login from "./components/countries/Login";
import Logout from "./components/countries/Logout";
import Rental from "./components/countries/Rental";

function App() {
  return (
    <>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/details/:name" component={CountryDetails}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/rental" component={Rental}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
