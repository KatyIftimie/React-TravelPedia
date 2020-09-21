import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";

import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NavbarLayout() {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [userIsLogin, setIsLogin] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [details, setDetails] = useState("");

  const USER_API = "http://localhost:8080/api/v1/auth/get-user/";

  useEffect(() => {
    if (window.sessionStorage.getItem("login")) {
      setUserEmail(window.sessionStorage.getItem("login"));
      axios.get(USER_API + userEmail).then((res) => {
        console.log(res.data);
        setDetails(res.data);
        setIsLogin(true);
      });
    } else {
      setIsLogin(false);
    }
  }, [userEmail, userIsLogin]);

  const handleClick = () => {
    setQuery(title);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Navbar.Brand href="/">
          <img style={logoStyle} src={logo} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {userIsLogin ? (
              <Nav.Link href="/logout"> Logout</Nav.Link>
            ) : (
                <Nav.Link href="/login"> Login</Nav.Link>
              )}

            {userIsLogin ? (
              <Nav.Link href="#"> Welcome {details.lastName} </Nav.Link>
            ) : (
                <Nav.Link href="/register"> Register </Nav.Link>
              )}

            {userIsLogin && details && details.type.name === "HOST" ? (
              <Nav.Link href="/add-rental"> Add Rental</Nav.Link>
            ) : userIsLogin && details && details.type.name === "GUEST" ? (
              <Nav.Link href="/bookings"> See Bookings</Nav.Link>
            ) : null}
          </Nav>
          <Form inline>
            <FormControl
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Link to={`/details/${title}`}>
              <Button onClick={handleClick} variant="outline-success">
                Search
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

const logoStyle = {
  width: "45%",
  height: "45%",
};
