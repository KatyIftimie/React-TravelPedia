import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLayout from './components/layout/Navbar'
import Home from './components/layout/Home'
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" >
        <NavbarLayout/>
        <Home/>
    </div>
  );
}

export default App;
