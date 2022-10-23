import React from "react";
import bootstrap from "bootstrap";
import { NavLink } from "react-router-dom";

import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Container } from 'react-bootstrap';

const Usernavbar = (props) => {
  return (
    <div>
      {
      // console.log(props.umobile)
      }

      <Navbar bg="info" expand="lg">
  <Container>
    <Navbar.Brand href={"/"}><img src="assets/logo.png" height={30} width={50} /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <NavLink className="nav-link" to={{pathname:'/userprofile',state:{usermobile:props.umobile}}}>Profile</NavLink>
      <NavLink className="nav-link" to={{pathname:"/allmuseums",state:{usermobile:props.umobile}}}> All Museums</NavLink>
     <NavLink className="nav-link" to={{pathname:"/history",state:{usermobile:props.umobile}}}>History</NavLink>
      <NavLink className="nav-link" to={"/logout"}> Logout</NavLink>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  );
}
export default Usernavbar;