import React, {useState} from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import logo from "../../img/logo.png";
import {Link} from 'react-router-dom'; 

export default function NavbarLayout() {

  const [title, setTitle] = useState('')
  const [query,setQuery]=useState('')

  const handleClick = () =>{
    setQuery(title)
  }

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
            <FormControl onChange={event=> setTitle(event.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
            <Link to={`/details/${title}`}><Button onClick={handleClick} variant="outline-success">Search</Button></Link>
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
