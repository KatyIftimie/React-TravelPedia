import React from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import CountryDetails from "./components/Services/CountryDetails";
import Footer from "./components/layout/Footer";
import RegisterUser from "./components/Services/RegisterUser";
import Login from "./components/Services/Login";
import Logout from "./components/Services/Logout";
<<<<<<< HEAD
import AddRental from "./components/Services/AddRental";
=======
import AddRental2 from "./components/Services/AddRental2.js";
>>>>>>> trialforrental

function App() {
  return (
    <>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/country/:name" component={CountryDetails}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/add-rental" component={AddRental2}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
