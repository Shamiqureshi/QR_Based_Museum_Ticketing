import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Navbar2 from "../navbar/Navbar";
import Footer from "../navbar/Footer";
const About = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>

            <Navbar2 />
            <div className="" style={{backgroundColor: "#d7fcd7",height:'500px'}}>
                <div className="row p-5 me-0">
                    <div className="justify-content">
                        <h2 className="text-danger pb-2">About Us</h2>
                        <p>A museum is a building or institution that cares for and displays a collection of artifacts and other objects of artistic, cultural, historical, or scientific importance. Many public museums make these items available for public viewing through exhibits that may be permanent or temporary. The largest museums are located in major cities throughout the world, while thousands of local museums exist in smaller cities, towns, and rural areas. Museums have varying aims, ranging from the conservation and documentation of their collection, serving researchers and specialists to catering to the general public. The goal of serving researchers is not only scientific, but intended to serve the general public.</p>
                        <p>
                        </p>
                    </div>
                </div>
            </div>
<Footer/>
        </React.Fragment>
    );

}
export default About;