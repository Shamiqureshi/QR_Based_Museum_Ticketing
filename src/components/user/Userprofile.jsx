import React, {useState,useEffect,useLayoutEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import axios from "axios";

import Usernavbar from "../navbar/Usernavbar";
const Userprofile = (props) => {
    const [users, setUser] = useState({
        name:"",
        email:"",
        mobile:""
    });
    const usermobile = localStorage.getItem('umobile');
    const navigate = useNavigate()
  
    const loadUsers = async () => {
       
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/userlogin");
           // console.log("Empty");
        }
       
          console.log(usermobile);
          axios.post("http://localhost:9002/userprofile", {usermobile:usermobile})
          .then(res => {
            
            const result  = res;
            setUser({
                name:result.data.name,
                email:result.data.email,
                mobile :result.data.mobile
            })
          })
    };
   
    useEffect(() => {
        loadUsers();
       
    }, []);
 if(users.length!=0){
    return (

        <React.Fragment >
            <Usernavbar/>
            <div className=" " style={{ backgroundColor: "#d7fcd7" }}>
                <div className="row mt-2 me-0 p-5 ">
                    <div className="text-center">
                        <h2 className="text-dark text-uppercase">Profile </h2>
                        <br/>
                        <img src="assets/profile_img.jpg" className="rounded-circle" height={150} />
                      <br/>
                      </div>
                      <div className="col-lg-4 mx-auto">
                                <div className="card mt-2 mx-auto p-4 bg-light rounded">
                                    <div className="card-body bg-light text-primary ">
                                        <div className="container">
                                            <div className="">
                                            <p> Name : {users.name}</p>
                                            <p> Email : {users.email}</p>
                                            <p> Mobile : {users.mobile}</p>
                                            </div>
                        </div>
                        </div>
                        </div>
                        </div>
                  
                </div>
            </div>

        </React.Fragment>
    );
 }
 else{
    return (

        <React.Fragment >
            <Usernavbar />
            <div className="container bg-secondary ">
                <div className="row mt-5 p-5">
                    <div className="justify-content">
                        <h2 className="text-dark">Profile </h2>
                        <table>
                            <tr>
                            <th >Name :</th>
                            <th></th>
                            </tr>
                            <tr>
                            <th>Email :</th>
                            <th></th>
                            </tr>
                            <tr>
                            <th>Mobile:</th>
                            <th></th>
                            </tr>
                           
                        </table>
                    </div>
                </div>
            </div>

        </React.Fragment>
    );
 }

}
export default Userprofile;