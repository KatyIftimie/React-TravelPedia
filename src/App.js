import React from "react";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import CountryDetails from "./components/Services/CountryDetails";
import Footer from "./components/layout/Footer";
<<<<<<< HEAD
import RegisterUser from "./components/countries/RegisterUser";
import Login from "./components/countries/Login";
import Logout from "./components/countries/Logout";
import Rental from "./components/countries/Rental";
=======
import RegisterUser from "./components/Services/RegisterUser";
import Login from "./components/Services/Login";
import Logout from "./components/Services/Logout";
import AddRental from "./components/Services/AddRental";
>>>>>>> f0af5376a87e79d7def88f14a38275fcebc38e0d

function App() {
  return (
    <>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/country/:name" component={CountryDetails}></Route>
        <Route path="/register" component={RegisterUser}></Route>
        <Route path="/add-rental" component={AddRental}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/logout" component={Logout}></Route>
        <Route path="/rental" component={Rental}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
