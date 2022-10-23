import React,{ useRef } from "react";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
//import Footer from "../home/Footer";
import emailjs from '@emailjs/browser';
import Footer from "../navbar/Footer";


const ForgetPassword = ({setLoginUser}) =>{
    const navigate = useNavigate()

    const [ user, setUser] = useState({
        email:"",
      
    })
    const form = useRef();

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/forgetPassword", user)
        .then(res => {
            if(res.data.message=="0")
            {
               
                console.log(user.email);
                emailjs.send("service_kmighyi","template_r3zn37i",{
                    from_name: "MuseumProject",
                    message: "password is "+ res.data.user.password,
                    to_email:user.email
                    },'FxduH9ThDepDgKc3A')
                  .then((result) => {
                      console.log(result.text);
                      navigate("/userlogin")
                  }, (error) => {
                      console.log(error.text);
                  });

            }
            else if(res.data.message=="2"){
                alert("email didn't match");
               
            }
       })
    }

    
    

    return (
        <React.Fragment>
            <Navbar/>
    <div className="text-center login bg-info">

        {console.log(user)}
        <div className="row justify-content-center pt-5">
           
            <div className="col-sm-4  card bg-dark text-white">
            <div className="mb-md-3 mt-md-4 pb-1">
                        <h2 className="fw-bold mb-2 text-uppercase">Forget Password</h2>
              <p className="text-white-50 mb-5">Please enter your email!</p>

                <div className="form-outline form-white mb-4">
                    <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                </div>
        
                <button className="btn btn-outline-light btn-lg px-5" onClick={login}>Send Password</button>
               
                </div>
            <div className="col-sm-4"></div>
            </div>
        </div>
    </div>
    <div className="bg-info pt-3">
                        
                    </div>
                    <Footer/>
    </React.Fragment>
    );

}
export default ForgetPassword;