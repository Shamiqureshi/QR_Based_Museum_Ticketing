import React, { useState,useEffect } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from "../navbar/Navbar";
import Adminnavbar from "../navbar/Adminnavbar";
const AddStaff = () => {
       
    const navigate = useNavigate()

    const [ user, setUser] = useState({
        name: "",
        email:"",
        mobile:"",
        password:""
    })


    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name,email,mobile,password } = user
        if( name && email && password ){
            axios.post("http://localhost:9002/addstaff",user)
            .then( res => {
               console.log(res);
                alert(res.data.message)
                navigate("/ManageStaff")
            })
        } else {
            alert("invlid input")
        }
        
    }
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

           <Adminnavbar />
        <div className="register">
            {console.log("User", user)}
            {/* {console.log(photo.selectedFile)}
            {console.log(photo.selectedFile.name)} */}
            <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
               <h1 className="h3 mb-3 fw-normal">New Staff</h1>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} id="floatingInput" placeholder="Name"/>
                    <label for="floatingInput">Name</label>
                </div>
  
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInput" placeholder="Email"/>
                    <label for="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" name="mobile" value={user.mobile} onChange={handleChange} id="floatingInput" placeholder="Mobile"/>
                    <label for="floatingInput">Mobile</label>
                </div>
                <div className="form-floating mb-3">
                <input type="passsword" className="form-control" name="password" value={user.password} onChange={handleChange} id="floatingInput" placeholder="Mobile"/>
                    <label for="floatingInput">Password</label>                  
                </div>

                <button className="w-100 btn btn-lg btn-primary" onClick={register}>Add</button>
               
            <div className="col-sm-4"></div>
            </div>
        </div>

           
        </div>

        </React.Fragment>
    );


}
export default AddStaff;