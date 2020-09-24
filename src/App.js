import React from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import CountryRentals from "./components/Services/CountryRentals";
import Footer from "./components/layout/Footer";
import RegisterUser from "./components/Services/RegisterUser";
import Login from "./components/Services/Login";
import Logout from "./components/Services/Logout";
import AddRental from "./components/Services/AddRental.js";

function App() {
  return (
    <div>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/country/:name" component={CountryRentals}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/add-rental" component={AddRental}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
