import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { useCallback } from "react";
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

  const getUserDetails = useCallback(() => {
    axios.get(USER_API + userEmail).then((res) => {
      console.log(res.data);
      setDetails(res.data);
    });
  });

  useEffect(() => {
    if (window.sessionStorage.getItem("login")) {
      setIsLogin(true);
      setUserEmail(window.sessionStorage.getItem("login"));
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [getUserDetails]);

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
              <Nav.Link href="/login"> Login </Nav.Link>
            )}
            <Nav.Link href="#">
              Welcome {userIsLogin ? details.lastName : null}
            </Nav.Link>
            <Nav.Link href="#">
              {details && details.type.name === "HOST" ? "ADD RENTAL" : null}
            </Nav.Link>
            <Nav.Link href="#">
              {details && details.type.name === "GUEST" ? "See bookings" : null}
            </Nav.Link>
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
