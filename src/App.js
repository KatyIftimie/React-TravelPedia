import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import { Switch, Route } from "react-router-dom";
import CountryDetails from "./components/countries/CountryDetails";
import Footer from "./components/layout/Footer";
import WishList from "./components/layout/WishList";

function App() {
  return (
    <>
      <NavbarLayout />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/details/:name" component={CountryDetails}></Route>
        <Route path="/wishList" component={WishList}></Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
