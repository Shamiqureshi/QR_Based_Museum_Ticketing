import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Adminnavbar from "../navbar/Adminnavbar";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
const ManageStaff = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        const usermobile = localStorage.getItem('umobile');
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/adminlogin");
           // console.log("Empty");
        }
        loadUsers();
    }, []);
 

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:9002/allstaff");
        console.log(result.data.reverse());
        setUser(result.data.reverse());
    };
    const deleteUser = async id => {
        // await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    };

    const navigate = useNavigate()

    return (
        <div>
            <Adminnavbar/>
            <div className="row mt-1 p-2">
                <div className="col-sm-1 "></div>
                <div className="col-sm-10">
                <Link className="btn btn-primary mr-2" to={"/addstaff"}>Add Staff </Link>
                    </div>
                    <div className="col-sm-1 "></div>
            </div>
            <div className="row mt-1 p-2">
                <div className="col-sm-1 "></div>
                <div className="col-sm-10">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <td>sr</td>
                                <th>Name</th>
                               <th>Email</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-1 "></div>
            </div>
        </div>
    );



}
export default ManageStaff;