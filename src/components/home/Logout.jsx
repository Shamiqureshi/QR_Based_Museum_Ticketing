import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar2 from "../navbar/Navbar";
const Logout = () => {
    const navigate = useNavigate();
    
    const usermobile = localStorage.getItem('umobile');
    useEffect(() => {
        localStorage.removeItem("umobile") 
    navigate("/")
       
    }, []);
    return (
        <React.Fragment></React.Fragment>
    );

}
export default Logout;