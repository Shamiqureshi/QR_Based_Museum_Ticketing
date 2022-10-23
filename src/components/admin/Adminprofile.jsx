import React, {useState,useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios";
import {useLocation} from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import Adminnavbar from "../navbar/Adminnavbar";
const Adminprofile = () => {
    const navigate = useNavigate()
    const [users, setUser] = useState([]);

    const location = useLocation();

    useEffect(() => {
        loadUsers();
    }, []); 

    const loadUsers = async () => {
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/adminlogin");
           // console.log("Empty");
        }
        const result = await axios.get("http://localhost:9002/adminprofile");
        console.log(result.data.reverse());
        setUser(result.data.reverse());
    };

    if(users.length!=0){
    return (
        <React.Fragment>

            <Adminnavbar />
            <div className="container bg-secondary">
                <div className="row mt-5 ">
                    <div className="justify-content">
                    <div className="justify-content">
                        <h2 className="text-dark">Profile </h2>
                        <table>
                            <tr>
                            <th >Name :</th>
                            <th>{users[0].name}</th>
                            </tr>
                            <tr>
                            <th>Email :</th>
                            <th>{users[0].email}</th>
                            </tr>
                            <tr>
                            <th>Mobile:</th>
                            <th>{users[0].mobile}</th>
                            </tr>
                           
                        </table>
                    </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
    }
}
export default Adminprofile;