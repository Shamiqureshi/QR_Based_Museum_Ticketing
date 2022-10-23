import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Navbar2 from "../navbar/Navbar";
import Slider from "./Slider";
import Footer from "../navbar/Footer";
const Home = ({ setLoginUser }) => {
    const navigate = useNavigate()
    return (
        <React.Fragment>

            <Navbar2 />
            <Slider/>
            <Footer/>
        </React.Fragment>
    );

}
export default Home;