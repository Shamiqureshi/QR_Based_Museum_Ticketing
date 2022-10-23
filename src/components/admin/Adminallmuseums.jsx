import React ,{ useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from "../navbar/Navbar";
const Adminallmuseums = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/adminlogin");
           // console.log("Empty");
        }
    }, []);
    return (
        <React.Fragment>

            <Navbar />
            <div className="container bg-secondary">
                <div className="row mt-5 ">
                    <div className="justify-content">
                        <h2 className="text-danger">About the Department</h2>
                        <p>
                        </p>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );

}
export default Adminallmuseums;