import React, {useState,useEffect,useLayoutEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import axios from "axios";
import Usernavbar from "../navbar/Usernavbar";

const History = (props) => {
    const [users, setUser] = useState([]);
    const location = useLocation();
    const usermobile = localStorage.getItem('umobile');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/userlogin");
           // console.log("Empty");
        }
        const userData = {
            "user_mobile" : usermobile
        }
        const result = await axios.post("http://localhost:9002/booking_history", userData);
        setUser(result.data);
    };
    const deleteUser = async id => {
        // await axios.delete(`http://localhost:3003/users/${id}`);
        loadUsers();
    };

    const navigate = useNavigate()

    return (
        <div>
            <Usernavbar/>
           
            <div className="row mt-1 p-2">
                <div className="col-sm-1 "></div>
                <div className="col-sm-10">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <td>sr</td>
                                <td>Date</td>
                                <td>Name</td>
                                <td>Address</td>
                                <td>No of Persons</td>
                                <td>Price</td>
                                <td>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.booking_date}</td>
                                    <td>{user.name}</td>
                                    <td>{user.address}</td>
                                    <td>{user.no_of_persons}</td>
                                    <td>{user.price}</td>
                                    <td>{(user.price * user.no_of_persons)}</td>
                                   
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
export default History;