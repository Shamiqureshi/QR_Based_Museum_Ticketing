import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar2 from "../navbar/Navbar";
import Footer from "../navbar/Footer";

import { NavLink } from "react-router-dom";
const Userlogin = () => {
    const navigate = useNavigate();
    const usermobile = localStorage.getItem('umobile');
    

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    useEffect(() => {
        if(typeof usermobile == 'undefined' || usermobile == null )
        {
            navigate("/userlogin");
           // console.log("Empty");
        }
        else{
            navigate("/userprofile");  
        }
    }, []);

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:9002/userlogin", user)
        .then(res => {
            if(res.data.message=="0")
            {
               const umobile = res.data.user;
             // console.log(umobile);
                alert("Login Successfull");
              //  setLoginUser(res.data.user)
              localStorage.setItem('umobile',umobile);
              console.log(umobile);
                navigate("/userprofile")
            }
            else if(res.data.message=="1"){
                alert("Password didn't match");
                navigate("/userlogin")
            }
            else{
                alert("User not registered");
                navigate("/userlogin")
            }
           // console.log(res.data.user)
           // console.log(res.data.message)
        })
    }

    return (
        <React.Fragment>
            <Navbar2 />
            <div className="text-center login" style={{ backgroundColor: "#d7fcd7" }}>
                {console.log(user)}
                <div className="row justify-content-center pb-5 pt-5 me-0">
                <div className="col-lg-4 mx-auto">
                                <div className="card mt-2 mx-auto p-4 bg-light">
                                    <div className="card-body bg-dark text-white ">
                                        <div className="container">

                    <div className="col-sm-12 pb-3 pt-3">
                        <h1 className="h3 mb-3 fw-normal text-uppercase">sign in</h1>
                        <form onSubmit={login}>
                            <div className="form-outline form-white mb-4 pt-2">
                                <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInput" placeholder="name@example.com" required pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" />
                               
                            </div>
                            <div className="form-outline form-white mb-4">
                                <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} id="floatingPassword" placeholder="Password" required />
                               
                            </div>
                            <div className="form-outline form-white mb-4"> 
                                <button className="w-50 btn btn-lg btn-primary" type="submit">Sign in</button>
                            </div>
                            <br/><NavLink className="" to={"/forgetpassword"}>Forget Password</NavLink>
   
                        </form>
                        <p className="mt-5 mb-3 text-muted">&copy; 2021–2022</p>
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
export default Userlogin;