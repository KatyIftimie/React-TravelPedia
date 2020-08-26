import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import logo from "../../img/logo.png";

export default function NavbarLayout() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Navbar.Brand href="/">
          <img style={logoStyle} src={logo} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Visited</Nav.Link>
            <Nav.Link href="#">Wish List</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
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
