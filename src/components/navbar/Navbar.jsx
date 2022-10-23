import React , {useState,useEffect,useLayoutEffect} from "react";
import bootstrap from "bootstrap";
import { NavLink } from "react-router-dom";

import { Navbar, NavItem, NavDropdown, MenuItem, Nav, Container } from 'react-bootstrap';

var Navbar2 = (props) => {
  var isLoggedIn = false;
  useEffect(() => {
    const usermobile = localStorage.getItem('umobile');
  
    if(typeof(usermobile) == 'undefined')
        {
          isLoggedIn = false;
        }
    else
    {
      isLoggedIn = true;
    }
   
}, []);
  return (
    <div>
      <Navbar bg="info" expand="lg">
  <Container>
    <Navbar.Brand href={"/"}><img src="assets/logo.png" height={30} width={50} /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <NavLink className="nav-link" to={"/"}>Home</NavLink>

      <NavLink className="nav-link" to={"/aboutus"}> About Us</NavLink>
      <NavLink className="nav-link" to={"/contactus"}> Contact Us</NavLink>        
      {isLoggedIn ? (
        <NavLink className="nav-link" to={{pathname:'/userprofile',state:{usermobile:props.umobile}}}>Profile</NavLink>
      
      ) : (
        <div className="d-flex">
        <NavLink className="nav-link" to={"/userlogin"}>SignIn</NavLink>
        <NavLink className="nav-link" to={"/userregister"}> SignUp</NavLink>
        </div>
      )}
       
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
    </div>
  );
}
export default Navbar2;