import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";

export default function NavbarLayout() {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [userIsLogin, setIsLogin] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem("login")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userIsLogin]);

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
            <Nav.Link href="/register">
              {userIsLogin ? null : "Register"}
            </Nav.Link>
            <Nav.Link href="/login">{userIsLogin ? null : "Login"}</Nav.Link>
            <Nav.Link href="/logout">{userIsLogin ? `Logout` : null}</Nav.Link>
            <Nav.Link href="#">
              {userIsLogin ? localStorage.getItem("login") : null}
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
