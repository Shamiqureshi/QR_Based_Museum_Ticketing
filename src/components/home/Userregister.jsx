import React, { useState,useEffect } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom"
import Navbar2 from "../navbar/Navbar";
import Slider from "./Slider";
import Footer from "../navbar/Footer";
const Userregister = ({ setLoginUser }) => {
    const navigate = useNavigate()
    const usermobile = localStorage.getItem('umobile');
 

    const [ user, setUser] = useState({
        name: "",
        email:"",
        mobile:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    useEffect(() => {
        // if(typeof usermobile == 'undefined' || usermobile == null )
        // {
        //     navigate("/userlogin");
        //    // console.log("Empty");
        // }
        // else{
        //     navigate("/userprofile");  
        // }
    }, []);

    const register = () => {
        const { name, email, mobile, password, reEnterPassword } = user
        if( name && email && mobile && password && (password === reEnterPassword)){
            axios.post("http://localhost:9002/userregister", user)
            .then( res => {
                alert(res.data.message)
                navigate("/Userlogin")
            })
        } else {
            alert("invlid input")
        }
        
    }
    return (
        <React.Fragment>

           <Navbar2 />
        <div className="register text-center" style={{ backgroundColor: "#d7fcd7" }}>
            {console.log("User", user)}
            <div className="row justify-content-center pb-5 pt-5 me-0">
            <div className="col-lg-4 mx-auto">
                                <div className="card mt-2 mx-auto p-4 bg-light">
                                    <div className="card-body bg-dark text-white ">
                                        <div className="container">
            <div className="col-sm-12 pb-3 pt-3">
               <h1 className="h3 mb-3 fw-normal text-uppercase">sign up</h1>

               <div className="form-outline form-white mb-4">
                    <input type="email" className="form-control" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }/>
                    
                </div>
                <div className="form-outline form-white mb-4">
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInput" placeholder="name@example.com"/>
              
                </div>
                <div className="form-outline form-white mb-4">
                    <input type="text" className="form-control" name="mobile" value={user.mobile} onChange={handleChange} id="floatingInput" placeholder="+91 9898989898"/>
               
                </div>
                <div className="form-outline form-white mb-4">
                    <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} id="floatingPassword" placeholder="Password"/>
                
                </div>
                <div className="form-outline form-white mb-4">
                    <input type="password" className="form-control" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }/>
                    
                </div>


                <button className="w-100 btn btn-lg btn-primary" onClick={register}>Register</button>
                <div className="text-center">or</div>
                <div className="w-100 btn btn-lg btn-primary" onClick={() => navigate("/Userlogin")}>Login</div>
            <div className="col-sm-4"></div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>

           
        </div>
<Footer/>
        </React.Fragment>
    );

}
export default Userregister;