import React from "react";
import bootstrap from "bootstrap";
import { NavLink } from "react-router-dom";

import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Container } from 'react-bootstrap';

const StaffNavbar = (props) => {
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
      <NavLink className="nav-link" to={{pathname:'/staffprofile',state:{usermobile:props.umobile}}}>Profile</NavLink>
      <NavLink className="nav-link" to={{pathname:"/allbookings",state:{usermobile:props.umobile}}}> All Booking</NavLink>
     <NavLink className="nav-link" to={{pathname:"/visitedhistory",state:{usermobile:props.umobile}}}>Visited History</NavLink>
      <NavLink className="nav-link" to={"/logout"}> Logout</NavLink>

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  );
}
export default StaffNavbar;